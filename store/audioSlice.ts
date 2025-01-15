import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TranscriptionResult as TranscriptionResultType } from '@/components/TranscriptionResult';

interface AudioItem {
  id: number;
  name: string;
  date: string;
  duration: number;
  uri: string;
  amountOfParticipants: number;
  transcription?: TranscriptionResultType;
}

interface AudioState {
  audios: AudioItem[];
}

const initialState: AudioState = {
  audios: [],
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    addAudio: (state, action: PayloadAction<AudioItem>) => {
      state.audios.push(action.payload);
    },
  },
});

export const { addAudio } = audioSlice.actions;
export default audioSlice.reducer; 