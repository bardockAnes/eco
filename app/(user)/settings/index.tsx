// UserSettings.tsx
import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, TouchableWithoutFeedback, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColor, useThemeColorVariant } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { supabase } from '@/supabaseS/supabase';
import { useLanguage } from '@/providers/LanguageProvider';
import { i18n } from '@/lib/i18n';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';

export default function UserSettings() {
  const [darkModeOption, setDarkModeOption] = useState('system');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLanguageModalVisible, setLanguageModalVisible] = useState(false);

  const { language, setLanguage } = useLanguage();
 
  useThemeColor({overrideTheme:'light'},'background')
 
  const containerBackground = useThemeColorVariant({ light: Colors.light.background, dark: Colors.dark.background });
  const colors = containerBackground === Colors.light.background ? Colors.light : Colors.dark;
  const styles = createStyles(colors);

  const handleSignOut = () => {
    supabase.auth.signOut();
  };

  const toggleDarkMode = (option: React.SetStateAction<string>) => {
    setDarkModeOption(option);
    setModalVisible(false);
  };

  const getDarkModeIcon = () => {
    switch (darkModeOption) {
      case 'light':
        return 'sunny-outline';
      case 'dark':
        return 'moon-outline';
      case 'system':
        return 'cloudy-outline';
      default:
        return 'sunny-outline';
    }
  };

  const getDarkModeText = () => {
    switch (darkModeOption) {
      case 'light':
        return i18n.t('lightMode');
      case 'dark':
        return i18n.t('darkMode');
      case 'system':
        return i18n.t('systemDefault');
      default:
        return i18n.t('lightMode');
    }
  };

  const handleChangeLanguage = (newLanguage: string) => {
    setLanguage(newLanguage);
    setLanguageModalVisible(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{i18n.t('accountSettings')}</Text>
        <TouchableOpacity style={styles.item} onPress={() => { }}>
          <Ionicons name="person-outline" size={24} color={colors.tint} style={styles.itemIcon} />
          <Text style={styles.itemText}>{i18n.t('profile')}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.tint} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => { }}>
          <Ionicons name="lock-closed-outline" size={24} color={colors.tint} style={styles.itemIcon} />
          <Text style={styles.itemText}>{i18n.t('changePassword')}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.tint} />
        </TouchableOpacity>
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{i18n.t('preferences')}</Text>
        {/* Notifications */}
        <TouchableOpacity style={styles.item}>
          <Ionicons name="notifications-outline" size={24} color={colors.tint} style={styles.itemIcon} />
          <Text style={styles.itemText}>{i18n.t('notifications')}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.tint} />
        </TouchableOpacity>
        {/* Dark Mode */}
        <TouchableOpacity style={styles.item} onPress={() => setModalVisible(true)}>
          <Ionicons name={getDarkModeIcon()} size={24} color={colors.tint} style={styles.itemIcon} />
          <Text style={styles.itemText}>{getDarkModeText()}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.tint} />
        </TouchableOpacity>
      </View>

      {/* Legal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{i18n.t('legal')}</Text>
        <TouchableOpacity style={styles.item} onPress={() => { }}>
          <Ionicons name="shield-checkmark-outline" size={24} color={colors.tint} style={styles.itemIcon} />
          <Text style={styles.itemText}>{i18n.t('privacyPolicy')}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.tint} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.item} onPress={() => { }}>
          <Ionicons name="document-text-outline" size={24} color={colors.tint} style={styles.itemIcon} />
          <Text style={styles.itemText}>{i18n.t('termsOfService')}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.tint} />
        </TouchableOpacity>
      </View>

      {/* Language */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{i18n.t('chooseLanguage')}</Text>
        <TouchableOpacity style={styles.item} onPress={() => setLanguageModalVisible(true)}>
          <Ionicons name="globe-outline" size={24} color={colors.tint} style={styles.itemIcon} />
          <Text style={styles.itemText}>{i18n.t(language)}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.tint} />
        </TouchableOpacity>
      </View>

      {/* Sign Out */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>{i18n.t('signOut')}</Text>
        <Ionicons name="log-out-outline" size={24} color="#fff" style={styles.signOutButtonIcon} />
      </TouchableOpacity>

      {/* Dark Mode Modal */}
      {isModalVisible && (
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{i18n.t('chooseTheme')}</Text>
            <TouchableOpacity style={styles.modalItem} onPress={() => toggleDarkMode('light')}>
              <Ionicons name="sunny-outline" size={24} color={colors.tint} style={styles.itemIcon} />
              <Text style={styles.modalItemText}>{i18n.t('lightMode')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => toggleDarkMode('dark')}>
              <Ionicons name="moon-outline" size={24} color={colors.tint} style={styles.itemIcon} />
              <Text style={styles.modalItemText}>{i18n.t('darkMode')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => toggleDarkMode('system')}>
              <Ionicons name="cloudy-outline" size={24} color={colors.tint} style={styles.itemIcon} />
              <Text style={styles.modalItemText}>{i18n.t('systemDefault')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Language Modal */}
      {isLanguageModalVisible && (
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => setLanguageModalVisible(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{i18n.t('chooseLanguage')}</Text>
            <TouchableOpacity style={styles.modalItem} onPress={() => handleChangeLanguage('en')}>
              <Text style={styles.modalItemText}>{i18n.t('english')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => handleChangeLanguage('ar')}>
              <Text style={styles.modalItemText}>{i18n.t('arabic')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => handleChangeLanguage('fr')}>
              <Text style={styles.modalItemText}>{i18n.t('french')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const createStyles = (colors: any) => StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: colors.background,
    paddingBottom: 100
  },
  section: {
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: colors.showBack,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text,
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  itemText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 20,
    flex: 1,
  },
  itemIcon: {
    marginRight: 10,
  },
  signOutButton: {
    backgroundColor: '#d9534f',
    borderRadius: 10,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutButtonText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    marginRight: 10,
  },
  signOutButtonIcon: {
    marginLeft: 5,
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: colors.background,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: colors.text,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  modalItemText: {
    fontSize: 16,
    color: colors.text,
    marginLeft: 10,
  },
});
