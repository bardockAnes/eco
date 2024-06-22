import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Shirts, Jeans, Casquette, Shoes, Vestes } from '@/components/Svgs';
import { useThemeColorVariant } from '../Themed';
import Colors from '@/constants/Colors';

const Categories = () => {


    const containerBackground = useThemeColorVariant({ light: Colors.lightCategories.containerBackground, dark: Colors.darkCategories.containerBackground });

    // Determine the current theme based on the containerBackground color
    const colors = {
        ...(containerBackground === Colors.lightCategories.containerBackground ? Colors.lightCategories : Colors.darkCategories),
        containerBackground,
    };

    // Define the color palettes
    const colorPalettes = {
        shirts: { ...colors, color1: colors.color1, color2: colors.color2, color3: colors.color3 },
        jeans: { ...colors, color1: colors.color4, color2: colors.color5 },
        shoes: { ...colors, color1: colors.color1, color2: colors.color2, color3: colors.color3, color4: colors.color4, color5: colors.color5 },
        casquette: { ...colors, color1: colors.color3, color2: colors.color4, color3: colors.color5 },
        vestes: { ...colors, color1: colors.color2, color2: colors.color3, color3: colors.color4 },
    };

    type PaletteKeys = keyof typeof colorPalettes;

    // Define categories data
    const categoriesData: { Icon: React.ComponentType<any>; label: string; palette: PaletteKeys }[] = [
        { Icon: Shirts, label: 'T-Shirts', palette: 'shirts' },
        { Icon: Jeans, label: 'Jeans', palette: 'jeans' },
        { Icon: Shoes, label: 'Shoes', palette: 'shoes' },
        { Icon: Casquette, label: 'Casquette', palette: 'casquette' },
        { Icon: Vestes, label: 'Vestes', palette: 'vestes' },
    ];

    const [activeCategory, setActiveCategory] = useState('All'); // State to track the active category

    const handleCategoryPress = (category: string) => {
        setActiveCategory(category);
    };

    const styles = createStyles(colors, activeCategory);

    return (
        <View style={styles.categoriesContainer}>
            <View style={styles.header}>
                <Text style={styles.title}>Categories</Text>
                <Text style={styles.seeAll}>See All</Text>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
                <TouchableOpacity
                    style={[styles.category, activeCategory === 'All' && styles.activeCategory]}
                    onPress={() => handleCategoryPress('All')}
                >
                    <Text style={[styles.categoryLabel, activeCategory === 'All' && styles.activeCategoryText, styles.uppercaseText]}>All</Text>
                </TouchableOpacity>
                {categoriesData.map(({ Icon, label, palette }, index) => (
                    <TouchableOpacity
                        style={[styles.category, activeCategory === label && styles.activeCategory]}
                        key={index}
                        onPress={() => handleCategoryPress(label)}
                    >
                        <Icon size={35} {...colorPalettes[palette]} />
                        <Text style={[styles.categoryLabel, activeCategory === label && styles.activeCategoryText]}>{label}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default Categories;

const createStyles = (colors: any, activeCategory: string) => StyleSheet.create({
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
        width: 80,
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
    activeCategory: {
        backgroundColor: colors.activeCategoryBackground,
    },
    categoryLabel: {
        marginTop: 5,
        fontSize: 12,
        color: colors.label,
        textAlign: 'center',
    },
    activeCategoryText: {
        color: colors.activeCategoryText,
    },
    uppercaseText: {
        fontSize: 16, // Increase font size for uppercase text
    },
});
