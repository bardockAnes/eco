
import { View, Text, ActivityIndicator } from "@/components/Themed";
import { FlatList } from "react-native";
import OrderListItem from "@/components/OrderListItem";
import { useOrderListUser } from "@/api/orders";

import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "@/assets/data/orders";
import OrderItemListItem from "@/components/OrderItemListItem";
import { useOrderDetails } from "@/api/orders";
import { useSubscribeLisner, useSubscribeLisnerupdate, useSubscribeLisnerupdateAll } from "@/api/orders/subscribe";


export default function ordersScren() {
    const { data: order, isLoading, error } = useOrderListUser();
useSubscribeLisnerupdateAll();

    if (isLoading) {
        return <ActivityIndicator/>
    }
    if (error) {
        return <Text>error in ftching the data from the base</Text>
    }

    return (
        <FlatList data={order} renderItem={({ item }) => <OrderListItem order={item}/>} 
        contentContainerStyle={{gap:10, padding:10}}/>
    )
}