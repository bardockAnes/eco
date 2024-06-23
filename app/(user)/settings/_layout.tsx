import { useThemeColor } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { Feather } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

export default function DettingsStack() {
  const color = useThemeColor({ light: Colors.lightHeader.backgroundcolor, dark: Colors.darkHeader.backgroundcolor }, "background");
  const iconColor = useThemeColor({ light: Colors.lightHeader.headerIcon, dark: Colors.darkHeader.headerIcon, }, "text");


  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <React.Fragment>
            <Link href="/info" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Feather
                    name="info"
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
          title: "Settings",
          headerStyle: { backgroundColor: color },
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
}
