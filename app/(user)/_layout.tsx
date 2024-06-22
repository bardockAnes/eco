import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useAuth } from '@/providers/AuthProviders';
import { View } from '@/components/Themed';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={25} style={{ marginBottom: -3 }} {...props} />;
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
          paddingBottom: 7,
          backgroundColor: Colors[colorScheme ?? 'light'].tabBarBackgroundcolor,
          borderColor:"transparent",
          borderRadius: 30, // Fully rounded corners
          marginHorizontal: 20, // Add horizontal margin to make it appear floating
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
        },
      }}
    >
      <Tabs.Screen
        name='index'
        options={{ href: null, headerShown: false }}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          tabBarItemStyle: {
            marginTop: 5
          },
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Categorais',
          headerShown: false,
          tabBarIcon: ({ color }) => <TabBarIcon name="th" color={color} />,
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: 'Fav',
          tabBarIcon: ({ color }) => <TabBarIcon name="fa" color={color} />,
        }}
      />
    </Tabs>
  );
}
