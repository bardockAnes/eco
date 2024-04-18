import React from "react";
import { View, Text } from "@/components/Themed";
import { useCart} from '@/providers/CartProviders';
import { FlatList } from "react-native";
import CartListItem from "@/components/CartListItem";
import Button from "@/components/Button";
import { Stack } from "expo-router";




const demande = () => {
    const { items, total } = useCart();
    return (
        <View style={{padding:10}}>
            <Stack screenOptions={{ presentation :"modal"}}/>
            <FlatList data={items} renderItem={({item}) => <CartListItem cartItem={item}/>}
            contentContainerStyle={{padding:10,gap:10}}/>
            <Text style={{padding:10,fontSize:20,fontWeight:"500",textAlign:"center"}}>Prix : {total} 0000 DA</Text>
            <Button text="Checkout"/>
        </View>
    );
};

export default demande;