import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAtom } from 'jotai';
import { audios } from '../../store';

const TranscriptionScreen = () => {
  const { id } = useLocalSearchParams();
  const [allAudios] = useAtom(audios);

  const recording = allAudios.find(audio => audio.id === Number(id));

  if (!recording) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Recording not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transcription</Text>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#888"
        />
      </View>

      <ScrollView style={styles.scrollContainer}>
        {recording.transcription?.utterances?.map((utterance, index) => (
          <View key={index} style={styles.utteranceContainer}>
            <View style={styles.utteranceHeader}>
              <Text style={styles.speaker}>Speaker {utterance.speaker || 'Unknown'}</Text>
              <Text style={styles.timestamp}>{formatTime(utterance.start)}</Text>
            </View>
            <Text style={styles.transcriptionText}>{utterance.text}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

// Utility function to format time
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    marginBottom: 16,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    borderColor: '#E4E4E7',
    borderWidth: 1,
    fontSize: 14,
    color: '#333',
  },
  scrollContainer: {
    flex: 1,
  },
  utteranceContainer: {
    backgroundColor: '#F5F7FF',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#DCE3FF',
  },
  utteranceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  speaker: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  transcriptionText: {
    fontSize: 14,
    color: '#555',
  },
  errorText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: 'bold',
  },
});

export default TranscriptionScreen;
