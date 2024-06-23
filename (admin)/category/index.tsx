import React from 'react';
import { StyleSheet, ScrollView, TextInput, Text } from 'react-native';
import { View, useThemeColor } from '@/components/Themed'; // Import useThemeColorVariant hook
import ImageSlider from '@/components/home/ImageSlider';
import Categories from '@/components/home/Categories';
import Products from '@/components/home/Products';
import Colors from '@/constants/Colors';


const TabOneScreen = () => {
  const containerBackground = useThemeColor({ light: Colors.lightHome.background, dark: Colors.darkHome.background, }, 'background'); // Theme background color

  return (
    <ScrollView>
      <View style={[styles.container, { backgroundColor: containerBackground }]}>
        <ImageSlider />
        <Categories />
        <Products />
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

