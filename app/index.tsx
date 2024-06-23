import Button from "@/components/Button";
import { View, ActivityIndicator, useThemeColorVariant } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useAuth } from "@/providers/AuthProviders";
import { supabase } from "@/supabaseS/supabase";
import { Link, Redirect, Stack } from "expo-router";
import { StyleSheet } from "react-native";




export default function firstPage() {
    const { session, loading, isAdmin } = useAuth();
    const background = useThemeColorVariant({ light: Colors.light.background, dark: Colors.dark.background })
    const tint = useThemeColorVariant({ light: Colors.light.tint, dark: Colors.dark.tint })
    const text = useThemeColorVariant({ light: Colors.light.text, dark: Colors.dark.text })


    if (loading) {
        return <ActivityIndicator />
    }

    if (!session) {
        return <Redirect href={"/(auth)/sign-in"} />
    }

    if (!isAdmin) {
        return <Redirect href={"/(user)/home/"} />
    }

    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <Stack.Screen options={{ headerShown: false }} />
            <Link href="/(admin)/home" asChild><Button text="Admin" backgroundColor={tint} textColor={background} /></Link>
            <Link href="/(user)/home" asChild><Button text="User" backgroundColor={tint} textColor={background} /></Link>
            <Button backgroundColor={tint} textColor={background} onPress={() => supabase.auth.signOut()} text="Sign out" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    }
})
