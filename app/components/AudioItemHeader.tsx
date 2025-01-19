import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AudioItem } from '@/store';

interface AudioItemHeaderProps {
  item: AudioItem;
}

export const AudioItemHeader = ({ item }: AudioItemHeaderProps) => {
  return (
    <Text style={styles.headerText}>
      {item.date} | {item.size} kB | {item.formattedDuration} | {item.riskScore} ({item.riskScore > 50 ? 'High' : 'Low'} Risk)
    </Text>
  );
};

const styles = StyleSheet.create({
  headerText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
}); 