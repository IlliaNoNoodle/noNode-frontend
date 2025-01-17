import { Tabs, Stack } from 'expo-router';
import { Provider } from 'jotai';
import React, { useState, useEffect } from 'react';
import { Platform, useColorScheme, Alert, Linking } from 'react-native';

import ProfileScreen from '../screens/registration';
import PrivacyPolicy from '../screens/privacyPolicy';
import Colors from '@/constants/Colors';
import { IconSymbol } from '@/components';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [hasAcceptedPrivacyPolicy, setHasAcceptedPrivacyPolicy] = useState(false);

  // Check for first-time app launch or privacy policy acceptance
  useEffect(() => {
    // In a real app, you'd use AsyncStorage or similar to persist this
    const checkPrivacyPolicyAcceptance = async () => {
      // Simulating first-time check
      const accepted = false; // Change this based on your app's logic
      setHasAcceptedPrivacyPolicy(accepted);
    };

    checkPrivacyPolicyAcceptance();
  }, []);

  const handlePrivacyPolicyAccept = () => {
    setHasAcceptedPrivacyPolicy(true);
    // Optionally persist acceptance (e.g., AsyncStorage)
  };

  const handlePrivacyPolicyDecline = () => {
    // Show an alert explaining consequences of declining
    Alert.alert(
      'Privacy Policy Declined',
      'To use our app, you must accept the privacy policy. Would you like to review it again?',
      [
        {
          text: 'Review Policy',
          style: 'cancel',
        },
        {
          text: 'Exit App',
          style: 'destructive',
          onPress: () => {
            // This is a platform-specific way to close the app
            Linking.openSettings();
          },
        },
      ]
    );
  };

  if (!hasAcceptedPrivacyPolicy) {
    return (
      <PrivacyPolicy 
        onAccept={handlePrivacyPolicyAccept}
        onDecline={handlePrivacyPolicyDecline}
      />
    );
  }


  
  // If not authenticated, show registration
  if (!isAuthenticated) {
    return <ProfileScreen onSignIn={() => setIsAuthenticated(true)} />;
  }

  return (
    <Provider>
    <Provider>
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {},
        }),
      }}
    >
      {/* Existing tab screens remain the same */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="mic-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="files"
        options={{
          title: 'Files',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="folder-outline" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="settings-outline" color={color} />,
        }}
      />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="registration" options={{ 
          headerShown: false,
          presentation: 'modal' 
        }} />
      </Stack>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="registration" options={{ 
          headerShown: false,
          presentation: 'modal' 
        }} />
      </Stack>
    </Tabs>
    </Provider>
    </Provider>
  );
}