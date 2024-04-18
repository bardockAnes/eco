import { Image, Pressable, StyleSheet } from "react-native";
import { Text, View } from '@/components/Themed';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { works } from "@/assets/data/work";
import { noimg } from "@/components/works";
import { useState } from "react";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProviders";
import { Sizes } from "@/types";



const sizes: Sizes[] = ["S", "M", "L", "XL"]




const idDetails = () => {
    const { id } = useLocalSearchParams();
    const { addItem } = useCart();

    const router = useRouter();

    const work = works.find((p) => p.id.toString() === id);

    const [selectedsize, SetSelectedSize] = useState<Sizes>("M");

    const demander = () => {
        if (!work) {
            return;
        }
        addItem(work, selectedsize);
        router.push("/demande");
    }

    if (!work) {
        return <Text>Not Found</Text>
    }
    return (

        <View style={styles.container}>
            <Stack.Screen options={{ title: work.name }} />
            <Image source={{ uri: work.image || noimg }} style={styles.image} />
            <Text style={styles.price}>{work.name}</Text>
            <Text style={styles.price}>{work.price} 0000 DA</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: "100%",
        aspectRatio: 1,
    },
    price: {
        fontWeight: "bold",
        fontSize: 18,
        textAlign: "center",



    },
})

export default idDetails;
