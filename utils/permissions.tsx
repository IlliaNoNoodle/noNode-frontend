import { Audio } from 'expo-av';

export const requestAudioPermissions = async () => {
  const { granted } = await Audio.requestPermissionsAsync();
  if (!granted) {
    alert('Permission to access microphone is required.');
  }
  return granted;
};
