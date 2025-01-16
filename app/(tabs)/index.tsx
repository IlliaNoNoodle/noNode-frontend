import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { WaveForm } from "@/components";
import * as FileSystem from "expo-file-system";
import { useAtom } from 'jotai';
import { audios } from '../store';
import TranscriptionResult, { TranscriptionResult as TranscriptionResultType } from '@/components/TranscriptionResult';
import { uploadAudioToAssemblyAI, getTranscriptionResult } from '@/services/assemblyAI';

const ScreenWidth = Dimensions.get("window").width;

interface ExtendedRecording extends Audio.Recording {
  _uri: string;
  transcription?: {
    text: string | null;
    status: string;
    utterances?: Array<{
      speaker: string;
      text: string;
    }>;
  };
}

export default function RecordAudioScreen() {
  const [allAudios, setAllAudios] = useAtom(audios);
  const [recording, setRecording] = useState<ExtendedRecording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [amountOfParticipants, setAmountOfParticapants] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null); // Для зберігання URI незбереженого запису
  const [modalVisible, setModalVisible] = useState(false);
  const [currentRecording, setCurrentRecording] = useState<{
    uri: string;
    duration: number;
    participants: number;
    transcription: string | null;
  } | null>(null);
  
  const [transcription, setTranscription] = useState<TranscriptionResultType | null>(null);
  const [status, setStatus] = useState<string>('Initializing');

  const handleTranscriptionComplete = (result: TranscriptionResultType) => {
    setTranscription(result);
  };

  function toggleRecording() {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }

  async function startRecording() {
    try {
      await Audio.requestPermissionsAsync(); // Запит дозволів
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });
      setIsRecording(true);

      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording as ExtendedRecording);
      console.log("Запис розпочато");
    } catch (err) {
      console.error("Помилка під час запису:", err);
    }
  }

  async function stopRecording() {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        setRecording(null);
        setIsRecording(false);
  
        // Initialize transcription to null before processing
        let transcription: TranscriptionResultType | null = null;
  
        try {
          if (!uri) {
            throw new Error("No recording URI available");
          }
  
          // Upload audio to AssemblyAI and process transcription
          const transcriptionId = await uploadAudioToAssemblyAI(
            uri,
            amountOfParticipants || 2
          );
          setStatus("Processing transcription...");
  
          transcription = await pollTranscriptionResult(transcriptionId); // Poll and retrieve transcription
        } catch (error) {
          console.error("Transcription error:", error);
          setStatus("Transcription failed");
        }
  
        // Save audio to the atom (state)
        const currentDate = new Date();
        handleAddAudio({
          name: `audio number ${allAudios.length + 1}`,
          date: `${currentDate.getDate()}.${currentDate.getMonth() + 1}.${currentDate.getFullYear()}`,
          id: allAudios.length + 1,
          duration: duration,
          uri: `${uri}`,
          amountOfParticipants: amountOfParticipants,
          transcription: transcription || undefined, // Add transcription here
        });
      }
    } catch (err) {
      console.error("Error stopping recording:", err);
    }
  }
  

  async function cancelRecording() {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri: any = recording.getURI();
        await FileSystem.deleteAsync(uri)
        setRecording(null)
        setIsRecording(false)
      }
    } catch(error) {
      console.error(error)
    }
  }

  const handleAddAudio = (newAudio: {
    name: string;
    date: string;
    id: number;
    duration: number;
    uri: string;
    amountOfParticipants: number;
    transcription?: TranscriptionResultType;
  }) => {
    setAllAudios([
      ...allAudios,
      {
        ...newAudio,
      },
    ]);
  };

