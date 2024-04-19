import React from "react";
import { View, Text } from "@/components/Themed";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import { FlatList } from "react-native";
import OrderItemListItem from "@/components/OrderItemListItem";

export default function orderDetails() {
    const {id} = useLocalSearchParams();
    const order = orders.find((o) => o.id.toString() === id)
    if(!order){
        return <Text>Not found</Text>
    }
    return (
        <View style={{padding:10}}>
            <Stack.Screen options={{title : `Order number ${id}`, headerTitleAlign:"center" }}/>
            <OrderListItem order={order} />
            <FlatList data={order.order_items} renderItem={({item}) => <OrderItemListItem item={item}/>}
            contentContainerStyle={{gap:10, padding:10}}/>
        </View>
    )
}