import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { atom } from 'jotai';

export interface AudioItem {
  name: string;
  date: string;
  duration: number;
  id: number;
  uri: string;
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
      const token = await AsyncStorage.getItem('access_token'); // Get token
      if (token) {
        set(isAuthenticatedAtom, true); // Token exists - authenticated
      } else {
        set(isAuthenticatedAtom, false); // No token - not authenticated
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      set(isAuthenticatedAtom, false); // Error = not authenticated
    }
  }
);