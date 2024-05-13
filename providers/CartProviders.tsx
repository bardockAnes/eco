import { createContext, useContext, PropsWithChildren, useState } from "react";
import { CardItem, Sizes, Tables } from "@/types";
import { randomUUID } from "expo-crypto";
import { useInsertOrder } from "@/api/orders";
import { useRouter } from "expo-router";
import { useInsertOrderItem } from "@/api/order_item";



type CartType = {
    items: CardItem[],
    addItem: (product: Tables<"works">, size: CardItem["size"]) => void;
    updateQuantity: (itemId: string, amount: -1 | 1) => void;
    total: number,
    checkout : () => void;
}

const CartContext = createContext<CartType>({
    items: [],
    addItem: () => { },
    updateQuantity: () => { },
    total: 0,
    checkout : () => {}
});



const CartProvider = ({ children }: PropsWithChildren) => {

    const [items, setItems] = useState<CardItem[]>([]);
    const { mutate : insertOrder } = useInsertOrder();
    const { mutate : insertOrederItems } = useInsertOrderItem();
    const router = useRouter();




    const addItem = (product: Tables<"works">, size: CardItem["size"]) => {
      const existingItem = items.find(
        (item) => item.product === product && item.size === size
      );

      if (existingItem) {
        updateQuantity(existingItem.id, 1);
        return;
      }


      
        const newCartItem: CardItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: 1,
        };
        setItems([newCartItem, ...items])
    };

    const updateQuantity = (itemId: string, amount: -1 | 1) => {

        setItems(items
            .map((item) =>
                item.id !== itemId
                    ? item
                    : { ...item, quantity: item.quantity + amount }
            )
            .filter((item) => item.quantity > 0)
        );

    }
    const total = items.reduce((sum, item) => (sum += item.product.price * item.quantity),0);

    const clearCart = () => {
        setItems([]);
    }

    const checkout = () => {
        insertOrder({ total }, {onSuccess : SaveOrderItems,})
    }
    const SaveOrderItems = ( order :  Tables<'order'>) => {

        const orderItems = items.map((CardItem) => ({
            order_id: order.id,
            product_id: CardItem.product_id,
            quantity: CardItem.quantity,
            size: CardItem.size
        }))
        
        insertOrederItems(orderItems, {
            onSuccess() {
            clearCart();
            router.push(`/(user)/orders/${order.id}`)               
            }
        })
    };
    return (
        <CartContext.Provider value={{ items, addItem, updateQuantity, total, checkout }}>
            {children}
        </CartContext.Provider>
    )
};

export default CartProvider;

export const useCart = () => useContext(CartContext);