import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { Casquette, Shoes, Tshirt, Ensemble, Accessoires, Claquettes, Jeans } from '@/components/Svgs';
import { useThemeColorVariant } from '../Themed';
import Colors from '@/constants/Colors';
import { Link, useSegments } from 'expo-router';
import { i18n } from '@/lib/i18n';

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
  const AllCategories = ['haut', 'bas', 'ensemble', 'shoes', 'accessoires', 'casquette', 'claquettes'];

  const categoriesData: { Icon: React.ComponentType<any>; label: string; palette: PaletteKeys; name: string }[] = [
    { Icon: Tshirt, label: 'haut', palette: 'main', name: i18n.t('home.categoriesTop') },
    { Icon: Jeans, label: 'desk', palette: 'main', name: i18n.t('home.categoriesBottom') },
    { Icon: Ensemble, label: 'ensemble', palette: 'main', name: i18n.t('home.categoriesSet') },
    { Icon: Shoes, label: 'shoes', palette: 'main', name: i18n.t('home.categoriesShoes')},
    { Icon: Accessoires, label: 'accessoires', palette: 'main', name: i18n.t('home.categoriesAccessories') },
    { Icon: Casquette, label: 'casquette', palette: 'main', name: i18n.t('home.categoriesCap') },
    { Icon: Claquettes, label: 'claquettes', palette: 'main', name: i18n.t('home.categoriesSlides') },
  ];

  const handleCategoryPress = (category: string) => {
    setActiveCategory(category);
  };

  const styles = createStyles(colors, activeCategory);

  return (
    <View style={styles.categoriesContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{i18n.t('home.categoriesTitle')}</Text>
        <Link href={`/${segments[0]}/categories`} asChild><TouchableOpacity><Text style={styles.seeAll}>{i18n.t('home.categoriesSeeAll')}</Text></TouchableOpacity></Link>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categories}>
        <TouchableOpacity
          style={[styles.category, activeCategory === 'All' && styles.activeCategory]}
          onPress={() => handleCategoryPress('All')}
        >
          <Text style={[styles.categoryLabel, activeCategory === 'All' && styles.activeCategoryText, styles.uppercaseText]}>{i18n.t('home.categoriesAll')}</Text>
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
