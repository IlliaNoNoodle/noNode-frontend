import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import TranscriptionResult from '@/components/TranscriptionResult';

export default function AudioDetailsScreen() {
  const { id } = useLocalSearchParams();
  const audio = useSelector((state: RootState) => {
    // Якщо `id` відсутній або не знайдено аудіо з таким `id`, повертаємо перше аудіо
    return state.audio.audios.find(a => a.id === Number(id)) || state.audio.audios[0];
  });

  if (!audio) {
    return (
      <View style={styles.container}>
        <Text>Audio not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>{audio.name}</Text>
        <Text style={styles.date}>{audio.date}</Text>
        <Text style={styles.details}>
          Duration: {audio.duration}s
        </Text>
        <Text style={styles.details}>
          Participants: {audio.amountOfParticipants}
        </Text>
        
        {/* Transcription section */}
        <View style={styles.transcriptionContainer}>
          <Text style={styles.sectionTitle}>Transcription</Text>
          <TranscriptionResult result={audio.transcription} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 50,
    backgroundColor: '#F8F9FA',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
  },
  details: {
    fontSize: 16,
    marginBottom: 8,
  },
  transcriptionContainer: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
});
