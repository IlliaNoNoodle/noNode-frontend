import React, { useState, useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';

export const RecordButton: React.FC = () => {
  const [isRecording, setIsRecording] = useState(false);
  const recordingRef = useRef<Audio.Recording | null>(null);

  const recordingOptions = {
    android: {
      extension: '.m4a',
      outputFormat: 2, // MediaRecorder.OutputFormat.MPEG_4
      audioEncoder: 3, // MediaRecorder.AudioEncoder.AAC
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
    },
    ios: {
      extension: '.m4a',
      audioQuality: 127, // Максимальна якість
      sampleRate: 44100,
      numberOfChannels: 2,
      bitRate: 128000,
      linearPCMBitDepth: 16,
      linearPCMIsBigEndian: false,
      linearPCMIsFloat: false,
    },
    web: {
      mimeType: 'audio/webm',
      bitsPerSecond: 128000,
    },
  };

  const handlePress = async () => {
    if (isRecording) {
      // Пауза запису
      try {
        await recordingRef.current?.pauseAsync();
        setIsRecording(false);
      } catch (error) {
        console.error('Не вдалося призупинити запис', error);
        Alert.alert('Помилка', 'Не вдалося призупинити запис.');
      }
    } else {
      if (recordingRef.current) {
        // Відновлення запису
        try {
          await recordingRef.current.startAsync();
          setIsRecording(true);
        } catch (error) {
          console.error('Не вдалося відновити запис', error);
          Alert.alert('Помилка', 'Не вдалося відновити запис.');
        }
      } else {
        // Початок нового запису
        try {
          const { granted } = await Audio.requestPermissionsAsync();
          if (!granted) {
            Alert.alert('Доступ заборонено', 'Потрібен доступ до мікрофона для запису аудіо.');
            return;
          }

          await Audio.setAudioModeAsync({
            allowsRecordingIOS: true,
            playsInSilentModeIOS: true,
          });

          const newRecording = new Audio.Recording();
          await newRecording.prepareToRecordAsync(recordingOptions);
          recordingRef.current = newRecording;
          await recordingRef.current.startAsync();
          setIsRecording(true);
        } catch (error) {
          console.error('Не вдалося розпочати запис', error);
          Alert.alert('Помилка', 'Не вдалося розпочати запис.');
        }
      }
    }
  };

  return (
    <TouchableOpacity
      style={[styles.button, isRecording ? styles.recordingButton : styles.idleButton]}
      onPress={handlePress}
    >
      <Text style={styles.buttonText}>
        {isRecording ? 'Пауза' : 'Запис'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    margin: 10,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  recordingButton: {
    backgroundColor: 'red',
  },
  idleButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});