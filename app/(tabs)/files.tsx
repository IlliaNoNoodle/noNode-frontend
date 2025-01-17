import { useAtom } from "jotai";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { WaveFormBar } from "../../components/WaveFormBar";
import { AudioItem, audios, filteredAudiosAtom } from "../store";
import { Audio, AVPlaybackStatus } from "expo-av";
import { LinearGradient } from "expo-linear-gradient";
import { SortOptions } from "../../components/SortOptions";
import { router } from "expo-router";
import * as Sharing from "expo-sharing";

const AnalysisLibraryScreen = () => {
  const [allAudios, setAllAudios] = useAtom(audios);
  const [filteredAudios, setFilteredAudios] = useAtom(filteredAudiosAtom);
  const [isRenameModalVisible, setIsRenameModalVisible] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState<AudioItem | null>(null);
  const [newAudioName, setNewAudioName] = useState("");
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isSoundPlaying, setIsPlayingSound] = useState(false);
  const [isEnded, setIsEnded] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [showSortOptions, setShowSortOptions] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [shareableAudio, setShareableAudio] = useState<AudioItem | null>(null);

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

  const deleteAudio = (audio: { id: number }) => {
    const updatedAudios = [...allAudios].filter((item) => item.id !== audio.id);
    setAllAudios(updatedAudios);
  };

  const shareAudio = async (audio: AudioItem) => {
    try {
      // Check if sharing is available
      const isAvailable = await Sharing.isAvailableAsync();

      if (isAvailable) {
        // Share the audio file
        await Sharing.shareAsync(audio.uri, {
          mimeType: "audio/mp4", // Adjust mime type as needed
          dialogTitle: `Share ${audio.name}`,
        });
      } else {
        Alert.alert("Sharing is not available on this device");
      }
    } catch (error) {
      console.error("Error sharing audio:", error);
      Alert.alert("Failed to share audio");
    }
  };

  const openRenameModal = (audio: AudioItem) => {
    setSelectedAudio(audio);
    setNewAudioName(audio.name);
    setIsRenameModalVisible(true);
  };

  const renameAudio = () => {
    if (!selectedAudio || !newAudioName.trim()) return;

    const updatedAudios = allAudios.map((audio) =>
      audio.id === selectedAudio.id
        ? { ...audio, name: newAudioName.trim() }
        : audio
    );

    setAllAudios(updatedAudios);
    setIsRenameModalVisible(false);
    setSelectedAudio(null);
  };

  const formatTime = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handlePlayPress = async (uri: string, id: number) => {
    try {
      if (playingId === id && isSoundPlaying) {
        await soundRef.current?.pauseAsync();
        setIsPlayingSound(false);
        return;
      }

      if (soundRef.current && playingId !== id) {
        await unloadSound();
      }

      if (soundRef.current === null) {
        const { sound } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay: true }
        );
        soundRef.current = sound;
        setPlayingId(id);

        sound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
          if (status.isLoaded) {
            setIsPlayingSound(status.isPlaying);
            if (status.didJustFinish) {
              unloadSound();
              setPlayingId(null);
            }
          } else {
            setIsPlayingSound(false);
          }
        });
      } else {
        await soundRef.current.playAsync();
        setIsPlayingSound(true);
        setPlayingId(id);
      }
    } catch (error) {
      console.error("Error playing audio", error);
    }
  };

  const unloadSound = async () => {
    if (soundRef.current) {
      try {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
        setIsPlayingSound(false);
      } catch (error) {
        console.error("Помилка при вивантаженні аудіо", error);
      }
    }
  };

  const renderRecording = ({ item }: { item: AudioItem }) => (
    <TouchableOpacity onPress={() => router.push(`/screens/audio/${item.id}`)}>
      <LinearGradient
        colors={["#4F6DFF", "#C0CBFF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.recordingCard}
      >
        <View key={item.id} style={styles.recordingCard}>
          <View style={styles.recordingHeader}>
            <Text style={styles.recordingName}>{item.name}</Text>
            <Icon
              name="ellipsis-vertical"
              size={22}
              color="white"
              onPress={() => {
                setActiveIndex(activeIndex === item.id ? null : item.id);
              }}
            />
            {activeIndex === item.id && (
              <View style={styles.dropdown}>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    shareAudio(item);
                    setActiveIndex(null);
                  }}
                >
                  <Icon name="share-social-outline" size={20} />
                  <Text>Share</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => {
                    openRenameModal(item); // Call openRenameModal with the current item
                    setActiveIndex(null); // Close the dropdown
                  }}
                >
                  <Icon name="pencil-outline" size={20} />
                  <Text>Rename</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.dropdownItem}
                  onPress={() => deleteAudio(item)}
                >
                  <Icon name="trash-outline" size={20} />
                  <Text>Delete</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <Text style={styles.recordingDetails}>
            {item.date} | {item.amountOfParticipants}
          </Text>
          <View style={styles.waveformContainer}>
            <WaveFormBar isPlaying={isSoundPlaying} />
            <Text style={styles.recordingDuration}>
              {formatTime(Math.floor(item.duration))}
            </Text>
            <TouchableOpacity style={styles.playButton}>
              <LinearGradient
                colors={["#4F6DFF", "#BACBFF"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.playButtonGradient}
              >
                <Icon
                  onPress={() => handlePlayPress(item.uri, item.id)}
                  name={isSoundPlaying ? "pause" : "play"}
                  size={30}
                  color="white"
                />
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
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
          <TouchableOpacity
            onPress={() => setShowSortOptions(!showSortOptions)}
            style={styles.sortButton}
          >
            <Icon name="funnel-outline" size={20} color="gray" />
            <Text style={styles.sortText}>Sort by</Text>
          </TouchableOpacity>
        </View>
        {showSortOptions && (
          <SortOptions
            allAudios={allAudios}
            setFilteredAudios={setFilteredAudios}
            filteredAudios={filteredAudios}
          />
        )}
      </View>

      {/* Rename Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isRenameModalVisible}
        onRequestClose={() => setIsRenameModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rename Audio</Text>
            <TextInput
              style={styles.modalInput}
              value={newAudioName}
              onChangeText={setNewAudioName}
              placeholder="Enter new name"
            />
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setIsRenameModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalConfirmButton}
                onPress={renameAudio}
              >
                <Text style={styles.modalButtonText}>Rename</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

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
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    marginTop: 40,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchSortContainer: {
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  recordsCount: {
    fontSize: 14,
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderColor: "#E4E4E7",
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
    shadowColor: "#4F6DFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 8,
  },
  recordingHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  recordingName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },

  recordingDetails: {
    fontSize: 14,
    color: "white",
    marginBottom: 12,
  },
  waveformContainer: {
    position: "relative",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    width: "100%",
  },
  recordingDuration: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    flex: 1,
    position: "absolute",
    bottom: "20%",
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
  },
  playButton: {
    alignSelf: "flex-end",
    borderRadius: 30,
    overflow: "hidden",
    marginLeft: 10,
  },
  playButtonGradient: {
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalInput: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#E4E4E7",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
  },
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalCancelButton: {
    flex: 1,
    padding: 10,
    marginRight: 10,
    backgroundColor: "#F4F4F5",
    borderRadius: 10,
    alignItems: "center",
  },
  modalConfirmButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#4F6DFF",
    borderRadius: 10,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
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
