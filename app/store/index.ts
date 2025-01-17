import axios from "axios";
import { atom } from "jotai";

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
  (get) => get(isAuthenticatedAtom),
  async (_get, set) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        set(isAuthenticatedAtom, false);
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/users/${userId}/id`,
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        set(isAuthenticatedAtom, true);
      } else {
        set(isAuthenticatedAtom, false);
      }
    } catch (error) {
      console.error("Error checking authentication:", error);
      set(isAuthenticatedAtom, false);
    }
  }
);
