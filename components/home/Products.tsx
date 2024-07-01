import React, { useState } from 'react';
import { StyleSheet, ScrollView, Pressable, Image, Modal, Text, View } from 'react-native';
import { ActivityIndicator, useThemeColorVariant } from '../Themed';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import { useWorksList } from '@/api/works';
import RemoteImage from '../RemoteImage';
import { LinearGradient } from 'expo-linear-gradient';
import { Link, useSegments } from 'expo-router';

type ProductsProps = {
  category: string;
};

const Products: React.FC<ProductsProps> = ({ category }) => {
  const [filterVisible, setFilterVisible] = useState(false);
  const [categoryName, setCategoryName] = useState('New Arrivals');
  const [sortBy, setSortBy] = useState<'created_at' | 'price'>('created_at');

  const { data: works, error, isLoading } = useWorksList(category, sortBy);
  const segments = useSegments();

  // Theme Color
  const containerBackground = useThemeColorVariant({ light: Colors.lightProducts.containerBackground, dark: Colors.darkProducts.containerBackground });
  const colors = containerBackground === Colors.lightProducts.containerBackground ? Colors.lightProducts : Colors.darkProducts;
  const styles = createStyles(colors);

  const openFilterModal = () => {
    setFilterVisible(true);
  };

  const closeFilterModal = (newCategory: React.SetStateAction<string> | null) => {
    if (newCategory === 'New Arrivals') {
      setSortBy('created_at');
    } else if (newCategory === 'Low Price') {
      setSortBy('price');
    }
    if (newCategory) {
      setCategoryName(newCategory);
    }
    setFilterVisible(false);
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fetching the data</Text>;
  }

  return (
    <View style={styles.worksContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>{categoryName}</Text>
        <Pressable onPress={openFilterModal} style={styles.proButton}>
          <Ionicons name="options" size={24} color={colors.proIconColor} />
        </Pressable>
      </View>
      <ScrollView style={styles.worksScrollView}>
        <View style={styles.worksContent}>
          {works && works.map((work) => (
            <Link href={`/${segments[0]}/home/${work.id}`} key={work.id} asChild>
              <Pressable style={styles.work}>
                <RemoteImage
                  path={work.image}
                  fallback="https://via.placeholder.com/200"
                  style={{ width: "100%", aspectRatio: 2 / 3, borderRadius: 12 }}
                />
                <View style={styles.workOverlay}>
                  <LinearGradient
                    colors={['transparent', 'rgba(0, 0, 0, 0.17)']}
                    style={styles.gradient}
                  />
                  <View style={styles.workDetails}>
                    <Text style={styles.workLabel}>{work.name}</Text>
                    <Text style={styles.workPrice}>{work.price} DZD</Text>
                  </View>
                </View>
              </Pressable>
            </Link>
          ))}
        </View>
      </ScrollView>
      <Modal visible={filterVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Works</Text>
            <Pressable onPress={() => closeFilterModal('New Arrivals')}><Text style={styles.modalButtonText}>New Arrivals</Text></Pressable>
            <Pressable onPress={() => closeFilterModal('Low Price')}><Text style={styles.modalButtonText}>Low Price</Text></Pressable>
            <Pressable onPress={() => closeFilterModal(null)}><Text style={styles.modalButtonText}>Close</Text></Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Products;

const createStyles = (colors: any) => StyleSheet.create({
  worksContainer: {
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
  worksScrollView: {
    borderRadius: 12,
    overflow: 'hidden', // Ensure rounded corners
    marginBottom: 10,
  },
  worksContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  work: {
    width: '48.5%',
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
  workImage: {
    width: '100%',
    height: 200, // Adjust image height as needed
    borderRadius: 12,
  },
  workOverlay: {
    ...StyleSheet.absoluteFillObject, // Position overlay absolutely within parent
    justifyContent: 'flex-end', // Align content at the bottom
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 12,
  },
  workDetails: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  workLabel: {
    fontSize: 16,
    color: '#ffffff', // White text color
    fontWeight: 'bold',
  },
  workPrice: {
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
