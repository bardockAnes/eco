import React from "react";
import { View, Text } from "@/components/Themed";
import { FlatList } from "react-native";
import orders from "@/assets/data/orders";
import OrderListItem from "@/components/OrderListItem";

export default function ordersScren() {
    return (
        <FlatList data={orders} renderItem={({ item }) => <OrderListItem order={item}/>} 
        contentContainerStyle={{gap:10, padding:10, paddingTop:20}}/>
    )
}