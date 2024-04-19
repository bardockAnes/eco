import { Stack } from "expo-router";
import React from "react";

export default function ordersStack() {
  return (
    <Stack>
    <Stack.Screen 
    name="index" 
    options={{
      title:"Order"
    }}/>
    </Stack>
  );
}
