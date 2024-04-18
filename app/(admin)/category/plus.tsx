import React, { useState } from "react";
import { View, Text } from "@/components/Themed";
import { Image, StyleSheet, TextInput } from "react-native";
import Button from "@/components/Button";
import { img } from "@/assets/data/work";

const plusScren = () => {
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [errors,setErrors] = useState("");
    const [image, setImage] = useState(null)

    const reset = () => {
        setName("")
        setPrice("")
    }

    const validateInput = () => {
        setErrors("");
        if(!name){
            setErrors("must have name")
            return false
        }
        if(!price) {
            setErrors("must have price")
            return false
        }
        if(isNaN(parseFloat(price))) {
            setErrors("pirce must be number")
            return false
        }
        return true;
    }

    const CreateNew = () => {
        if(!validateInput()){
        return;
        }
        
        console.warn("create new product", name )
        reset()
        
    }
    return ( 
    <View style={styles.container}>
        <Image source={{uri : img}} style={styles.image}/>
        <Text style={styles.imgText}>Selcet image</Text>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} placeholder="name" value={name} onChangeText={setName}/>
        <Text style={styles.label}>Price - DA -</Text>
        <TextInput style={styles.input} placeholder="5 0000 DA" keyboardType="numeric" value={price} onChangeText={setPrice}/>
        <Text style={{color:"red", textAlign:"center",paddingBottom:5}}>{errors}</Text>
        <Button text="Create" onPress={CreateNew}/>
    </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent: "center",
        padding:10,    
    },
    input : {
        backgroundColor: "white",
        padding:10,
        borderRadius:5,
        marginTop:5,
        marginBottom:20
        
    },
    label : {
        fontSize:16,
    },
    image : {
        width:"50%",
        aspectRatio:1,
        alignSelf:"center",
        marginBottom:10,
    },
    imgText : {
        textAlign:"center",
        marginBottom:20,

    }

})

export default plusScren;

