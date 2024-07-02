// LanguageProvider.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import * as Updates from 'expo-updates';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { i18n } from '@/lib/i18n';
import Colors from '@/constants/Colors';
import { useColorScheme } from 'react-native';

interface LanguageContextProps {
  language: string;
  setLanguage: (language: string) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    const loadLanguage = async () => {
      const savedLanguage = await AsyncStorage.getItem('appLanguage');
      if (savedLanguage) {
        setLanguage(savedLanguage);
        i18n.locale = savedLanguage;
      }
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (newLanguage: string) => {
    setLanguage(newLanguage);
    i18n.locale = newLanguage;
    await AsyncStorage.setItem('appLanguage', newLanguage);
    await Updates.reloadAsync(); // Reload the app
  };

function useThemeColorVariantC(
    variantProps: { light?: any; dark?: any }
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

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
