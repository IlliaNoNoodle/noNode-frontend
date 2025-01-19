import React from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useAtom } from 'jotai';
import { audios } from '../../store';

const TranscriptionScreen = () => {
  const { id } = useLocalSearchParams();
  const [allAudios] = useAtom(audios);
  const router = useRouter();

  console.log('ID:', id);
  console.log('All Audios:', allAudios);
  
  const recording = allAudios.find(audio => audio.id === Number(id));
  console.log('Found Recording:', recording);

  if (!recording) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Recording not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
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
              <Text style={styles.timestamp}>{formatTime(utterance.timestamp)}</Text>
            </View>
            <Text style={styles.transcriptionText}>{utterance.text}</Text>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
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
    marginTop: 30,
  },
  header: {
    marginBottom: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 16,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#E4E4E7',
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TranscriptionScreen;
