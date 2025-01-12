import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Audio } from "expo-av";
import { WaveForm } from "@/components";
import * as FileSystem from "expo-file-system";
import { useAtom } from "jotai";
import { audios } from "../store";

const ScreenWidth = Dimensions.get("window").width;

export default function RecordAudioScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [allAudios, setAllAudios] = useAtom(audios);
  const [duration, setDuration] = useState(0)

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
      setRecording(recording);
      console.log("Запис розпочато");
    } catch (err) {
      console.error("Помилка під час запису:", err);
    }
  }

  async function stopRecording() {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI(); // Отримуємо URI записаного файлу
        alert(uri);
        setRecording(null);
        setIsRecording(false);
        const currentDate = new Date
        setAllAudios([
          ...allAudios, 
          { 
            name: `audio number ${allAudios.length + 1}`,
            date: `${currentDate.getDate()}.${currentDate.getMonth()}.${currentDate.getFullYear()}`,
            id: allAudios.length + 1,
            duration: duration,
            uri: `${uri}`, 
          }
        ])
      } else {
        console.warn("Немає активного запису для зупинки.");
      }
    } catch (err) {
      console.error("Помилка при зупинці запису:", err);
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Record Audio</Text>
      <View style={styles.waveformContainer}>
        <WaveForm isRecording={isRecording} recording={recording} onDurationUpdate={(newDuration) => {setDuration(newDuration)}}/>
      </View>

      <View style={styles.btnRow}>
        {isRecording && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={stopRecording}
          >
            <Ionicons name="checkmark" size={30} color="white" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.recordButton} onPress={toggleRecording}>
          <Ionicons name="mic" size={36} color="white" />
        </TouchableOpacity>
        {isRecording && (
          <TouchableOpacity style={styles.deleteButton} onPress={cancelRecording}>
            <Ionicons name="close" size={30} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    alignItems: "center",
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#2C2C2C",
    marginBottom: 20,
  },
  waveformContainer: {
    width: "90%",
    alignItems: "center",
    marginBottom: 40,
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
  btnRow: {
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
});
