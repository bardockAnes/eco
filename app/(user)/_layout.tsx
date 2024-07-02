import React from 'react';
import { Redirect, Stack, Tabs } from 'expo-router';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useAuth } from '@/providers/AuthProviders';
import { AntDesign, FontAwesome  } from '@expo/vector-icons';
import { i18n } from '@/lib/i18n';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={23} style={{ marginBottom: -3, }} {...props} />;
}

function AntDesignIcon(props: {
  name: React.ComponentProps<typeof AntDesign>['name'];
  color: string;
}) {
  return <AntDesign size={22} style={{ marginBottom: -3 }} {...props} />;
}


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={"/"} />
  }



  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tabBarActiveTintColor,
        tabBarInactiveTintColor: Colors[colorScheme ?? 'light'].tabBarInactiveTintColor,
        headerShown: false,
        tabBarStyle: {
          height: 60,
          alignItems: 'center',
          backgroundColor: Colors[colorScheme ?? 'light'].tabBarBackgroundcolor,
          borderColor: "transparent",
          borderRadius: 30, // Fully rounded corners
          marginHorizontal: "10%", // Add horizontal margin to make it appear floating
          position: 'absolute', // Position the tab bar above the content
          bottom: 20, // Position it above the bottom of the screen
          left: 0,
          right: 0,
          elevation: 5, // Add shadow for Android
          shadowColor: '#000', // Shadow color for iOS
          shadowOffset: { width: 0, height: 2 }, // Shadow offset for iOS
          shadowOpacity: 0.25, // Shadow opacity for iOS
          shadowRadius: 3.84, // Shadow radius for iOS
        },
        tabBarLabelStyle: {
          textAlign: 'center',
        },
        tabBarItemStyle: {
          flex: 1,
          paddingVertical: 2,
          paddingBottom: 9,
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{ href: null, headerShown: false }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: i18n.t('tabs.home'),
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="categories"
        options={{
          title: i18n.t('tabs.categories'),
          headerShown: false,
          tabBarIcon: ({ color }) => <AntDesignIcon name="appstore-o"  color={color} />
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: 'Favorite',href:null, headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="star" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: i18n.t('tabs.settings'),
          tabBarIcon: ({ color }) => <TabBarIcon name="cog" color={color} />,
        }}
      />
    </Tabs>
  );
}
