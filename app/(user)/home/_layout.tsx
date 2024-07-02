import React from "react";
import { Stack, Link } from "expo-router";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons"; // Import Feather icons from Expo
import Colors from "@/constants/Colors";
import { useThemeColor } from "@/components/Themed";
import { i18n } from "@/lib/i18n";

export default function categoryStack() {
  const color = useThemeColor({ light: Colors.lightHeader.backgroundcolor, dark: Colors.darkHeader.backgroundcolor }, "background");
  const iconColor = useThemeColor({ light: Colors.lightHeader.headerIcon, dark: Colors.darkHeader.headerIcon, }, "text");

  return (
    <Stack
      screenOptions={{
        headerTitleAlign:'center',
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
        headerStyle: { backgroundColor: color },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: i18n.t('home.title'),
          headerShadowVisible: true,
        }}
      />
      <Stack.Screen
        name="[id]"
        options={{
          headerShown:false
        }}
      />
    </Stack>
  );
}
