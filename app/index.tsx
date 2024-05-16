import Button from "@/components/Button";
import { View, Text, ActivityIndicator } from "@/components/Themed";
import { useAuth } from "@/providers/AuthProviders";
import { supabase } from "@/supabaseS/supabase";
import { Link, Redirect, Stack } from "expo-router";
import { StyleSheet } from "react-native";



export default function firstPage() {
    const {session, loading, isAdmin} = useAuth();
 
    if(loading){
        return <ActivityIndicator/>
    }

    if(!session){
        return <Redirect href={"/(auth)/sign-in"} />
    }

    if(!isAdmin){
        return <Redirect href={"/(user)/category/"} />
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{headerShown:false}}/>
           <Link href="/(admin)/category" asChild><Button text="Admin"/></Link>
           <Link href="/(user)/category" asChild><Button text="User" /></Link>
           <Button onPress={() => supabase.auth.signOut()} text="Sign out"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:"center"
    }
})
