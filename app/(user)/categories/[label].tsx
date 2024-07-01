import { View, Text } from '@/components/Themed'
import { useLocalSearchParams } from 'expo-router';
import React from 'react'

function CategoriesDetails() {
    const { label: idString } = useLocalSearchParams();

    return (
        <View>
            <Text>
                yes {label}
            </Text>
        </View>
    )
}

export default CategoriesDetails