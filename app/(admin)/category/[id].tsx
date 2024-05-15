import { Image, Pressable, StyleSheet } from "react-native";
import { Text, View } from '@/components/Themed';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { noimg } from "@/components/works";
import { useState } from "react";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProviders";
import { Sizes, Tables } from "@/types";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import Colors from "@/constants/Colors";
import { useWorks } from "@/api/works";
import { ActivityIndicator } from "react-native";
import RemoteImage from "@/components/RemoteImage";
import { img } from "@/assets/data/work";



const sizes: Sizes[] = ["S", "M", "L", "XL"]





const idDetails = () => {
    const { id : idString } = useLocalSearchParams();
    const id = parseFloat( typeof idString === "string" ? idString : idString?.[0]?? '' );

  
    const { data : works, error, isLoading } = useWorks(id)

    const { addItem } = useCart();

    const router = useRouter(); 

// type workstypes = Tables<"works">
// type works = workstypes


  

    const [selectedsize, SetSelectedSize] = useState<Sizes>("M");

    const demander = () => {
        if (!works) {
            return;
        }
        addItem(works, selectedsize);
        router.push("/demande");
    }

    if(isLoading){
        return <ActivityIndicator/>
    }
    if(error){
        return <Text>Error fetching the data</Text>
      }


    return (

        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerRight: () => (
                        <Link href={`/(admin)/category/plus?id=${id}`} asChild>
                            <Pressable>
                                {({ pressed }) => (
                                    <FontAwesome
                                        name="edit"
                                        size={28}
                                        color={Colors.light.tint}
                                        style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                                    />
                                )}
                            </Pressable>
                        </Link>
                    ),
                }}
            />
            <Stack.Screen options={{ title: works.name }} />
            <RemoteImage  path={works?.image} fallback={img} style={styles.image} />
            <Text style={styles.price}>{works.name}</Text>
            <Text style={styles.price}>{works.price} 0000 DA</Text>
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
