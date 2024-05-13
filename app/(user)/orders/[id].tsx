import React from "react";
import { View, Text, ActivityIndicator } from "@/components/Themed";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import { FlatList } from "react-native";
import OrderItemListItem from "@/components/OrderItemListItem";
import { useOrderDetails } from "@/api/orders";

export default function orderDetails() {
    const { id : idString } = useLocalSearchParams();
    const id = parseFloat( typeof idString === "string" ? idString : idString[0] );
    // const order = orders.find((o) => o.id.toString() === id)
    const { data : order, isLoading, error} = useOrderDetails(id);

    if(isLoading){
        return <ActivityIndicator/>
    }
    if(error){
        return <Text>error to fetch</Text>
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