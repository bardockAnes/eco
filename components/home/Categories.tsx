import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { Shirts, Jeans, Casquette, Shoes, Vestes } from '@/components/Svgs';
import { useThemeColorVariant } from '../Themed';

const Categories = () => {
    const containerBackground = useThemeColorVariant({ light: 'white', dark: 'black' });

    // Define the colors object with types
    const colors = {
        mainColor: 'black', // Main color theme
        transparent: 'transparent',
        categoryBackground: '#ecf0f1', // Light background for categories
        containerBackground, // White or black based on theme for container
        headerTitle: '#333', // Dark gray for header title
        seeAllText: 'gray', // Gray for 'See All' text
        color1: '#3498db', // Example color 1
        color2: '#2ecc71', // Example color 2
        color3: '#f39c12', // Example color 3
        color4: '#e74c3c', // Example color 4
        color5: '#9b59b6', // Example color 5
    };

    // Define the color palettes object with specific types
    const colorPalettes = {
        shirts: { ...colors, color1: colors.color1, color2: colors.color2, color3: colors.color3 },
        jeans: { ...colors, color1: colors.color4, color2: colors.color5 },
        shoes: { ...colors, color1: colors.color1, color2: colors.color2, color3: colors.color3, color4: colors.color4, color5: colors.color5 },
        casquette: { ...colors, color1: colors.color3, color2: colors.color4, color3: colors.color5 },
        vestes: { ...colors, color1: colors.color2, color2: colors.color3, color3: colors.color4 },
    };

    type PaletteKeys = keyof typeof colorPalettes;

    // Define categories data with types
    const categoriesData: { Icon: React.ComponentType<any>; label: string; palette: PaletteKeys }[] = [
        { Icon: Shirts, label: 'T-Shirts', palette: 'shirts' },
        { Icon: Jeans, label: 'Jeans', palette: 'jeans' },
        { Icon: Shoes, label: 'Shoes', palette: 'shoes' },
        { Icon: Casquette, label: 'Casquette', palette: 'casquette' },
        { Icon: Vestes, label: 'Vestes', palette: 'vestes' },
        { Icon: Shirts, label: 'T-Shirts', palette: 'shirts' },
        { Icon: Jeans, label: 'Jeans', palette: 'jeans' },
        { Icon: Shoes, label: 'Shoes', palette: 'shoes' },
        { Icon: Casquette, label: 'Casquette', palette: 'casquette' },
        { Icon: Vestes, label: 'Vestes', palette: 'vestes' },
    ];

    const styles = createStyles(colors);

    return (
        <View style={styles.categoriesContainer}>
            <View style={styles.header}>
                <Text style={styles.title}>Categories</Text>
                <Text style={styles.seeAll}>See All</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
                {categoriesData.map(({ Icon, label, palette }, index) => (
                    <View style={styles.category} key={index}>
                        <Icon size={35} {...colorPalettes[palette]} />
                        <Text style={styles.categoryLabel}>{label}</Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default Categories;

const createStyles = (colors: any) => StyleSheet.create({
    categoriesContainer: {
        borderRadius: 12,
        padding: 10,
        backgroundColor: colors.containerBackground,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.headerTitle,
    },
    seeAll: {
        fontSize: 14,
        color: colors.seeAllText,
    },
    categories: {
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    category: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 80, // Fixed width for each category item
        padding: 10,
        backgroundColor: colors.categoryBackground,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
        marginRight: 10,
    },
    categoryLabel: {
        marginTop: 5,
        fontSize: 12,
        color: '#555555',
        textAlign: 'center',
    },
});
