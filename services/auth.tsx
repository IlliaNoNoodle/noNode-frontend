import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

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
    const response = await axios.post('http://localhost:8080/auth/signIn', {
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
export const signUpUser = async (email: string, password: string) => {
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
    const response = await axios.post('http://localhost:8080/auth/signUp', {
      email,
      password,
    });

    console.log('Response:', response.data);

    Alert.alert('Success', 'Sign-up successful. Please sign in.');
    return true;
  } catch (error: any) {
    console.error('Sign-up error:', error.response?.data || error.message);

    // Handle backend errors
    if (error.response) {
      const message = error.response.data?.message || 'An unexpected error occurred.';
      Alert.alert('Error', message); // Display the error message
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
