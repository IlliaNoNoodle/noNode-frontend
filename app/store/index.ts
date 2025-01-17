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
        const token = await AsyncStorage.getItem('access_token'); // Отримуємо токен
        if (!token) {
          set(isAuthenticatedAtom, false); // Якщо токена немає, користувач не авторизований
          return;
        }
  
        // Перевіряємо токен на сервері (опціонально)
        const response = await axios.get('http://localhost:8080/auth/verify', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        if (response.status === 200) {
          set(isAuthenticatedAtom, true); // Авторизований
        } else {
          set(isAuthenticatedAtom, false); // Не авторизований
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
        set(isAuthenticatedAtom, false); // Помилка = не авторизований
      }
    }
  );
