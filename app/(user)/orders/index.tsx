import React from "react";
import { View, Text, ActivityIndicator } from "@/components/Themed";
import { FlatList } from "react-native";
import OrderListItem from "@/components/OrderListItem";
import { useOrderListUser } from "@/api/orders";

export default function ordersScren() {
    const { data: order, isLoading, error } = useOrderListUser();

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