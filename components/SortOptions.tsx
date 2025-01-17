import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

interface AudioItem {
  name: string;
  date: string;
  duration: number;
  id: number;
  uri: string;
  amountOfParticipants: number
}

interface SortOptionsProps {
  allAudios: AudioItem[];
  setFilteredAudios: React.Dispatch<React.SetStateAction<AudioItem[]>>;
}

const sortOptions = [
  { id: '1', label: 'All' },
  { id: '2', label: 'Date' },
  { id: '3', label: 'Size' },
  { id: '4', label: 'Toxic Truth Rating' },
];

export const SortOptions: React.FC<SortOptionsProps> = ({ allAudios, setFilteredAudios }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedId === '1') {
      setFilteredAudios(allAudios.filter(audio => audio));
    } else if (selectedId === '2') {
<<<<<<< HEAD
      setFilteredAudios(allAudios.filter(audio => audio));
=======
      const sortedByDate = [...allAudios].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setFilteredAudios(sortedByDate);
>>>>>>> dev
    } else if (selectedId === '3') {
      setFilteredAudios(allAudios.filter(audio => audio.amountOfParticipants > 2));
    } else if (selectedId === '4') {
      [...allAudios]
      setFilteredAudios(allAudios.sort((a, b) => b.amountOfParticipants - a.amountOfParticipants));
    }
  }, [selectedId, allAudios, setFilteredAudios]);

  const handleSortOptionPress = (id: string) => {
    setSelectedId(id)
  };

  const renderItem = ({ item }: { item: { id: string; label: string } }) => {
    const isSelected = selectedId === item.id;
    return (
      <TouchableOpacity
      style={[styles.option, isSelected && styles.selectedOption]}
      onPress={() => handleSortOptionPress(item.id)}
    >
      <View style={styles.iconContainer}>
        {isSelected && (
          <Image
            source={require('../assets/images/checkmark.png')}
            style={styles.icon}
          />
        )}
      </View>
      <Text style={styles.optionText}>{item.label}</Text>
    </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={sortOptions}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
/>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
<<<<<<< HEAD
    display: 'flex',
    alignSelf: 'flex-end', 
    width: 204,
    padding: 16,
=======
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    top: '100%',
    zIndex: 2,
    borderRadius: 8,
    display: 'flex',
    alignSelf: 'flex-end', 
    width: 204,
    paddingVertical: 16,
>>>>>>> dev
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
  },
  optionText: {
    fontSize: 16,
    flex: 1,
  },
  selectedOption: {
    backgroundColor: '#E5EEFF',
  },
  icon: {
    width: 16, // Adjust size as needed
    height: 16,
    marginLeft: 10,
  },
  iconContainer: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
<<<<<<< HEAD
});
=======
});
>>>>>>> dev
