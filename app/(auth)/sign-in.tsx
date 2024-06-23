import React, { useState } from "react";
import { View, Text, Alert, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Link, Stack } from "expo-router";
import { supabase } from "@/supabaseS/supabase";
import { Ionicons } from '@expo/vector-icons';
import Button from "@/components/Button";
import { useThemeColorVariant } from "@/components/Themed"; // Assuming you have a hook for theme colors
import Colors from "@/constants/Colors"; // Import your Colors object

  

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const containerBackground = useThemeColorVariant({ light: Colors.lightSign.background, dark: Colors.darkSign.background });
    const colors = containerBackground === Colors.lightSign.background ? Colors.lightSign : Colors.darkSign;
    const styles = createStyles(colors);

    async function signInWithEmail() {
        setLoading(true);
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
            Alert.alert("Error", error.message);
        }
        setLoading(false);
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: "Sign In", headerTitleAlign: 'center' }} />
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
            <View style={styles.inputContainer}>
                <Ionicons name="mail-outline" size={20} color="#888" style={styles.icon} />
                <TextInput 
                    style={styles.input} 
                    placeholder="Email Address" 
                    value={email} 
                    onChangeText={setEmail} 
                    autoCapitalize="none" 
                    keyboardType="email-address" 
                    placeholderTextColor="#aaa"
                />
            </View>
            <View style={styles.inputContainer}>
                <Ionicons name="lock-closed-outline" size={20} color="#888" style={styles.icon} />
                <TextInput 
                    style={styles.input} 
                    placeholder="Password"  
                    value={password} 
                    onChangeText={setPassword} 
                    autoCapitalize="none" 
                    secureTextEntry 
                    placeholderTextColor="#aaa"
                />
            </View>
            <Button 
                text={loading ? "Signing in ..." : "Sign In"} 
                onPress={signInWithEmail} 
                disabled={loading} 
                style={styles.button} 
                backgroundColor={colors.tint}
                textColor={colors.background}
            />
            <TouchableOpacity>
                <Link href={"/(auth)/sign-up"} replace={true} style={styles.link}>Don't have an account? Sign Up</Link>
            </TouchableOpacity>
        </View>
    );
}

const createStyles = (colors:any) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: colors.background,
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 10,
        textAlign: "center",
    },
    subtitle: {
        fontSize: 16,
        color: colors.text,
        marginBottom: 30,
        textAlign: "center",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.inputBackground,
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: colors.border,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: colors.text,
    },
    button: {
        marginVertical: 20,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: colors.buttonBackground,
    },
    link: {
        textAlign: "center",
        marginTop: 20,
        color: colors.tint,
        fontSize: 16,
    },
});
