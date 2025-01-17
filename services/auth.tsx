import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';

export const signInUser = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/signIn', {
        email,
        password,
      });
  
      if (response.status === 200) {
        const { access_token } = response.data; // Retrieve the access token
        await AsyncStorage.setItem('access_token', access_token); // Save the token
        return true; // Successful sign-in
      } else if (response.status === 401) {
        // User exists but password is incorrect
        Alert.alert('Error', 'Incorrect password. Please try again.');
        return false;
      } else if (response.status === 404) {
        // User does not exist
        Alert.alert('Error', 'User not found. Please check your email or sign up.');
        return false;
      } else {
        Alert.alert('Error', 'Sign-in failed. Please try again.');
        return false;
      }
    } catch (error: any) {
      if (error.response) {
        const { status } = error.response;
  
        if (status === 401) {
          Alert.alert('Error', 'Incorrect password. Please try again.');
        } else if (status === 404) {
          Alert.alert('Error', 'User not found. Please check your email or sign up.');
        } else {
          Alert.alert('Error', 'An unexpected error occurred. Please try again.');
        }
      } else {
        console.error('Error during sign-in:', error);
        Alert.alert('Error', 'Unable to connect to the server. Please check your network.');
      }
      return false;
    }
  };

  export const signUpUser = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://localhost:8080/auth/signUp', {
        email,
        password,
      });
  
      console.log('Response:', response.data); // Log the full response
  
      if (response.status === 200) {
        const { access_token } = response.data;
        console.log('Access Token:', access_token); // Log the token if it exists
        await AsyncStorage.setItem('access_token', access_token);
        Alert.alert('Please sign in');
        return true;
      } else {
        Alert.alert('Error', 'Unexpected response from server.');
      }
    } catch (error: any) {
      console.error('Error during sign-up:', error.response?.data || error.message);
  
      if (error.response) {
        Alert.alert('Error', error.response.data?.message || 'Sign-up failed.');
      } else {
        Alert.alert('Error', 'Unable to connect to the server. Please check your network.');
      }
      return false;
    }
  };
  
  export const signOutUser = async (router: any) => {
    try {
      await AsyncStorage.removeItem('access_token'); // Видаляємо токен
      router.push('/screens/registration'); // Переадресація на екран входу
    } catch (error) {
      console.error('Error during sign-out:', error);
    }
  };