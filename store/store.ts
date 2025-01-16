import { atom } from 'jotai';

export interface AudioItem {
  id: number;
  name: string;
  date: string;
  duration: number;
  uri: string;
  amountOfParticipants: number;
}

export const filteredAudiosAtom = atom<AudioItem[]>([]); 