import { useAtom } from 'jotai';
import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { audios, filteredAudiosAtom } from '../store';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { LinearGradient } from 'expo-linear-gradient';
import { SortOptions } from '../../components/SortOptions';


interface AudioItem {
  name: string;
  date: string;
  duration: number;
  id: number;
  uri: string;
  amountOfParticipants: number
}

const AnalysisLibraryScreen = () => {
  const [allAudios, setAllAudios] = useAtom<AudioItem[]>(audios);
  const [filteredAudios, setFilteredAudios] = useAtom<AudioItem[]>(filteredAudiosAtom);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isSoundPlaying, setIsPlayingSound] = useState(false);
  const [isEnded, setIsEnded] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    setFilteredAudios(allAudios);
  }, [allAudios, setFilteredAudios]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const deleteAudio = (audio: {id: number}) => {
    const updatedAudios = [...allAudios].filter(item => item.id !== audio.id)
    setAllAudios(updatedAudios)
  }

  const formatTime = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handlePlayPress = async (uri: string, id: number) => {
    try {
      if (isSoundPlaying) {
        await soundRef.current?.pauseAsync();
        setIsPlayingSound(false);
        return;
      }

      if (soundRef.current === null) {

        const { sound } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: true }
        );
        soundRef.current = sound;

        sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
          if (status.isLoaded) {
            setIsPlayingSound(status.isPlaying);
            if (status.didJustFinish) {
              unloadSound();
            }
          } else {
            setIsPlayingSound(false);
          }
        });
      } else {
        await soundRef.current.playAsync();
        setIsPlayingSound(true);
      }
    } catch (error) {
      console.error('Помилка при відтворенні аудіо', error);
    }
  };

  const unloadSound = async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
        setIsPlayingSound(false);
      } catch (error) {
        console.error('Помилка при вивантаженні аудіо', error);
      }
    }
  };


  const renderRecording = ({ item }: { item: AudioItem }) => (
    <LinearGradient
    colors={['#4F6DFF', '#C0CBFF']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.recordingCard}
  >
    <View key={item.id} style={styles.recordingCard}>
      <View style={styles.recordingHeader}>
        <Text style={styles.recordingName}>{item.name}</Text>
        <Icon name="ellipsis-vertical" size={22} color="white" onPress={() => {setActiveIndex(activeIndex === item.id ? null : item.id);}}/>
        {activeIndex === item.id &&
        <View key={item.id} style={styles.dropdown}>
          <TouchableOpacity style={styles.dropdownItem}>
            <Icon name='share-social-outline' size={20}/>
            <Text>Share</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem}>
            <Icon name='pencil-outline' size={20}/>
            <Text>Rename</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.dropdownItem} onPress={() => {deleteAudio(item)}}>
            <Icon name='trash-outline' size={20}/>
            <Text>Delete</Text>
          </TouchableOpacity>
        </View>
        }
      </View>
      <Text style={styles.recordingDetails}>
        {item.date} | {item.amountOfParticipants}
      </Text>
      <View style={styles.waveformContainer}>
        <Text style={styles.recordingDuration}>{formatTime(Math.floor(item.duration))}</Text>
        <TouchableOpacity>
          <Icon onPress={() => handlePlayPress(item.uri, item.id)} name={isSoundPlaying ? "pause-circle" : "play-circle"} size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  </LinearGradient>
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
          <Text style={styles.recordsCount}>{allAudios.length} records</Text>
          <TouchableOpacity onPress={() => setShowSortOptions(!showSortOptions)} style={styles.sortButton}>
            <Icon name="funnel-outline" size={20} color="gray" />
            <Text style={styles.sortText}>Sort by</Text>
          </TouchableOpacity>
        </View>
        {showSortOptions && <SortOptions allAudios={allAudios} setFilteredAudios={setFilteredAudios} filteredAudios={filteredAudios}/>}
      </View>

      {/* Recordings List */}
      <FlatList
        data={filteredAudios}
        keyExtractor={(item) => item.id.toString()}
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
    borderColor: '#DADBE1',
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
    borderColor: '#E4E4E7',
  },
  sortText: {
    fontSize: 14,
    marginLeft: 4,
  },
  recordingsList: {
    paddingBottom: 80,
  },
  recordingCard: {
    borderRadius: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#4F6DFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 8,
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
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
  },
  dropdown: {
    position: "absolute",
    top: 30,
    right: 0,
    backgroundColor: "white",
    paddingVertical: 4,
    borderRadius: 8,
    zIndex: 100,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  }
});

export default AnalysisLibraryScreen;
