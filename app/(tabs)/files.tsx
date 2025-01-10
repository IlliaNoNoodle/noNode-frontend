import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const recordings = [
  { id: '1', name: 'Lecture_recording', date: '24.01.2025', size: '19.7 kB', duration: '00:05:15' },
  { id: '2', name: 'Lecture_recording', date: '24.01.2025', size: '19.7 kB', duration: '00:05:15' },
  { id: '3', name: 'Lecture_recording', date: '24.01.2025', size: '19.7 kB', duration: '00:05:15' },
];

const AnalysisLibraryScreen = () => {
  const renderRecording = ({ item }: { item: any }) => (
    <View style={styles.recordingCard}>
      <View style={styles.recordingHeader}>
        <Text style={styles.recordingName}>{item.name}</Text>
        <Icon name="ellipsis-vertical" size={20} color="white" />
      </View>
      <Text style={styles.recordingDetails}>
        {item.date} | {item.size}
      </Text>
      <View style={styles.waveformContainer}>
        <Text style={styles.recordingDuration}>{item.duration}</Text>
        <TouchableOpacity>
          <Icon name="play-circle" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analysis Library</Text>
      </View>

      {/* Search and Sort */}
      <View style={styles.searchSortContainer}>
        <View style={styles.searchBar}>
          <Icon name="search-outline" size={20} color="gray" />
          <TextInput
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="gray"
          />
        </View>
        <View style={styles.sortContainer}>
          <Text style={styles.recordsCount}>6 records</Text>
          <TouchableOpacity style={styles.sortButton}>
            <Icon name="funnel-outline" size={20} color="gray" />
            <Text style={styles.sortText}>Sort by</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recordings List */}
      <FlatList
        data={recordings}
        keyExtractor={(item) => item.id}
        renderItem={renderRecording}
        contentContainerStyle={styles.recordingsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    marginTop: 40,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchSortContainer: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 12,
    borderWidth: 1,
    borderColor: "#DADBE1",
    borderRadius: 100,
    marginBottom: 25,
    elevation: 2,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordsCount: {
    fontSize: 14,
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderColor: "#E4E4E7"
  },
  sortText: {
    fontSize: 14,
    marginLeft: 4,
  },
  recordingsList: {
    paddingBottom: 80,
  },
  recordingCard: {
    backgroundColor: '#6ba7ff',
    borderRadius: 24,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  recordingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recordingName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  recordingDetails: {
    fontSize: 14,
    color: 'white',
    marginBottom: 12,
  },
  waveformContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recordingDuration: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AnalysisLibraryScreen;
