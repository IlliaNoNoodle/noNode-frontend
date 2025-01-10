import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

const ScreenWidth = Dimensions.get('window').width;

export function WaveForm({ isRecording, barCount = 30, updateInterval = 50 }: { isRecording: boolean, barCount?: number, updateInterval?: number }) {
  const [waveformData, setWaveformData] = useState<number[]>(
    Array(barCount).fill(10) // Default height for bars
  );

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setWaveformData((prev) => [
          ...prev.slice(-barCount),
          Math.random() * 100 + 10, // Generate random bar height
        ]);
      }, updateInterval);

      return () => clearInterval(interval);
    } else {
      // Reset waveform when not recording
      setWaveformData(Array(barCount).fill(10));
    }
  }, [isRecording, barCount, updateInterval]);

  return (
    <View style={styles.waveformContainer}>
      {waveformData.map((height, index) => (
        <View
          key={index}
          style={[
            styles.waveBar,
            {
              height: height,
              backgroundColor: isRecording ? '#4C84FF' : '#D3D3D3',
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  waveformContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 100,
    width: ScreenWidth * 0.8,
    backgroundColor: '#E6E6E6',
    borderRadius: 10,
    overflow: 'hidden',
  },
  waveBar: {
    width: 4,
    marginHorizontal: 2,
    borderRadius: 2,
  },
});
