// Light Theme
const tintColorLight = '#0077b6';           // Professional blue shade
const lightBackground = '#f8f9fa';          // Light grey background for elegance
const mainLightColor = '#0077b6';           // Bright blue for an appealing accent color
const mainLightColorShade1 = '#86b9f2';     // Lighter shade of main light color
const mainLightColorShade2 = '#0041b3';     // Darker shade of main light color
const secondaryLightColor = '#adb5bd';      // Light grey for secondary elements
const textLightColor = '#212529';           // Dark grey for text

// Dark Theme
const tintColorDark = '#ffeead';            // Soft pastel yellow for contrast in dark mode
const darkBackground = '#212529';           // Deep grey for dark mode sophistication
const mainDarkColor = '#ffeead';            // Soft pastel yellow for contrast in dark mode
const mainDarkColorShade1 = '#ffd8b1';      // Lighter shade of main dark color
const mainDarkColorShade2 = '#b88700';      // Darker shade of main dark color
const secondaryDarkColor = '#6c757d';       // Mid-grey for secondary elements
const textDarkColor = '#f8f9fa';            // Light grey for text

// Additional accent colors
const accentColor1 = '#fca311';  // Bright orange
const accentColor2 = '#8ac926';  // Vibrant green

export default {
  light: {
    text: textLightColor,
    background: lightBackground,
    backgroundcolor: lightBackground,
    tint: tintColorLight,
    tabIconDefault: secondaryLightColor,
    tabIconSelected: tintColorLight,
    header: '#e9ecef',
    tabBarActiveTintColor: mainLightColor,
    tabBarInactiveTintColor: secondaryLightColor,
    tabBarBackgroundcolor: lightBackground,
    secondary: secondaryLightColor,
    headerText: textLightColor,
    mainShade1: mainLightColorShade1,
    mainShade2: mainLightColorShade2,
    accent1: accentColor1,
    accent2: accentColor2,
    showBack: '#FFFFFF',
  },
  dark: {
    text: textDarkColor,
    background: darkBackground,
    backgroundcolor: darkBackground,
    tint: tintColorDark,
    tabIconDefault: secondaryDarkColor,
    tabIconSelected: tintColorDark,
    header: mainDarkColor,
    tabBarActiveTintColor: mainDarkColor,
    tabBarInactiveTintColor: secondaryDarkColor,
    tabBarBackgroundcolor: darkBackground,
    secondary: secondaryDarkColor,
    headerText: textDarkColor,
    mainShade1: mainDarkColorShade1,
    mainShade2: mainDarkColorShade2,
    accent1: accentColor1,
    accent2: accentColor2,
    showBack: '#343A40',

  },
  // header 
  lightHeader: {
    backgroundcolor: lightBackground,
    headerIcon: mainLightColor,
    text: textLightColor
  },
  darkHeader: {
    backgroundcolor: darkBackground,
    headerIcon: mainDarkColor,
    text: textDarkColor
  },
  // home 
  lightHome: {
    background: lightBackground,
    text: textLightColor
  },
  darkHome: {
    background: darkBackground,
    text: textDarkColor
  },
  // image slider
  lightImageSlider: {
    activeDots: mainLightColor,
    dots: secondaryLightColor
  },
  darkImageSlider: {
    activeDots: mainDarkColor,
    dots: secondaryDarkColor
  },
  // Categories
  lightCategories: {
    mainColor: darkBackground,
    transparent: 'transparent',
    categoryBackground: '#f1f3f5',
    containerBackground: lightBackground,
    headerTitle: darkBackground,
    seeAllText: '#6c757d',
    color1: '#00a8e8', // Turquoise blue
    color2: '#0077b6', // Professional blue
    color3: '#ff7f50', // Coral
    color4: '#ff4d4f', // Bright red
    color5: '#8e44ad', // Deep purple
    label: darkBackground,
    activeCategoryBackground: mainLightColor,
    activeCategoryText: '#ffffff',  // White text for active category
  },
  darkCategories: {
    mainColor: darkBackground,
    transparent: 'transparent',
    categoryBackground: '#495057',  // Darker grey
    containerBackground: darkBackground,
    headerTitle: '#f8f9fa',  // Light grey for contrast
    seeAllText: '#adb5bd',
    color1: '#00a8e8', // Turquoise blue
    color2: '#0077b6', // Professional blue
    color3: '#ff7f50', // Coral
    color4: '#ff4d4f', // Bright red
    color5: '#8e44ad', // Deep purple
    label: '#f8f9fa',  // Light grey for readability
    activeCategoryBackground: mainDarkColor,
    activeCategoryText: '#212529',  // Dark text for contrast
  },
  // products 
  lightProducts: {
    containerBackground: lightBackground,
    categoryBackground: '#f1f3f5',
    headerTitle: darkBackground,
    seeAllText: '#6c757d',
    label: darkBackground,
    productBackground: '#e3f2fd',  // Light blue for product background
    priceIcon: '#ff4d4f',  // Bright red for price
    starColor: '#ffffff',  // White star icon
    starBackground: '#0d6efd',  // Blue background for star icon
    proButtonBackground: mainLightColor,
    proIconColor: '#ffffff',  // White icon for contrast
    proButtonText: '#ffffff',  // White text for contrast
  },
  darkProducts: {
    containerBackground: darkBackground,
    categoryBackground: '#343a40',  // Dark grey for product background
    headerTitle: '#f8f9fa',
    seeAllText: '#adb5bd',
    label: '#f8f9fa',
    productBackground: '#495057',  // Slightly lighter grey
    priceIcon: '#ff4d4f',  // Bright red for price
    starColor: '#ffffff',  // White star icon
    starBackground: '#0d6efd',  // Blue background for star icon
    proButtonBackground: mainDarkColor,
    proIconColor: '#212529',  // Dark icon for contrast
    proButtonText: '#212529',  // Dark text for contrast
  }
};
