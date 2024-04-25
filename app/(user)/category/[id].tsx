import { ActivityIndicator, Image, Pressable, StyleSheet } from "react-native";
import { Text, View } from '@/components/Themed';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useWorks } from "@/api/works";
import { noimg } from "@/components/works";
import { useState } from "react";
import Button from "@/components/Button";
import { useCart } from "@/providers/CartProviders";
import { Sizes } from "@/types";



const sizes : Sizes[] = ["S","M","L","XL"]




const idDetails = () => {
    const { id : idString } = useLocalSearchParams();
    const id = parseFloat( typeof idString === "string" ? idString : idString[0] );



    const { data : works, error, isLoading } = useWorks(id)


    const {addItem} = useCart();

    const router = useRouter();

    

    const [selectedsize, SetSelectedSize] = useState<Sizes>("M");

    const demander = () => {
        if(!works){
            return;
        }
        addItem(works,selectedsize);
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
            <Stack.Screen options={{title: works.name}}/>
            <Image source={{uri: works.image || noimg}} style={styles.image}/>
            <Text>Select Size</Text>
            <View style={styles.sizes}>
            {sizes.map((size) => (
            <Pressable onPress={() => {SetSelectedSize(size);}} style={[styles.size, {backgroundColor: selectedsize === size? "gainsboro" : "transparent"}]} key={size}>
                <Text style={styles.textsize}>{size}</Text>
                </Pressable >
                ))}
            </View>
            <Text style={styles.price}>{works.price} 0000 DA</Text>
            <Button onPress={demander} text="Demander"/>
        </View>
    );
};

const styles = StyleSheet.create ({
    container : {
        flex:1,
    },
    image : {
        width:"100%",
        aspectRatio:1,
    },
    price : {
         fontWeight:"bold",
         fontSize:18,
         textAlign:"center",
         marginBottom:"auto"
       


    },
    sizes : {
        flexDirection:"row",
        justifyContent:"space-around",
        marginVertical:10,


    },
    size :{
        width:50,
        aspectRatio:1,
        borderRadius:25,
        justifyContent:"center",
        alignItems:"center"

    },
    textsize : {
        fontSize:20,
        fontWeight:"500",

    },
})

export default idDetails;
