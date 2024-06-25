import React, { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text, useThemeColorVariant } from '@/components/Themed';
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useWorks } from "@/api/works";
import { useCart } from "@/providers/CartProviders";
import Button from "@/components/Button";
import RemoteImage from "@/components/RemoteImage";
import { Sizes, descitption } from "@/types";
import { img } from "@/assets/data/work";
import Colors from "@/constants/Colors";
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

const sizes: Sizes[] = ["S", "M", "L", "XL"];

const idDetails = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(
    typeof idString === "string" ? idString : idString?.[0] ?? "0"
  );

  const { data: works, error, isLoading } = useWorks(id);
  const { addItem } = useCart();
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState<Sizes>("M");
  const [selectedColor, setSelectedColor] = useState<string | null>('red');

  const containerBackground = useThemeColorVariant({
    light: Colors.light.background,
    dark: Colors.dark.background,
  });
  const colors =
    containerBackground === Colors.light.background ? Colors.light : Colors.dark;
  const styles = createStyles(colors);

  const handleDemander = () => {
    if (!works) return;
    addItem(works, selectedSize);
    router.push("/demande");
  };

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.loadingIndicator} />;
  }

  if (error) {
    return <Text style={styles.errorText}>Error fetching the data</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            title: works?.name || "Details",
            headerBackVisible: true,
            headerShadowVisible: false,
            headerTitleAlign: "center",
          }}
        />
        <View style={styles.imageContainer}>
          <RemoteImage path={works?.image || img} fallback={img} style={styles.image} />
        </View>
        <View style={styles.titlePriceContainer}>
          <Text style={styles.title}>{works?.name}</Text>
          <Text style={styles.price}>{works?.price} DZD</Text>
        </View>
        <Text style={styles.description}>{works?.description || descitption}</Text>
        <View style={styles.selectContainer}>
          <Text style={styles.selectSizeText}>Select Size</Text>
          <View style={styles.sizeContainer}>
            {sizes.map((size) => (
              <Pressable
                key={size}
                style={[
                  styles.sizeButton,
                  { backgroundColor: selectedSize === size ? "#4A90E2" : "#F3F4F6" },
                ]}
                onPress={() => setSelectedSize(size)}
              >
                <Text
                  style={[
                    styles.sizeButtonText,
                    { color: selectedSize === size ? "#FFF" : "#000" },
                  ]}
                >
                  {size}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.selectContainer}>
          <Text style={styles.selectColorText}>Select Color</Text>
          <View style={styles.colorContainer}>
            {["red", "blue", "green",].map((color) => (
              <Pressable
                key={color}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                ]}
                onPress={() => setSelectedColor(color)}
              >
                {selectedColor === color && (
                  <Ionicons name="checkmark" size={24} color="white" />
                )}
              </Pressable>
            ))}
          </View>
        </View>
        {/* <Button
          backgroundColor={colors.tint}
          textColor={colors.background}
          onPress={handleDemander}
          text="Demander"
          style={styles.demanderButton}
        /> */}
      </View>
    </ScrollView>
  );
};

const createStyles = (colors: any) =>
  StyleSheet.create({
    scrollContainer: {
      flexGrow: 1,
    },
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
      backgroundColor: colors.background,
      paddingBottom: 100,
    },
    loadingIndicator: {
      marginTop: 20,
    },
    errorText: {
      marginTop: 20,
      fontSize: 16,
      color: "red",
    },
    imageContainer: {
      aspectRatio: 2 / 3,
      width: "100%",
      borderRadius: 20,
      overflow: "hidden",
      marginBottom: 40,
      elevation: 3,
    },
    image: {
      flex: 1,
    },
    titlePriceContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
      width: "100%",
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      color: colors.text,
    },
    price: {
      fontSize: 20,
      fontWeight: "bold",
      textAlign: "center",
      color: colors.tint,
    },
    description: {
      fontSize: 16,
      marginBottom: 20,
      color: colors.textP,
    },
    selectContainer: {
      backgroundColor: colors.showBack,
      marginBottom: 10,
      padding: 20,
      borderRadius: 12,
      elevation: 3,
    },
    selectSizeText: {
      fontSize: 18,
      marginBottom: 10,
      color: colors.text,
    },
    sizeContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
    },
    sizeButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      elevation: 2,
    },
    sizeButtonText: {
      fontSize: 18,
      fontWeight: "500",
    },
    selectColorText: {
      fontSize: 18,
      marginBottom: 10,
      color: colors.text,
    },
    colorContainer: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      width: "100%",
    },
    colorButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: "#FFF",
      elevation: 2,
    },
    selectedColorButton: {
      borderWidth: 2,
      borderColor: colors.tint,
    },
    demanderButton: {
      marginTop: 20,
      width: 180,
      height: 50,
      borderRadius: 25,
      elevation: 3,
    },
  });

export default idDetails;
