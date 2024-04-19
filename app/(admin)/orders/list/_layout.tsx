import { Stack, withLayoutContext } from "expo-router";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "@/constants/Colors";
import { useThemeColor } from "@/components/Themed";
import { DarkTheme } from "@react-navigation/native";

const TopTabs = withLayoutContext(createMaterialTopTabNavigator().Navigator)

export default function listNewOrders() {
  return (
<SafeAreaView edges={['top']} style={{flex:1, backgroundColor:useThemeColor({ light: "white", dark: "hsl(0, 0%, 7%)" }, 'background')}}>
 <TopTabs>
 <TopTabs.Screen name="index" options={{title:"New"}}/>
 <TopTabs.Screen name="passed" options={{title:"Old"}}/>
 </TopTabs>
</SafeAreaView>
  );
}
