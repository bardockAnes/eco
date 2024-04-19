import Button from "@/components/Button";
import { View, Text } from "@/components/Themed";
import { Link, Stack } from "expo-router";
import { StyleSheet } from "react-native";


export default function firstPage() {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{headerShown:false}}/>
           <Link href="/(admin)/category" asChild><Button text="Admin"/></Link>
           <Link href="/(user)/category" asChild><Button text="User"/></Link>
           <Link href="/(auth)/sign-in" asChild><Button text="Sign in"/></Link>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        justifyContent:"center"
    }
})
