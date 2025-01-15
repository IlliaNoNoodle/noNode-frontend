import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Audio {
  name: string;
  date: string;
  id: number;
  duration: number;
  uri: string;
  amountOfParticipants: number;
}

interface AudioState {
  audios: Audio[];
}

const initialState: AudioState = {
  audios: []
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    addAudio: (state, action: PayloadAction<Audio>) => {
      state.audios.push(action.payload);
    },
    deleteAudio: (state, action: PayloadAction<number>) => {
      state.audios = state.audios.filter(audio => audio.id !== action.payload);
    }
  }
});

export const { addAudio, deleteAudio } = audioSlice.actions;
export default audioSlice.reducer; 