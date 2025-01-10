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

const ScreenWidth = Dimensions.get("window").width;

export default function RecordAudioScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);

  async function startRecording() {
    try {
      // Перевірка на активний запис
      if (recording) {
        alert("Запис вже активний. Спочатку зупиніть його.");
        return;
      }
      await Audio.requestPermissionsAsync(); // Запит дозволів
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

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
      alert("Зупиняємо запис...");
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI(); // Отримуємо URI записаного файлу
        console.log("Запис збережено за адресою:", uri);
        setRecording(null);
      } else {
        console.warn("Немає активного запису для зупинки.");
      }
    } catch (err) {
      console.error("Помилка при зупинці запису:", err);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Record Audio</Text>

      <View style={styles.waveformContainer}>
        <Text style={styles.timestamp}>00:02</Text>
        <WaveForm isRecording={recording} />
        <Text style={styles.timestamp}>00:04</Text>
      </View>

      <View style={styles.btnRow}>
        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => console.log("Play pressed")}
        >
          <Ionicons name="play-circle" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
          <Ionicons name="mic" size={36} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={stopRecording}>
          <Ionicons name="stop" size={30} color="white" />
        </TouchableOpacity>
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
  toggleButton: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: "#4C84FF",
    justifyContent: "center",
    alignItems: "center",
  },
});
