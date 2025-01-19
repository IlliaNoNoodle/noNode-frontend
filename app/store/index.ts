import AsyncStorage from '@react-native-async-storage/async-storage';
import { atom } from 'jotai';

export interface AudioItem {
  name: string;
  date: string;
  duration: number;  // Duration in seconds
  formattedDuration: string;  // Duration in mm:ss format
  id: number;
  uri: string;
  size: number;
  riskScore: number;
  amountOfParticipants: number;
  transcription?: {
    text: string | null;
    status: string;
    utterances?: Array<{
      speaker: string;
      text: string;
      timestamp: string;
    }>;
  };
}


export const audios = atom<AudioItem[]>([]);
export const filteredAudiosAtom = atom<AudioItem[]>([]);


export const isAuthenticatedAtom = atom(false);

export const checkAuthAtom = atom(
  null,
  async (_get, set) => {
    try {
      const token = await AsyncStorage.getItem('access_token'); 
      console.log(token, "token");
      const isAuthenticated = !!token;
      set(isAuthenticatedAtom, isAuthenticated); // Update the atom state
      return isAuthenticated; // Return the value to be used in the caller
    } catch (error) {
      console.error('Error checking authentication:', error);
      set(isAuthenticatedAtom, false); // Default to false on error
      return false;
    }
  }
);

export const privacyPolicyAcceptedAtom = atom<boolean>(false);
export const termsConditionsAcceptedAtom = atom<boolean>(false);

// Add new atoms for form data
export const signUpFormDataAtom = atom({
  email: '',
  password: ''
});

export const setSignUpFormDataAtom = atom(
  null,
  (get, set, formData: { email: string; password: string }) => {
    set(signUpFormDataAtom, formData);
  }
);