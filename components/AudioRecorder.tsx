import React, { useState } from 'react';
import { View, Button, Text } from 'react-native';
import { Audio } from 'expo-av';
import { getTranscriptionResult, uploadAudioToAssemblyAI } from '@/services/assemblyAI';

interface AudioRecorderProps {
  onTranscriptionComplete: (result: TranscriptionResult) => void;
}

interface TranscriptionResult {
  text: string;
  speakers: Array<{
    speaker: string;
    text: string;
  }>;
  status: string;
}

export default function AudioRecorder({ onTranscriptionComplete }: AudioRecorderProps) {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [status, setStatus] = useState<string>('Idle');

  const startRecording = async () => {
    try {
      setStatus('Requesting permissions...');
      const { granted } = await Audio.requestPermissionsAsync();
      if (!granted) return alert('Microphone permission is required.');

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const { recording: newRecording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(newRecording);
      setStatus('Recording...');
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (!recording) return;
      
      setStatus('Stopping recording...');
      await recording.stopAndUnloadAsync();
      const audioUri = recording.getURI();
      if (!audioUri) throw new Error('No audio URI available');
      console.log(audioUri);
      setRecording(null);
      setStatus('Uploading audio...');

      
      const transcriptionId = await uploadAudioToAssemblyAI(audioUri);
      console.log(audioUri)
      setStatus('Processing transcription...');
      pollTranscriptionResult(transcriptionId);
      console.log(transcriptionId)
    } catch (error) {
      console.error('Error stopping recording:', error);
    }
  };

  const pollTranscriptionResult = async (transcriptionId: string) => {
    const interval = setInterval(async () => {
      const result = await getTranscriptionResult(transcriptionId);
      if (result) {
        if (result.status === 'completed') {
          clearInterval(interval);
          onTranscriptionComplete({
            text: result.text,
            status: result.status,
            words: result.words
          });
          setStatus('Transcription complete');
        } else if (result.status === 'error') {
          clearInterval(interval);
          setStatus('Transcription failed');
          onTranscriptionComplete({
            text: null,
            status: 'error',
            error: result.error
          });
        }
      }
    }, 5000);
  };

  return (
    <View>
      <Button 
        title={recording ? 'Stop Recording' : 'Start Recording'} 
        onPress={recording ? stopRecording : startRecording} 
      />
      <Text>Status: {status}</Text>
    </View>
  );
}
