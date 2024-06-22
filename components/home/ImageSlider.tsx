import React, { useEffect, useRef, useState } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';
import { useThemeColor, useThemeColorVariant } from '@/components/Themed';
import Colors from '@/constants/Colors';

// Constants
const IMAGE_WIDTH_OFFSET = 24; // Adjusting for padding/margin
const INDICATOR_WIDTH = 10; // Width of inactive indicator dot
const INDICATOR_HEIGHT = 7.5; // Height of inactive indicator dot
const INDICATOR_ACTIVE_WIDTH = 20; // Width of active indicator dot
const INDICATOR_ACTIVE_HEIGHT = 7.5; // Height of active indicator dot
const DEFAULT_INTERVAL_DURATION = 5000; // Time between each slide in milliseconds
const TRANSITION_DURATION = 300; // Time for each transition animation in milliseconds

const img = Colors.lightImageSlider.dots

// ImageSlider component
const ImageSlider = ({ intervalDuration = DEFAULT_INTERVAL_DURATION }) => {
  const imageWidth = Dimensions.get('window').width; // Get the device window width
  const [activeIndex, setActiveIndex] = useState(0); // State to track the current active index
  const flatlistRef = useRef<FlatList>(null); // Reference to the FlatList component
  // const inactiveIndicatorColor = useThemeColorVariant({ light: img, dark: '#fff' }); // Hook to get inactive theme color
  // const activeIndicatorColor = useThemeColor({ light: '#d5e1eb', dark: 'bisque' }, 'background'); // Hook to get active theme color
  
  const inactiveIndicatorColor = useThemeColor({ light: Colors.lightImageSlider.dots, dark: Colors.darkImageSlider.dots }, 'background'); // Hook to get inactive theme color
  const activeIndicatorColor = useThemeColor({ light: Colors.lightImageSlider.activeDots, dark: Colors.darkImageSlider.activeDots}, 'background'); // Hook to get active theme color

  // Array of images to be displayed in the slider
  const imagesData = [
    { id: '1', image: require('../../assets/images/promotion.webp') },
    { id: '2', image: require('../../assets/images/promotion.webp') },
    { id: '3', image: require('../../assets/images/promotion.webp') },
    { id: '4', image: require('../../assets/images/promotion.webp') },
  ];

  const animatedValue = useRef(new Animated.Value(0)).current; // Animated value for indicator animation

  // useEffect hook to handle auto-scrolling of images
  useEffect(() => {
    const interval = setInterval(() => {
      const newIndex = (Math.round(activeIndex) + 1) % imagesData.length; // Calculate the next index
      smoothScrollToIndex(newIndex); // Smooth scroll to the next index
      setActiveIndex(newIndex); // Update the active index
    }, intervalDuration); // Interval duration for auto-scroll

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [activeIndex, imagesData.length, intervalDuration]);

  // Function to smooth scroll to a specific index
  const smoothScrollToIndex = (index: number) => {
    if (flatlistRef.current) {
      flatlistRef.current.scrollToIndex({
        index: index,
        animated: true,
      });
    }
    Animated.timing(animatedValue, {
      toValue: index,
      duration: TRANSITION_DURATION,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  };

  // useEffect hook to animate indicator when activeIndex changes
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: activeIndex,
      duration: TRANSITION_DURATION,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: false,
    }).start();
  }, [activeIndex]);

  // Function to render each image item
  const renderItem = ({ item }: { item: { id: string; image: any } }) => (
    <View>
      <Image
        source={item.image}
        style={[
          styles.image,
          {
            width: imageWidth - IMAGE_WIDTH_OFFSET, // Adjust image width
            height: (imageWidth - IMAGE_WIDTH_OFFSET) * 9 / 16, // Maintain aspect ratio
          },
        ]}
      />
    </View>
  );

  // Handle scroll event to update the active index
  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = scrollPosition / (imageWidth - IMAGE_WIDTH_OFFSET);
    setActiveIndex(index);
  };

  // Function to render indicator dots
  const renderIndicators = () => (
    imagesData.map((_, index) => {
      const animatedWidth = animatedValue.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [INDICATOR_WIDTH, INDICATOR_ACTIVE_WIDTH, INDICATOR_WIDTH],
        extrapolate: 'clamp',
      });
      const animatedHeight = animatedValue.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [INDICATOR_HEIGHT, INDICATOR_ACTIVE_HEIGHT, INDICATOR_HEIGHT],
        extrapolate: 'clamp',
      });
      const animatedBackgroundColor = animatedValue.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [inactiveIndicatorColor, activeIndicatorColor, inactiveIndicatorColor],
        extrapolate: 'clamp',
      });

      return (
        <Animated.View
          key={index}
          style={[
            styles.indicator,
            {
              width: animatedWidth, // Set the animated width for the indicator dot
              height: animatedHeight, // Set the animated height for the indicator dot
              backgroundColor: animatedBackgroundColor, // Set the animated background color for the indicator dot
            },
          ]}
        />
      );
    })
  );

  return (
    <View>
      <FlatList
        data={imagesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        ref={flatlistRef}
        decelerationRate="normal" // Adjust scroll deceleration rate
      />
      <View style={styles.indicatorContainer}>
        {renderIndicators()}
      </View>
    </View>
  );
};

// PropTypes validation for the intervalDuration prop
ImageSlider.propTypes = {
  intervalDuration: PropTypes.number,
};

// Styles for the component
const styles = StyleSheet.create({
  image: {
    borderRadius: 12,
    marginHorizontal: 5,
  },
  indicator: {
    borderRadius: 100, // Make the indicator dot rounded
    marginHorizontal: 3,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 8,
  },
});

export default ImageSlider;
