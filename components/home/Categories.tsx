import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import {  Jean, Casquette, Shoes, Tshirt, Ensmble, Accessoires, Claqute } from '@/components/Svgs';
import { useThemeColorVariant } from '../Themed';
import Colors from '@/constants/Colors';
import { Link, useSegments } from 'expo-router';

type CategoriesProps = {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
};

const Categories: React.FC<CategoriesProps> = ({ activeCategory, setActiveCategory }) => {
  const segments = useSegments();

  const containerBackground = useThemeColorVariant({ light: Colors.lightCategories.containerBackground, dark: Colors.darkCategories.containerBackground });

  const colors = {
    ...(containerBackground === Colors.lightCategories.containerBackground ? Colors.lightCategories : Colors.darkCategories),
    containerBackground,
  };

  const colorPalettes = {
    main: { ...colors, color1: colors.color1, color2: colors.color2, color3: colors.color3, color4: colors.color4, color5: colors.color5 },
  };

  type PaletteKeys = keyof typeof colorPalettes;

  const categoriesData: { Icon: React.ComponentType<any>; label: string; palette: PaletteKeys; name: string }[] = [
    { Icon: Tshirt, label: 'Haut', palette: 'main', name: 'Haut', },
    { Icon: Jean, label: 'desk', palette: 'main', name: 'Bas', },
    { Icon: Ensmble, label: 'Ensemble', palette: 'main', name: 'Ensemble', },
    { Icon: Shoes, label: 'Shoes', palette: 'main', name: 'anes', },
    { Icon: Accessoires, label: 'accesoires', palette: 'main', name: 'Accessoires', },
    { Icon: Casquette, label: 'Casquette', palette: 'main', name: 'Casquette', },
    { Icon: Claqute, label: 'Claquettes', palette: 'main', name: 'Claquettes', },
  ];

  const handleCategoryPress = (category: string) => {
    setActiveCategory(category);
  };

  const styles = createStyles(colors, activeCategory);

  return (
    <View style={styles.categoriesContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <Link href={`/${segments[0]}/categories`} asChild><TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity></Link>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
        <TouchableOpacity
          style={[styles.category, activeCategory === 'All' && styles.activeCategory]}
          onPress={() => handleCategoryPress('All')}
        >
          <Text style={[styles.categoryLabel, activeCategory === 'All' && styles.activeCategoryText, styles.uppercaseText]}>All</Text>
        </TouchableOpacity>
        {categoriesData.map(({ Icon, label, palette, name }, index) => (
          <TouchableOpacity
            style={[styles.category, activeCategory === label && styles.activeCategory]}
            key={index}
            onPress={() => handleCategoryPress(label)}
          >
            <Icon size={40} {...colorPalettes[palette]} />
            <Text style={[styles.categoryLabel, activeCategory === label && styles.activeCategoryText]}>{name}</Text>
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
    width: 90,
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
