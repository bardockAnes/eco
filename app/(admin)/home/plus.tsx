import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TextInput, Alert, ActivityIndicator } from "react-native";
import Button from "@/components/Button";
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { useInsertProduct, useUpdateProduct, useWorks, useDeleteWork } from "@/api/works";
import * as FileSystem from 'expo-file-system';
import { randomUUID } from "expo-crypto";
import { supabase } from "@/supabaseS/supabase";
import { decode } from 'base64-arraybuffer';
import RemoteImage from "@/components/RemoteImage";
import { img } from "@/assets/data/work";
import { useThemeColor, useThemeColorVariant } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { color } from "react-native-elements/dist/helpers";

const plusScren = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [errors, setErrors] = useState("");
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const { id: idString } = useLocalSearchParams();
    const id = parseFloat(typeof idString === "string" ? idString : idString?.[0] ?? '');
    const isUpdating = !!idString;

    const { mutate: insertProduct } = useInsertProduct();
    const { mutate: updateWorks } = useUpdateProduct();
    const { mutate: deleteWorks } = useDeleteWork();
    const { data: updatingProduct } = useWorks(id);

    const router = useRouter();

    const containerBackground = useThemeColorVariant({ light: Colors.light.background, dark: Colors.dark.background });
    const colors = containerBackground === Colors.light.background ? Colors.light : Colors.dark;
    const styles = createStyles(colors);

    useEffect(() => {
        if (updatingProduct) {
            setName(updatingProduct.name);
            setPrice(updatingProduct.price.toString());
            setImage(updatingProduct.image);
            setCategory(updatingProduct.category);
        }
    }, [updatingProduct]);

    const reset = () => {
        setName("");
        setCategory("");
        setPrice("");
    };

    const validateInput = () => {
        const AllCategories = ['haut', 'bas', 'ensemble', 'shoes', 'accessoires', 'casquette', 'claquettes'];

        setErrors("");
        if (!name) {
            setErrors("must have name");
            return false;
        }
        if (!price) {
            setErrors("must have price");
            return false;
        }
        if (isNaN(parseFloat(price))) {
            setErrors("price must be a number");
            return false;
        }
        if (!AllCategories.includes(category)) {
            setErrors("The category must be one of these: haut, bas, ensemble, accessoires, casquette, claquettes");
            return false;
        }

        return true;
    };

    const Update = () => {
        if (isUpdating) {
            UpdateOld();
        } else {
            CreateNew();
        }
    };

    const CreateNew = async () => {
        if (!validateInput()) {
            return;
        }

        setLoading(true); // Start loading
        const imagePath = await uploadImage();

        insertProduct({ name, category, price: parseFloat(price), image: imagePath }, {
            onSuccess: () => {
                setLoading(false); // Stop loading
                reset();
                router.back();
            },
            onError: () => setLoading(false) // Stop loading on error
        });
    };

    const UpdateOld = async () => {
        if (!validateInput()) {
            return;
        }

        setLoading(true); // Start loading
        const imagePath = await uploadImage();

        updateWorks({ id, name, price: parseFloat(price), image: imagePath, category }, {
            onSuccess: () => {
                setLoading(false); // Stop loading
                reset();
                router.back();
            },
            onError: () => setLoading(false) // Stop loading on error
        });
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [2, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const deleteWork = () => {
        setLoading(true); // Start loading
        deleteWorks(id, {
            onSuccess: () => {
                setLoading(false); // Stop loading
                reset();
                router.replace('/(admin)');
            },
            onError: () => setLoading(false) // Stop loading on error
        });
    };

    const confirmDelete = () => {
        Alert.alert("Confirmation", "Are you sure you want to delete this work?", [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Delete",
                onPress: deleteWork,
                style: "destructive",
            }
        ]);
    };

    const uploadImage = async () => {
        if (!image?.startsWith('file://')) {
            return;
        }

        const base64 = await FileSystem.readAsStringAsync(image, {
            encoding: 'base64',
        });
        const filePath = `${randomUUID()}.png`;
        const contentType = 'image/png';
        const { data, error } = await supabase.storage
            .from('works.images')
            .upload(filePath, decode(base64), { contentType });

        if (data) {
            return data.path;
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Stack.Screen
                options={{ title: isUpdating ? "Update" : "Create New", headerTitleAlign: 'center', headerShadowVisible: false, }}
            />
            <RemoteImage path={image} fallback={img} style={styles.image} />
            <Text style={styles.imgText} onPress={pickImage}>Select Image</Text>
            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
                placeholderTextColor={colors.secondary}
            />
            <Text style={styles.label}>Category</Text>
            <TextInput
                style={styles.input}
                placeholder="Category"
                value={category}
                onChangeText={setCategory}
                autoCapitalize="none"
                placeholderTextColor={colors.secondary}
            />
            <Text style={styles.label}>Price (DZD)</Text>
            <TextInput
                style={styles.input}
                placeholder="3000 DZD"
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
                placeholderTextColor={colors.secondary}
            />
            <Text style={styles.errorText}>{errors}</Text>
            {!loading && <Button
                text={isUpdating ? "Update" : "Create"}
                backgroundColor={colors.tint}
                textColor={colors.background}
                onPress={isUpdating ? Update : CreateNew}
            />}
            {loading && <ActivityIndicator size="large" color={colors.tint} />}
            {isUpdating && !loading && (
                <Text onPress={confirmDelete} style={styles.deleteText}>
                    Delete
                </Text>
            )}
        </ScrollView>
    );
};

const createStyles = (colors: any) => StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: colors.background,
        paddingBottom: 100,
    },
    input: {
        backgroundColor: colors.showBack,
        color: colors.text,
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20,
        borderColor: colors.border,
        borderWidth: 1
    },
    label: {
        fontSize: 18,
        fontWeight: "bold",
        color: colors.text,
        marginBottom: 5
    },
    image: {
        width: "80%",
        aspectRatio: 2 / 3,
        alignSelf: "center",
        marginBottom: 20,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: colors.secondary,
    },
    imgText: {
        textAlign: "center",
        marginBottom: 20,
        color: colors.tint,
        fontSize: 16
    },
    errorText: {
        color: "red",
        textAlign: "center",
        marginBottom: 10
    },
    deleteText: {
        textAlign: "center",
        marginTop: 20,
        color: colors.tint,
        fontSize: 16
    }
});

export default plusScren;
