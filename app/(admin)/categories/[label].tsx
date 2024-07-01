import { View, Text, useThemeColorVariant } from '@/components/Themed'
import Products from '@/components/home/Products';
import Colors from '@/constants/Colors';
import { Stack, useLocalSearchParams } from 'expo-router';
import React from 'react'
import { ScrollView } from 'react-native';

function CategoriesDetails() {
    const { label: labelString } = useLocalSearchParams();

    // Ensure labelString is treated as a string
    const label = typeof labelString === "string" ? labelString : (labelString?.[0] ?? "defaultString");
    
    
    const backgroundColor = useThemeColorVariant({ light: Colors.light.background, dark: Colors.dark.background })

    return (

        <ScrollView contentContainerStyle={{ flex: 1, backgroundColor: backgroundColor }}>
            <Stack.Screen
                options={{
                    title: label || "Details",
                    headerBackVisible: true,
                    headerTitleAlign: "center",
                    headerShown: true
                }}
            />
            <Products category={label} />
        </ScrollView>
    )
}

export default CategoriesDetails