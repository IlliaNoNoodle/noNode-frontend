import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { Audio } from 'expo-av';

const ScreenWidth = Dimensions.get('window').width;

interface WaveformProps {
  isRecording: boolean;
  recording: Audio.Recording | null;
  barCount?: number;
  updateInterval?: number;
  onDurationUpdate: (duration: number) => void;
}

export const WaveForm: React.FC<WaveformProps> = ({
  isRecording,
  recording,
  barCount = 35,
  updateInterval = 100,
  onDurationUpdate,
}) => {
  const [waveformData, setWaveformData] = useState<number[]>(Array(barCount).fill(10));
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    const updateWaveform = async () => {
      if (recording && isRecording) {
        const status = await recording.getStatusAsync();
        if (status.metering) {
          const amplitude = Math.max(0, Math.abs(status.metering));
          setWaveformData((prev) => [
            ...prev.slice(-barCount),
            Math.min(amplitude * 2, 50),
          ]);
        } else {
          setWaveformData((prev) => [...prev.slice(-barCount), 10]);
        }
      }
    };

    if (isRecording) {
      interval = setInterval(() => {
        updateWaveform();
        setDuration((prev) => prev + updateInterval / 1000);
      }, updateInterval);
    } else {
      setWaveformData(Array(barCount).fill(10)); // Скидаємо хвилі
      setDuration(0); // Скидаємо тривалість
    }

    return () => clearInterval(interval);
  }, [isRecording, recording, barCount, updateInterval]);

  useEffect(() => {
    // Передаємо тривалість у батьківську компоненту
    onDurationUpdate(duration);
  }, [duration, onDurationUpdate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timestamp}>{formatTime(duration)}</Text>
      </View>
      <View style={styles.waveformContainer}>
        {waveformData.map((height, index) => (
          <View key={index} style={styles.waveBarWrapper}>
            <View
              style={[
                styles.waveBar,
                {
                  height: height,
                  backgroundColor: isRecording ? '#4C84FF' : '#D3D3D3',
                },
              ]}
            />
            <View
              style={[
                styles.waveBar,
                {
                  height: height,
                  backgroundColor: isRecording ? '#4C84FF' : '#D3D3D3',
                },
              ]}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
  },
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    width: ScreenWidth * 0.8,
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
    overflow: 'hidden',
  },
  waveBarWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  waveBar: {
    width: 4,
    marginHorizontal: 2,
    borderRadius: 2,
  },
  timestamp: {
    fontSize: 14,
    color: '#6C6C6C',
  },
});
