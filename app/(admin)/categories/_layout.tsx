import { useThemeColor } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

export default function ordersStack() {
  const color = useThemeColor({ light: Colors.lightHeader.backgroundcolor, dark: Colors.darkHeader.backgroundcolor }, "background");
  const iconColor = useThemeColor({ light: Colors.lightHeader.headerIcon, dark: Colors.darkHeader.headerIcon, }, "text");


  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: color },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Categories",
        }}
      />
      <Stack.Screen
        name="[label]"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}
