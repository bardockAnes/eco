import { View, ActivityIndicator, useThemeColorVariant } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { useAuth } from "@/providers/AuthProviders";
import { supabase } from "@/supabaseS/supabase";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Redirect, Stack } from "expo-router";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { color } from "react-native-elements/dist/helpers";

export default function FirstPage() {
    const { session, loading, isAdmin } = useAuth();
    const background = useThemeColorVariant({ light: Colors.light.background, dark: Colors.dark.background });
    const tint = useThemeColorVariant({ light: Colors.light.tint, dark: Colors.dark.tint });
    const text = useThemeColorVariant({ light: Colors.light.text, dark: Colors.dark.text });

    if (loading) {
        return <ActivityIndicator />;
    }

    if (!session) {
        return <Redirect href="/(auth)/sign-in" />;
    }

    if (!isAdmin) {
        return <Redirect href="/(user)/home" />;
    }

    return (
        <View style={[styles.container, { backgroundColor: background }]}>
            <Stack.Screen options={{ headerShown: false }} />
            <Link href="/(admin)/home" asChild>
                <TouchableOpacity style={{
                    backgroundColor: tint,
                    height: 100,
                    marginVertical: 10,
                    marginHorizontal: "5%",
                    borderRadius: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    gap: 20
                }}>
                    <FontAwesome name="shield" size={25} color={background} />
                    <Text style={[styles.buttonText, { color: background }]}>Admin</Text>
                </TouchableOpacity>
            </Link>
            <Link href="/(user)/home" asChild>
                <TouchableOpacity  style={{
                    backgroundColor: tint,
                    height: 100,
                    marginVertical: 10,
                    marginHorizontal: "5%",
                    borderRadius: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    gap: 20
                }}>
                    <FontAwesome name="home" size={25} color={background} />
                    <Text style={[styles.buttonText, { color: background }]}>User</Text>
                </TouchableOpacity>
            </Link>
            <TouchableOpacity style={[styles.button,{backgroundColor:tint}]} onPress={() => supabase.auth.signOut()}>
                <FontAwesome name="sign-out" size={25} color={background} />
                <Text style={[styles.buttonText, { color: background }]}>Sign out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 16,
    },
    button: {
        height: 100,
        marginVertical: 10,
        marginHorizontal: "5%",
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        gap: 20
    },
    buttonText: {
        marginLeft: 10,
        fontSize: 20,
        fontWeight: "bold",
    },
});
