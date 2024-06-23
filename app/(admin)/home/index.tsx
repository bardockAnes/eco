import React from 'react';
import { StyleSheet, ScrollView, TextInput, Text } from 'react-native';
import { View, useThemeColor } from '@/components/Themed'; // Import useThemeColorVariant hook
import ImageSlider from '@/components/home/ImageSlider';
import Categories from '@/components/home/Categories';
import Products from '@/components/home/Products';
import Colors from '@/constants/Colors';

// SearchBar component
const SearchBar = () => {
  return (
    <View style={searchStyles.container}>
      <TextInput
        style={searchStyles.input}
        placeholder="Search products..."
        placeholderTextColor="#a5a5a5"
      />
    </View>
  );
};

const TabOneScreen = () => {
  const containerBackground = useThemeColor({ light: Colors.lightHome.background, dark: Colors.darkHome.background, }, 'background'); // Theme background color

  return (
    <ScrollView>
      <View style={[styles.container, { backgroundColor: containerBackground }]}>
        {/* <SearchBar /> Insert SearchBar component here */}
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

const searchStyles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff', // Light theme background color
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  input: {
    fontSize: 16,
    color: '#333',
  },
});
