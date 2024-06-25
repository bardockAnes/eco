import React from 'react';
import { Text, Pressable, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ProButtonProps {
    text: string;
    onPress: () => void;
    backgroundColor?: string;
    textColor?: string;
    gradientColors?: string[];
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const ProButton: React.FC<ProButtonProps> = ({
    text,
    onPress,
    backgroundColor = '#4A90E2',
    textColor = '#FFFFFF',
    gradientColors = [backgroundColor, backgroundColor],
    style,
    textStyle,
}) => {
    return (
        <Pressable onPress={onPress} style={[styles.button, style]}>
            <LinearGradient
                colors={gradientColors}
                style={styles.gradient}
                start={[0, 0]}
                end={[1, 1]}
            >
                <Text style={[styles.buttonText, { color: textColor }, textStyle]}>{text}</Text>
            </LinearGradient>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 25,
        overflow: 'hidden',
        elevation: 3,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProButton;
