import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { makeRedirectUri } from 'expo-auth-session';
import { router } from "expo-router";
import axios from 'axios';

WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID = '978113528745-q04lamvvi7pl2nv17627j172uc2fd8fc.apps.googleusercontent.com';

const redirectUri = makeRedirectUri({
  scheme: 'myapp'
});

const API_BASE_URL = Platform.select({
  android: 'http://10.0.2.2:8080',
  ios: 'http://localhost:8080', 
});

export const useGoogleAuth = () => {
  const discovery = AuthSession.useAutoDiscovery('https://accounts.google.com');

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: CLIENT_ID,
      redirectUri,
      scopes: ['openid', 'profile', 'email'],
    },
    discovery
  );

  const handleGoogleSignIn = async () => {
    try {
      const result = await promptAsync();
      
      if (result?.type === "success") {
        const { authentication } = result;
        
        if (authentication?.accessToken) {
          // Get user info from Google
          const userInfoResponse = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${authentication.accessToken}` },
          });
          const userInfo = await userInfoResponse.json();
          console.log("Google user info:", userInfo);

          // Store the token
          await AsyncStorage.setItem('access_token', authentication.accessToken);
          
          // Navigate to home screen
          router.push('/');
          return true;
        }
      }
      return false;
    } catch (error) {
      console.error('Google sign in error:', error);
      Alert.alert('Error', 'Failed to sign in with Google');
      return false;
    }
  };

  return {
    request,
    handleGoogleSignIn
  };
};


// Email Validation Function
const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email validation
  return emailRegex.test(email);
};

// Sign-In User
export const signInUser = async (email: string, password: string) => {
  email = email.trim();

  if (!isValidEmail(email)) {
    Alert.alert('Error', 'Please enter a valid email address.');
    return false;
  }

  try {
    const response = await axios.post(`${API_BASE_URL}/auth/signIn`, {
      email,
      password,
    });

    if (response.status === 200) {
      const { access_token } = response.data;
      await AsyncStorage.setItem('access_token', access_token); // Save token
      return true;
    } else {
      Alert.alert('Error', 'Sign-in failed.');
      return false;
    }
  } catch (error: any) {
    console.error('Sign-in error:', error.response?.data || error.message);

    if (error.response) {
      const message = error.response.data?.message || 'An error occurred during sign-in.';
      Alert.alert('Error', message);
    } else {
      Alert.alert('Error', 'Unable to connect to the server. Please check your network.');
    }
    return false;
  }
};

// Sign-Up User
export const signUpUser = async (email: string, password: string): Promise<boolean> => {
  // Trim spaces from email
  email = email.trim();

  if (!isValidEmail(email)) {
    Alert.alert('Error', 'Please enter a valid email address.');
    return false;
  }

  if (!password || password.length < 6) {
    Alert.alert('Error', 'Password must be at least 6 characters long.');
    return false;
  }

  try {
    console.log('Attempting to sign up user:', email);
    const response = await axios.post(`${API_BASE_URL}/auth/signUp`, {
      email,
      password,
    });

    if (response.status === 200 || response.status === 201) {
      const { access_token } = response.data;
      await AsyncStorage.setItem('access_token', access_token);
      console.log('Signup successful');
      return true;
    }
    return false;
  } catch (error: any) {
    console.error('Sign-up error:', error.response?.data || error.message);
    
    if (error.response) {
      const message = error.response.data?.message || 'An unexpected error occurred.';
      Alert.alert('Error', message);
    } else {
      Alert.alert('Error', 'Unable to connect to the server. Please check your network.');
    }
    return false;
  }
};

// Sign-Out User
export const signOutUser = async (router: any) => {
  try {
    await AsyncStorage.removeItem('access_token'); // Remove token
    router.push('/screens/registration'); // Redirect
  } catch (error) {
    console.error('Sign-out error:', error);
  }
};

export const getAllUsers = async (email : string) => {
  try {
    const response = await axios.get((`${API_BASE_URL}/users`), {
      params: {
        email: email
      }
    });
    console.log('Users retrieved:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('Error getting users:', error.response?.data || error.message);
    
    if (error.response) {
      const message = error.response.data?.message || 'An unexpected error occurred.';
      Alert.alert('Error', message);
    } else {
      Alert.alert('Error', 'Unable to connect to the server. Please check your network.');
    }
    
    return null;
  }
}
