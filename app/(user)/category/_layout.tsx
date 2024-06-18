import { Stack } from "expo-router";
import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable } from "react-native";
import Colors from "@/constants/Colors";
import { useThemeColor } from "@/components/Themed";

export default function categoryStack() {
  const color = useThemeColor({light:"white",dark:"black"},"background")
  return (
    <Stack
      // screenOptions={{
      //   headerRight: () => (
      //     <Link href="/demande" asChild>
      //       <Pressable>
      //         {({ pressed }) => (
      //           <FontAwesome
      //             name="shopping-cart"
      //             size={28}
      //             color={Colors.light.tint}
      //             style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
      //           />
      //         )}
      //       </Pressable>
      //     </Link>
      //   ),

      // }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",headerTitleAlign:"center",headerStyle:{backgroundColor:color},headerShadowVisible:false
        }}
      />
    </Stack>
  );
}
