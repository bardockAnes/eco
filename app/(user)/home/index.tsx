import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text } from 'react-native';
import { View, useThemeColor } from '@/components/Themed';
import ImageSlider from '@/components/home/ImageSlider';
import Categories from '@/components/home/Categories';
import Products from '@/components/home/Products';
import Colors from '@/constants/Colors';

const TabOneScreen = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const containerBackground = useThemeColor({ light: Colors.lightHome.background, dark: Colors.darkHome.background }, 'background');

  return (
    <ScrollView style={{backgroundColor: containerBackground}}>
      <View style={[styles.container, { backgroundColor: containerBackground }]}>
        <ImageSlider />
        <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
        <Products category={activeCategory} />
      </View>
    </ScrollView>
  );
};

export default TabOneScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
    paddingHorizontal: 7,
    paddingVertical: 20,
  },
});
