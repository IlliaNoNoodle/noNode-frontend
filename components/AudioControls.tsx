import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { MaterialIcons } from '@expo/vector-icons';
import { Audio } from 'expo-av';

interface AudioControlsProps {
  audioUrl: string;
}

export default function AudioControls({ audioUrl }: AudioControlsProps) {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  useEffect(() => {
    loadAudio();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [audioUrl]); // Reload the audio when the URL changes

  const loadAudio = async () => {
    try {
      if (sound) await sound.unloadAsync();
      const { sound: newSound, status } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );
      setSound(newSound);
      setDuration(status.durationMillis ? status.durationMillis / 1000 : 0);
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis / 1000);
      setDuration(status.durationMillis / 1000);
      setIsPlaying(status.isPlaying);
    }
  };

  const togglePlayback = async () => {
    if (!sound) return;
    if (isPlaying) {
      await sound.pauseAsync();
    } else {
      await sound.playAsync();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleSliderChange = async (value: number) => {
    if (sound) {
      await sound.setPositionAsync(value * 1000);
    }
  };

  const toggleSpeed = async () => {
    if (!sound) return;
    const newSpeed = playbackSpeed === 1 ? 2 : 1;
    await sound.setRateAsync(newSpeed, true);
    setPlaybackSpeed(newSpeed);
  };

  return (
    <View style={styles.container}>
      <View style={styles.audioControls}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={handleSliderChange}
          minimumTrackTintColor="#4F7EE7"
          maximumTrackTintColor="#E5E5E5"
          thumbTintColor="#4F7EE7"
        />
        <View style={styles.audioTimeContainer}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
        <View style={styles.audioButtons}>
          <TouchableOpacity style={styles.controlButton}>
            <MaterialIcons name="skip-previous" size={28} color="#666666" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.controlButton, styles.playButton]}
            onPress={togglePlayback}
          >
            <MaterialIcons
              name={isPlaying ? 'pause' : 'play-arrow'}
              size={36}
              color="#666666"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlButton}>
            <MaterialIcons name="skip-next" size={28} color="#666666" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.speedButton} onPress={toggleSpeed}>
            <Text style={styles.speedButtonText}>{playbackSpeed}x</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#E5E5E5',
  },
  audioControls: {
    padding: 16,
    paddingBottom: 32,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  audioTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -8,
    marginBottom: 8,
  },
  timeText: {
    fontSize: 12,
    color: '#666666',
  },
  audioButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 32,
  },
  controlButton: {
    padding: 8,
  },
  playButton: {
    marginHorizontal: 16,
  },
  speedButton: {
    position: 'absolute',
    right: 0,
    padding: 8,
  },
  speedButtonText: {
    fontSize: 14,
    color: '#4F7EE7',
    fontWeight: '600',
  },
});
