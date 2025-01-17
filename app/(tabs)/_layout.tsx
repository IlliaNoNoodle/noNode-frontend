import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform, useColorScheme } from 'react-native';

import ProfileScreen from '../screens/registration';
import Colors from '@/constants/Colors';
import { IconSymbol } from '@/components';



export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Manage authentication state

  if (!isAuthenticated) {
    return <ProfileScreen onSignIn={() => setIsAuthenticated(true)} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute', // Transparent background for iOS
          },
          default: {},
        }),
      }}
    >
      {/* Home Screen */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="mic-outline" color={color} />,
        }}
      />
      {/* Files Screen */}
      <Tabs.Screen
        name="files"
        options={{
          title: 'Files',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="folder-outline" color={color} />,
        }}
      />
      {/* Settings Screen */}
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="settings-outline" color={color} />,
        }}
      />
    </Tabs>
  );
}