const pollTranscriptionResult = async (transcriptionId: string): Promise<TranscriptionResultType | null> => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        const result = await getTranscriptionResult(transcriptionId);

        if (result.status === "completed") {
          clearInterval(interval);
          resolve({
            text: result.text,
            status: result.status,
            utterances: result.utterances || [],
          });
        } else if (result.status === "error") {
          clearInterval(interval);
          reject(new Error(result.error || "Transcription failed"));
        }
      } catch (error) {
        clearInterval(interval);
        reject(error);
      }
    }, 5000); // Poll every 5 seconds
  });
};

  const playRecording = async () => {
    try {
      if (isPlaying) {
        await soundRef.current?.pauseAsync();
        setIsPlaying(false);
        return;
      }
  
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }
  
      if (!recording?._uri) {
        throw new Error('No recording URI available');
      }
  
      const { sound } = await Audio.Sound.createAsync({ uri: recording._uri });
      soundRef.current = sound;
      setIsPlaying(true);
  
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          setIsPlaying(false);
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error('Playback Error:', error);
      Alert.alert('Playback Error', 'Failed to play recording.');
    }
  };

  const saveRecording = () => {
    if (!recording || !recording._uri) return;
    
    try {
      setModalVisible(true);
      setCurrentRecording({
        uri: recording._uri,
        duration: duration,
        participants: amountOfParticipants,
        transcription: transcription?.text || null
      });
    } catch (error) {
      console.error('Save Error:', error);
      Alert.alert('Save Error', 'Failed to save recording.');
    }
  };

  const cancelSave = () => {
    setRecording(null);
    setModalVisible(false);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Record Audio</Text>
      <View style={styles.waveformContainer}>
        <WaveForm 
          isRecording={isRecording} 
          recording={recording} 
          onDurationUpdate={(newDuration) => {setDuration(newDuration)}}
        />
      </View>

      {/* Show transcription result if available */}
      {transcription && (
        <ScrollView style={styles.transcriptionContainer}>
          <TranscriptionResult result={transcription} />
        </ScrollView>
      )}

      <View style={styles.amountContainer}>
        <Text style={styles.amountContainerTitle}>Number of participants</Text>
        <View style={styles.numberOfParticipants}>
        <TouchableOpacity disabled={amountOfParticipants === 0} onPress={() => setAmountOfParticapants(amountOfParticipants - 1)} style={styles.setParticipantsButton}>
          <Text style={styles.participantsButtonText}>-</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.participantsButtonText}>{amountOfParticipants}</Text>
        </View>
        <TouchableOpacity disabled={amountOfParticipants === 10} onPress={() => setAmountOfParticapants(amountOfParticipants + 1)} style={styles.setParticipantsButton}>
          <Text style={styles.participantsButtonText}>+</Text>
        </TouchableOpacity>
        </View>
      </View>

      { !recording ? (
        <>
            <View style={styles.btnRow}>
              <TouchableOpacity
                style={styles.recordButton}
                onPress={async () => {
                  if (isRecording) {
                    stopRecording();
                  } else if (recording) {
                    await playRecording(); 
                  } else {
                    startRecording()
                  }
                }}
              >
                <Ionicons
                  name={isRecording ? 'stop' : recording ? 'play' : 'mic'} // Залежно від стану
                  size={36}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
                </>
              ) : (
                
            <View style={styles.btnRow}>

            <TouchableOpacity
              style={styles.saveButton}
              onPress={saveRecording}
            >
              <Ionicons name="checkmark" size={30} color="white" />
            </TouchableOpacity>
       
            <TouchableOpacity
              style={styles.recordButton}
              onPress={() => {
                if (isRecording) {
                  stopRecording();
                } else {
                  startRecording();
                }
              }}
            >
              <Ionicons
                name={'pause'}
                size={36}
                color="#fff"
              />
            </TouchableOpacity>
      

              <TouchableOpacity style={styles.deleteButton} onPress={cancelRecording}>
                <Ionicons name="close" size={30} color="white" />
              </TouchableOpacity>
          </View>
              )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    alignItems: "center",
    paddingTop: 80,
    width: "100%",
    paddingHorizontal: 30, 
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2C2C2C",
    marginBottom: 30,
    width: "100%",
  },
  waveformContainer: {
    width: "100%",
    alignItems: "center",
  },
  waveform: {
    width: ScreenWidth * 0.8,
    height: 100,
    backgroundColor: "#D3D3D3",
    borderRadius: 10,
    marginVertical: 10,
  },
  timestamp: {
    fontSize: 14,
    color: "#6C6C6C",
  },
  amountContainer: {
    marginTop: 50
  },
  amountContainerTitle: {
    textAlign: "center",
    marginBottom: 12
  },
  numberOfParticipants: {
    flexDirection: "row",
    padding: 16,
    gap: 16,
    borderWidth: 1,
    borderColor: "#D2DAFF",
    borderRadius: 100,
  },
  setParticipantsButton: {
    paddingHorizontal: 16,
  },
  participantsButtonText: {
    fontSize: 20
  },

  btnRow: {
    marginTop: 50,
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
  },
  recordButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#4C84FF",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4C84FF",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 0 },
  },
  saveButton: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#17A6324F",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButton: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: "#E946464F",
    justifyContent: "center",
    alignItems: "center",
  },
  transcriptionContainer: {
    maxHeight: 100,
    width: '100%',
    marginVertical: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
