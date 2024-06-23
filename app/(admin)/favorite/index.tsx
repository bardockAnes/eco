import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { View, useThemeColor } from '@/components/Themed';
import Colors from '@/constants/Colors';
import ProductsFavorite from '@/components/favorite/ProductsFavorite';



const Favorite = () => {
  const containerBackground = useThemeColor({ light: Colors.lightHome.background, dark: Colors.darkHome.background, }, 'background'); // Theme background color

  return (
    <ScrollView contentContainerStyle={[styles.container, { backgroundColor: containerBackground }]}>

        <ProductsFavorite />

    </ScrollView>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 5,
    paddingHorizontal: 7,
    paddingVertical: 20,
  },
});

