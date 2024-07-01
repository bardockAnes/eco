import React from 'react';
import { useThemeColorVariant } from '../Themed';
import Colors from '@/constants/Colors';
import { StyleSheet, Image, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from 'expo-router';

const categoriesData = [
    {
        title: 'Haut',
        items: [
            { label: 'T-shirt', source: require('../../assets/images/categories/tshirt.jpeg') },
            { label: 'Shirt', source: require('../../assets/images/categories/shirt.jpeg') },
            { label: 'Long Shirt', source: require('../../assets/images/categories/longshirt.jpeg') },
            { label: 'Jacket', source: require('../../assets/images/categories/jacket.jpeg') },
        ]
    },
    {
        title: 'Bas',
        items: [
            { label: 'Jeans', source: require('../../assets/images/categories/jeans.jpeg') },
            { label: 'Pants', source: require('../../assets/images/categories/pants.jpeg') },
            { label: 'Sweatpants', source: require('../../assets/images/categories/sweatpants.jpeg') },
        ]
    },
    {
        title: 'Shoes',
        items: [
            { label: 'Sneakers', source: require('../../assets/images/categories/shoes.jpeg') },
            { label: 'Boots', source: require('../../assets/images/categories/boots.jpeg') },
        ]
    },
    {
        title: 'Accessories',
        items: [
            { label: 'Hat', source: require('../../assets/images/categories/hat.jpeg') },
            { label: 'Sunglasses', source: require('../../assets/images/categories/sunglasses.jpeg') },
            { label: 'Watch', source: require('../../assets/images/categories/watch.jpeg') },
        ]
    },
    {
        title: 'Ensemble',
        items: [{ label: 'Ensemble', source: require('../../assets/images/categories/ensemble.jpeg') }]
    },
    {
        title: 'Casquette',
        items: [{ label: 'Casquette', source: require('../../assets/images/categories/casquette.jpeg') }]
    },
    {
        title: 'Slider',
        items: [{ label: 'Slider', source: require('../../assets/images/categories/slider.jpeg') }]
    }
];

function Categories() {
    const backgroundColor = useThemeColorVariant({ light: Colors.light.background, dark: Colors.dark.background });
    const colors = backgroundColor === Colors.light.background ? Colors.light : Colors.dark;
    const styles = createStyles(colors);

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {categoriesData.map((category, index) => (
                <View key={index} style={styles.categoryContainer}>
                    <Text style={styles.title}>{category.title}</Text>
                    <View style={styles.images}>
                        {category.items.map((item, idx) => (
                            <Link href={`/(user)/categories/${item.label}`} key={item.label} asChild>
                                <TouchableOpacity key={idx} style={styles.imageContainer}>
                                    <Image source={item.source} style={styles.img} />
                                    <LinearGradient
                                        colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.5)']}
                                        style={styles.gradient}
                                    />
                                    <Text style={styles.imageText}>{item.label}</Text>
                                </TouchableOpacity>
                            </Link>
                        ))}
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

export default Categories;

const createStyles = (colors: any) => StyleSheet.create({
    scrollContainer: {
        paddingBottom: 100,
        paddingHorizontal: 5,
        backgroundColor: colors.background
    },
    categoryContainer: {
        marginVertical: 15,
    },
    title: {
        color: colors.text,
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    images: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    img: {
        width: 160,
        height: 160,
        borderRadius: 12,
    },
    imageContainer: {
        backgroundColor: 'lightgray',
        alignItems: 'center',
        margin: 7,
        borderRadius: 12,
        position: 'relative',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    imageText: {
        position: 'absolute',
        bottom: 5,
        color: '#fff',
        fontSize: 15,
        textShadowColor: 'rgba(0, 0, 0, 0.8)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 12,
    },
});
