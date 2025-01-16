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

// Initialize with proper types
export const audios = atom<AudioItem[]>([]);
export const filteredAudiosAtom = atom<AudioItem[]>([]);