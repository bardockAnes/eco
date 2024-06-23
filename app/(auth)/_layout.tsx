import { useThemeColor } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useAuth } from "@/providers/AuthProviders";
import { Redirect, Stack } from "expo-router";
import React from "react";

export default function authlayout() {
  const color = useThemeColor({ light: Colors.lightHeader.backgroundcolor, dark: Colors.darkHeader.backgroundcolor }, "background");
  const iconColor = useThemeColor({ light: Colors.lightHeader.headerIcon, dark: Colors.darkHeader.headerIcon, }, "text");

  const { session } = useAuth()
  if (session) {
    return <Redirect href={"/(admin)"} />
  }

  return (
    <Stack>
      <Stack.Screen
        name="sign-in"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="sign-up"
        options={{
          headerShown: false
        }}
      />
    </Stack>
  );
}
