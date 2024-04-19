export type Works = {
    id: number;
    name: string;
    image: string | null;
    price: number;
};

export type Sizes = 'S' | 'M' | 'L' | 'XL';

export type CardItem = {
    id : string;
    product : Works;
    product_id : number;
    size : Sizes;
    quantity : number;
}


export const OrderStatusList: OrderStatus[] = [
    'New',
    'Cooking',
    'Delivering',
    'Delivered',
  ];
  
  export type OrderStatus = 'New' | 'Cooking' | 'Delivering' | 'Delivered';
  
  export type Order = {
    id: number;
    created_at: string;
    total: number;
    user_id: string;
    status: OrderStatus;
  
    order_items?: OrderItem[];
  };
  
  export type OrderItem = {
    id: number;
    product_id: number;
    products: Works;
    order_id: number;
    size: Sizes;
    quantity: number;
  };
  
  export type Profile = {
    id: string;
    group: string;
  };
