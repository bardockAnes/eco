import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Shirts, Jeans, Casquette, Shoes, Vestes } from '@/components/Svgs';
import Colors from '@/constants/Colors';
import { useThemeColorVariant } from '@/components/Themed';


// Define types for your data structure
interface Item {
    key: string;
    icon: JSX.Element;
    label: string;
}

const iconSize = 58

const data: Item[] = [
    { key: 'shirts1', icon: <Shirts size={iconSize} mainColor="black" color1="#00a8e8" color2="#0077b6" color3='#ff7f50' color4='#ff4d4f' color5="gray"/>, label: 'Shirts' },
    { key: 'jeans1', icon: <Jeans size={iconSize} mainColor="black" color1="#00a8e8" color2="#0077b6" color3='#ff7f50' color4='#ff4d4f' color5="gray"/>, label: 'Jeans' },
    { key: 'casquette1', icon: <Casquette size={iconSize} mainColor="black" color1="#00a8e8" color2="#0077b6" color3='#ff7f50' color4='#ff4d4f' color5="gray"/>, label: 'Casquette' },
    { key: 'shoes1', icon: <Shoes size={iconSize} mainColor="black" color1="#00a8e8" color2="#0077b6" color3='#ff7f50' color4='#ff4d4f' color5="gray"/>, label: 'Shoes' },
    { key: 'vestes1', icon: <Vestes size={iconSize} mainColor="black" color1="#00a8e8" color2="#0077b6" color3='#ff7f50' color4='#ff4d4f' color5="gray"/>, label: 'Vestes' },
    { key: 'shirts2', icon: <Shirts size={iconSize} mainColor="black" color1="#00a8e8" color2="#0077b6" color3='#ff7f50' color4='#ff4d4f' color5="gray"/>, label: 'Shirts' },
    { key: 'jeans2', icon: <Jeans size={iconSize} mainColor="black" color1="#00a8e8" color2="#0077b6" color3='#ff7f50' color4='#ff4d4f' color5="gray"/>, label: 'Jeans' },
    { key: 'casquette2', icon: <Casquette size={iconSize} mainColor="black" color1="#00a8e8" color2="#0077b6" color3='#ff7f50' color4='#ff4d4f' color5="gray"/>, label: 'Casquette' },
    { key: 'shoes2', icon: <Shoes size={iconSize} mainColor="black" color1="#00a8e8" color2="#0077b6" color3='#ff7f50' color4='#ff4d4f' color5="gray"/>, label: 'Shoes' },
    { key: 'vestes2', icon: <Vestes size={iconSize} mainColor="black" color1="#00a8e8" color2="#0077b6" color3='#ff7f50' color4='#ff4d4f' color5="gray"/>, label: 'Vestes' },
    { key: 'shirts3', icon: <Shirts size={iconSize} mainColor="black" color1="#00a8e8" color2="#0077b6" color3='#ff7f50' color4='#ff4d4f' color5="gray"/>, label: 'Shirts' },
    { key: 'jeans3', icon: <Jeans size={iconSize} mainColor="black" color1="#00a8e8" color2="#0077b6" color3='#ff7f50' color4='#ff4d4f' color5="gray"/>, label: 'Jeans' },
    { key: 'casquette3', icon: <Casquette size={iconSize} mainColor="black" color1="#00a8e8" color2="#0077b6" color3='#ff7f50' color4='#ff4d4f' color5="gray"/>, label: 'Casquette' },
    { key: 'shoes3', icon: <Shoes size={iconSize} mainColor="black" color1="#00a8e8" color2="#0077b6" color3='#ff7f50' color4='#ff4d4f' color5="gray"/>, label: 'Shoes' },
    { key: 'vestes3', icon: <Vestes size={iconSize} mainColor="black" color1="#00a8e8" color2="#0077b6" color3='#ff7f50' color4='#ff4d4f' color5="gray"/>, label: 'Vestes' },
];

const Orders: React.FC = () => {

    const containerBackground = useThemeColorVariant({ light: Colors.light.background, dark: Colors.dark.background });

    const colors = containerBackground === Colors.light.background ? Colors.light : Colors.dark;

    const styles = createStyles(colors);


// Extracted IconItem component for reusability
const IconItem: React.FC<{ item: Item }> = ({ item }) => (
    <View style={styles.gridItem}>
        <View style={styles.iconContainer}>
            {item.icon}
            <Text style={styles.iconLabel}>{item.label}</Text>
        </View>
    </View>
);


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.gridContainer}>
                {data.map(item => (
                    <IconItem key={item.key} item={item} />
                ))}
            </View>
        </ScrollView>
    );
};

const { width } = Dimensions.get('window');
const itemWidth = width / 2 - 35; // Adjust width based on your desired spacing

// Styles
const createStyles = (colors: any) => StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 10,
        paddingBottom:100,
        backgroundColor: colors.background, // Light gray background
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        paddingHorizontal: 10,
    },
    gridItem: {
        width: itemWidth,
        marginVertical: 10,
    },
    iconContainer: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.showBack,
        padding: 20,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    iconLabel: {
        marginTop: 10,
        fontSize: 17,
        textAlign: 'center',
        color: colors.text,// Dark gray text color
        fontFamily: 'Roboto',
    },
});

export default Orders;
