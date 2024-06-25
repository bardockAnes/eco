import React from "react";
import { Stack, Link } from "expo-router";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons"; // Import Feather icons from Expo
import Colors from "@/constants/Colors";
import { useThemeColor } from "@/components/Themed";

export default function categoryStack() {
  const color = useThemeColor({ light: Colors.lightHeader.backgroundcolor, dark: Colors.darkHeader.backgroundcolor }, "background");
  const iconColor = useThemeColor({ light: Colors.lightHeader.headerIcon, dark: Colors.darkHeader.headerIcon, }, "text");

  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <React.Fragment>
            <Link href="/(admin)/home/plus" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Feather
                    name="plus"
                    size={24}
                    color={iconColor}
                    style={{ opacity: pressed ? 0.6 : 1 }}
                  />
                )}
              </Pressable>
            </Link>

          </React.Fragment>
        ),
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Boutique",
          headerStyle: { backgroundColor: color },
          headerShadowVisible: true,
        }}
      />
    </Stack>
  );
}
