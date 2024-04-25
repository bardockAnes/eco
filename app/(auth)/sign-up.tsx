import React, { useState } from "react";
import { View, Text } from "@/components/Themed";
import { Alert, Image, StyleSheet, TextInput } from "react-native";
import Button from "@/components/Button";
import { img } from "@/assets/data/work";
import * as ImagePicker from 'expo-image-picker';
import { Link, Redirect, Stack, useLocalSearchParams } from "expo-router";
import { supabase } from "@/supabase/supabase";
import { useAuth } from "@/providers/AuthProviders";

export default function signup() {
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [loading,setLoading] = useState(false);
const  {session} = useAuth();


async function SingInWithEmail() {
    setLoading(true)
  const { error} = await supabase.auth.signUp({email, password})
  if( error) { Alert.alert(error.message) }
    setLoading(false)
}
if(session){ return <Redirect href={"/"} />}
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Sign up", headerTitleAlign: 'center', }} />
            <Text style={styles.label}>Email</Text>
            <TextInput style={styles.input} placeholder="exmple@gmail.com" value={email} onChangeText={setEmail} />
            <Text style={styles.label}>Password</Text>
            <TextInput style={styles.input} placeholder="******"  value={password} onChangeText={setPassword} secureTextEntry/>
            <Text style={{ color: "red", textAlign: "center", paddingBottom: 5 }}></Text>
            <Button onPress={SingInWithEmail} disabled={loading} text={loading? "Creating Account ..." : "Create Account" } />
            <Link href={"/sign-in"} replace={true}  style={styles.deleteText}>Sign in</Link>
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