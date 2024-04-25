import React, { useEffect, useState } from "react";
import { View, Text } from "@/components/Themed";
import { Alert, Image, StyleSheet, TextInput } from "react-native";
import Button from "@/components/Button";
import { img } from "@/assets/data/work";
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useInsertProduct, useUpdateProduct, useWorks } from "@/api/works";


const plusScren = () => {
    const [name,setName] = useState("");
    const [price,setPrice] = useState("");
    const [errors,setErrors] = useState("");
    const [image, setImage] = useState<string | null>(null);

    const {id : idString} = useLocalSearchParams();
    const id = parseFloat(typeof idString === "string" ? idString : idString?.[0])
    const isUpdating = !!idString;

    const { mutate : insertProduct} = useInsertProduct();
    const { mutate : updateWorks } = useUpdateProduct();
    const { data : updatingProduct} = useWorks(id);

    const router = useRouter();

    useEffect(() => {
      if(updatingProduct){
        setName(updatingProduct.name);
        setPrice(updatingProduct.price.toString());
        setImage(updatingProduct.image);
      }

    }, [updatingProduct])

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

    const Update = () => {
        if(isUpdating){
            UpdateOld()
        }
        else {
            CreateNew();
        }
    }

    const CreateNew = () => {
        if(!validateInput()){
        return;
        }
        
        console.warn("create new product", name )

insertProduct({ name, price : parseFloat(price), image,},{
    onSuccess: () => {
        reset();
        router.back();
    }
})

        
        
    };

    const UpdateOld = () => {
        if(!validateInput()){
        return;
        }
        
        console.warn("update old product", name )
        updateWorks({ id, name, price : parseFloat(price), image,},{
            onSuccess: () => {
                reset();
                router.back();
            }
        })
        
    };




    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
    
  
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };
      
      const deleteWork = () => {
        console.warn("The work is deleted")
      }

      const confirmDelete = () => {
      Alert.alert("   تأكيد"," هل تريد مسح هذا العمل ؟",[
        {
            text : "رجوع",
            style : "cancel"
        },
        {
            text : "     مسح",
            onPress : deleteWork,
            style :"destructive",
        }
      ])
      }

    return ( 
    <View style={styles.container}>
        <Stack.Screen options={{title: isUpdating ? "Update" : "Create New", headerTitleAlign:'center',}}/>
        <Image source={{uri : image || img}} style={styles.image}/>
        <Text style={styles.imgText} onPress={pickImage}>Selcet image</Text>
        <Text style={styles.label}>Name</Text>
        <TextInput style={styles.input} placeholder="name" value={name} onChangeText={setName}/>
        <Text style={styles.label}>Price - DA -</Text>
        <TextInput style={styles.input} placeholder="5 0000 DA" keyboardType="numeric" value={price} onChangeText={setPrice}/>
        <Text style={{color:"red", textAlign:"center",paddingBottom:5}}>{errors}</Text>
        <Button text={isUpdating ? "Update" : "Create"} onPress={isUpdating ? Update : CreateNew}/>
        {isUpdating && <Text onPress={confirmDelete} style={styles.deleteText}>Delete</Text>}
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
        color:"#2f95dc"
    },
    deleteText : {
        textAlign:"center",
        marginTop:10,
        color:"#2f95dc"
    }

})

export default plusScren;

