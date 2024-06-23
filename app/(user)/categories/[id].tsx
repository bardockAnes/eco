import React from "react";
import { View, Text, ActivityIndicator } from "@/components/Themed";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import OrderListItem from "@/components/OrderListItem";
import { FlatList } from "react-native";
import OrderItemListItem from "@/components/OrderItemListItem";
import { useOrderDetails } from "@/api/orders";
import { useSubscribeLisner, useSubscribeLisnerupdate } from "@/api/orders/subscribe";

export default function orderDetails() {
    const { id : idString } = useLocalSearchParams();
    // const order = orders.find((o) => o.id.toString() === id)
   const id = parseFloat( typeof idString === "string" ? idString : idString?.[0]?? '' );

    const { data : order, isLoading, error} = useOrderDetails(id);

    useSubscribeLisnerupdate(id);
    
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
            <FlatList data={order.order_item} renderItem={({item}) => <OrderItemListItem item={item}/>}
            contentContainerStyle={{gap:10, padding:10}}/>
        </View>
    )
}