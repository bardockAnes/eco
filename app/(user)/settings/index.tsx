import React, { useState } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useThemeColorVariant } from '@/components/Themed';
import Colors from '@/constants/Colors';
import { supabase } from '@/supabaseS/supabase';

export default function UserSettings() {
  const [darkModeOption, setDarkModeOption] = useState('system');
  const [isModalVisible, setModalVisible] = useState(false);

  const containerBackground = useThemeColorVariant({ light: Colors.light.background, dark: Colors.dark.background });

  const colors = containerBackground === Colors.light.background ? Colors.light : Colors.dark;

  const styles = createStyles(colors);


  const handleSignOut = () => {
    supabase.auth.signOut()
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
        return 'Light Mode';
      case 'dark':
        return 'Dark Mode';
      case 'system':
        return 'System Default';
      default:
        return 'Light Mode';
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {/* Account Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <TouchableOpacity style={styles.item} onPress={() => { }}>
          <Ionicons name="person-outline" size={24} color={colors.tint} style={styles.itemIcon} />
          <Text style={styles.itemText}>Profile</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.tint} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.item, styles.lastItemBorder]} onPress={() => { }}>
          <Ionicons name="lock-closed-outline" size={24} color={colors.tint} style={styles.itemIcon} />
          <Text style={styles.itemText}>Change Password</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.tint} />
        </TouchableOpacity>
      </View>

      {/* Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferences</Text>
        {/* Notifications */}
        <TouchableOpacity style={styles.preferenceItem}>
          <Ionicons name="notifications-outline" size={24} color={colors.tint} style={styles.itemIcon} />
          <Text style={styles.itemText}>Notifications</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.tint} />
        </TouchableOpacity>
        {/* Dark Mode */}
        <TouchableOpacity style={[styles.preferenceItem, styles.lastItemBorder]} onPress={() => setModalVisible(true)}>
          <Ionicons name={getDarkModeIcon()} size={24} color={colors.tint} style={styles.itemIcon} />
          <Text style={styles.itemText}>{getDarkModeText()}</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.tint} />
        </TouchableOpacity>
      </View>

      {/* Legal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal</Text>
        <TouchableOpacity style={styles.item} onPress={() => { }}>
          <Ionicons name="shield-checkmark-outline" size={24} color={colors.tint} style={styles.itemIcon} />
          <Text style={styles.itemText}>Privacy Policy</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.tint} />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.item, styles.lastItemBorder]} onPress={() => { }}>
          <Ionicons name="document-text-outline" size={24} color={colors.tint} style={styles.itemIcon} />
          <Text style={styles.itemText}>Terms of Service</Text>
          <Ionicons name="chevron-forward" size={18} color={colors.tint} />
        </TouchableOpacity>
      </View>

      {/* Sign Out */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
        <Ionicons name="log-out-outline" size={24} color="#fff" style={styles.signOutButtonIcon} />
      </TouchableOpacity>

      {/* Dark Mode Modal */}
      {isModalVisible && (
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Theme</Text>
            <TouchableOpacity style={styles.modalItem} onPress={() => toggleDarkMode('light')}>
              <Ionicons name="sunny-outline" size={24} color={colors.tint} style={styles.itemIcon} />
              <Text style={styles.modalItemText}>Light Mode</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => toggleDarkMode('dark')}>
              <Ionicons name="moon-outline" size={24} color={colors.tint} style={styles.itemIcon} />
              <Text style={styles.modalItemText}>Dark Mode</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalItem} onPress={() => toggleDarkMode('system')}>
              <Ionicons name="cloudy-outline" size={24} color={colors.tint} style={styles.itemIcon} />
              <Text style={styles.modalItemText}>System Default</Text>
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
    borderBottomWidth: 1,
    borderColor: '#e0e0e0'
  },
  lastItemBorder: {
    borderBottomWidth: 0,
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
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: '#e0e0e0',
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
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  modalItemText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
});

