import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { useAuth } from '@/providers/AuthProviders';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={25} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {isAdmin} = useAuth();

  if(!isAdmin) {
    return <Redirect href={"/"} />
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          height: 60, // Adjust the height according to your preference
          alignItems: 'center', // Center content vertically within tabs
          paddingBottom: 7, // Add padding at the bottom to create space
          backgroundColor: Colors.light.tint,
        },

        tabBarLabelStyle: {
          textAlign: 'center', // Center the text horizontally
        },
        tabBarItemStyle: {
          flex: 1, // Ensure tab items take up equal space
        },

      }}>
      <Tabs.Screen 
      name='index'
      options={{ href : null, headerShown:false}}
      />
      <Tabs.Screen
        name="category"
        options={{
          title: 'Categroy',
          headerShown:false,
          tabBarIcon: ({ color }) => <TabBarIcon name="th-large" color={color} />,
          tabBarItemStyle: {
           marginTop:5
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
        name="categories"
        options={{
          headerShown:false,
          tabBarIcon: ({ color }) => <TabBarIcon name="th" color={color} />,
        }}
      />
            <Tabs.Screen
        name="my"
        options={{
          title: 'User',
          
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
        }}
      />
    </Tabs>
  );
}
