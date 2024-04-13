import React from "react";
import { View, Text } from "@/components/Themed";
import { useCart} from '@/providers/CartProviders';
import { FlatList } from "react-native";
import CartListItem from "@/components/CartListItem";




const demande = () => {
    const { items } = useCart();
    return (
        <View>
            <FlatList data={items} renderItem={({item}) => <CartListItem cartItem={item}/>}
            contentContainerStyle={{padding:10,gap:10}}/>
        </View>
    );
};

export default demande;