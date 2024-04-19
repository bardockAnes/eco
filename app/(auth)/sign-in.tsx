import React, { useState } from "react";
import { View, Text } from "@/components/Themed";
import { Alert, Image, StyleSheet, TextInput } from "react-native";
import Button from "@/components/Button";
import { img } from "@/assets/data/work";
import * as ImagePicker from 'expo-image-picker';
import { Link, Stack, useLocalSearchParams } from "expo-router";

export default function signin() {
const [email,setEmail] = useState("");
const [Password,setPassword] = useState("");
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Sign in", headerTitleAlign: 'center', }} />
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="exmple@gmail.com" value={email} onChangeText={setEmail} />
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} placeholder="******"  value={Password} onChangeText={setPassword} secureTextEntry/>
            <Text style={{ color: "red", textAlign: "center", paddingBottom: 5 }}></Text>
            <Button text="Sign in"  />
            <Link href={"/(auth)/sign-up"} replace={true} style={styles.deleteText}>Sign up</Link>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 10,
    },
    input: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20

    },
    label: {
        fontSize: 16,
    },
    image: {
        width: "50%",
        aspectRatio: 1,
        alignSelf: "center",
        marginBottom: 10,
    },
    deleteText: {
        textAlign: "center",
        marginTop: 10,
        color: "#2f95dc"
    }

})