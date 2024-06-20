/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from 'react-native';
import { ActivityIndicator as DefaultactivityIndicator } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from './useColorScheme';
import { colors } from 'react-native-elements';

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function useThemeColorVariant(
  variantProps: { light?: string; dark?: string }
) {
  // Determine the current theme ('light' or 'dark')
  const theme = useColorScheme() ?? 'light';
  // Retrieve the color variant based on the current theme
  const colorVariant = variantProps[theme];
  // If a specific color variant is provided for the current theme, use it
  // Otherwise, fall back to the default color variant from the theme
  if (colorVariant) {
    return colorVariant;
  } else {
    return Colors[theme]; // Assuming Colors is an object containing light and dark theme colors
  }
}


export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function ActivityIndicator() {
  return <DefaultactivityIndicator style={{flex:1}} size={"large"} color={Colors.light.tint}/>
}