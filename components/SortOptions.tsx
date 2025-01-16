import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AudioItem } from '../app/store';

interface SortOptionsProps {
  allAudios: AudioItem[];
  setFilteredAudios: (audios: AudioItem[]) => void;
  filteredAudios: AudioItem[];
  onSort?: () => void;
}

export const SortOptions: React.FC<SortOptionsProps> = ({ 
  allAudios, 
  setFilteredAudios, 
  filteredAudios,
  onSort 
}) => {
  const sortByDate = () => {
    const sorted = [...filteredAudios].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setFilteredAudios(sorted);
    onSort?.();
  };

  const sortByDuration = () => {
    const sorted = [...filteredAudios].sort((a, b) => b.duration - a.duration);
    setFilteredAudios(sorted);
    onSort?.();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={sortByDate} style={styles.option}>
        <Text style={styles.optionText}>Date</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={sortByDuration} style={styles.option}>
        <Text style={styles.optionText}>Duration</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    top: 85,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1000,
  },
  option: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  optionText: {
    fontSize: 14,
  },
}); 