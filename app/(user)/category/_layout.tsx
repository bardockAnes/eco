import { Stack } from "expo-router";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import Colors from "@/constants/Colors";

export default function categoryStack() {
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <Link href="/demande" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="shopping-cart"
                  size={28}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
        
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "category",
        }}
      />
    </Stack>
  );
}
