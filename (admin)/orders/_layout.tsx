import { Stack } from "expo-router";
import React from "react";

export default function ordersStack() {
  return (
    <Stack>
      <Stack.Screen
        name="list"
        options={{
          headerShown:false,title:""
        }} />
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,title:""
        }} />
    </Stack>
  );
}
