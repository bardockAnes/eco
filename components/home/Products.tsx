import React, { useState } from 'react';
import { StyleSheet, ScrollView, Pressable, Image, Modal, Text, View } from 'react-native';
import { useThemeColorVariant } from '../Themed';
import { FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; // Import MaterialIcons
import Colors from '@/constants/Colors';

const Products = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [category, setCategory] = useState('New Arrivals');
  const [products, setProducts] = useState([
    { id: 1, name: 'Product 1', price: 1999, image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f', starred: false },
    { id: 2, name: 'Product 2', price: 2999, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab', starred: false },
    { id: 3, name: 'Product 3', price: 3999, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c', starred: false },
    { id: 4, name: 'Product 4', price: 4999, image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e', starred: false },
    { id: 5, name: 'Product 5', price: 5999, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f', starred: false },
    // Add more products as needed with 'starred' property initialized
  ]);


  const containerBackground = useThemeColorVariant({ light: Colors.lightProducts.containerBackground, dark: Colors.darkProducts.containerBackground });

  const colors = containerBackground === Colors.lightProducts.containerBackground ? Colors.lightProducts : Colors.darkProducts;

  const styles = createStyles(colors);

  const openFilterModal = () => {
    setFilterVisible(true);
  };

  const closeFilterModal = (newCategory: React.SetStateAction<string> | null) => {
    if (newCategory) {
      setCategory(newCategory);
    }
    setFilterVisible(false);
  };

  const handleStarPress = (productId: number) => {
    // Toggle star color on click
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId ? { ...product, starred: !product.starred } : product
      )
    );
  };

  return (
    <View style={styles.productsContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{category}</Text>
        <Pressable onPress={openFilterModal} style={styles.proButton}>
          <MaterialCommunityIcons name="account-star" size={24} color={colors.proIconColor} />
          <Text style={styles.proButtonText}>Filter</Text>
        </Pressable>
      </View>
      <ScrollView style={styles.productsScrollView}>
        <View style={styles.productsContent}>
          {products.map((product) => (
            <Pressable key={product.id} style={styles.product}>
              <Image style={styles.productImage} source={{ uri: product.image }} />
              <View style={styles.productOverlay}>
                <View style={styles.productDetails}>
                  <Text style={styles.productLabel}>{product.name}</Text>
                  <Text style={styles.productPrice}>{product.price} DZD</Text>
                </View>
                <Pressable onPress={() => handleStarPress(product.id)} style={styles.starContainer}>
                  <FontAwesome
                    name="star"
                    size={24}
                    color={product.starred ? '#f39c12' : colors.starColor}
                  />
                </Pressable>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <Modal visible={filterVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Products</Text>
            <Pressable onPress={() => closeFilterModal('New Arrivals')}><Text style={styles.modalButtonText}>New Arrivals</Text></Pressable>
            <Pressable onPress={() => closeFilterModal('Popular')}><Text style={styles.modalButtonText}>Popular</Text></Pressable>
            <Pressable onPress={() => closeFilterModal('On Sale')}><Text style={styles.modalButtonText}>On Sale</Text></Pressable>
            <Pressable onPress={() => closeFilterModal(null)}><Text style={styles.modalButtonText}>Close</Text></Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Products;

const createStyles = (colors: any) => StyleSheet.create({
  productsContainer: {
    flex: 1,
    backgroundColor: colors.containerBackground,
    paddingVertical: 10,
    paddingHorizontal: 10,
    paddingBottom: 50,
    borderRadius: 12,
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
  proButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.proButtonBackground,
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  proButtonText: {
    marginLeft: 10,
    fontSize: 14,
    color: colors.proButtonText,
    fontWeight: 'bold',
  },
  productsScrollView: {
    borderRadius: 12,
    overflow: 'hidden', // Ensure rounded corners
    marginBottom: 10,
  },
  productsContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 5,
  },
  product: {
    width: '47%',
    backgroundColor: colors.productBackground,
    borderRadius: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    overflow: 'hidden', // Ensure image overlay is contained within border radius
    position: 'relative', // Needed for absolute positioning of overlay
  },
  productImage: {
    width: '100%',
    height: 200, // Adjust image height as needed
    borderRadius: 12,
  },
  productOverlay: {
    ...StyleSheet.absoluteFillObject, // Position overlay absolutely within parent
    backgroundColor: 'transparent', // Transparent background
    paddingHorizontal: 10,
    justifyContent: 'flex-end', // Align content at the bottom
  },
  productDetails: {
    marginBottom: 10,
  },
  productLabel: {
    fontSize: 16,
    color: '#ffffff', // White text color
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#ffffff', // White text color
  },
  starContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  star: {
    backgroundColor: colors.starBackground,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  starActive: {
    backgroundColor: '#f39c12', // Change color when active
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: colors.containerBackground,
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.headerTitle,
    marginBottom: 20,
  },
  modalButtonText: {
    fontSize: 18,
    color: colors.headerTitle,
    marginBottom: 15,
  },
});
