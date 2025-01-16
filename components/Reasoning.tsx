import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Reasoning() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Reasoning</Text>
      <Text style={styles.sectionText}>
        There is a strong indication of harassment based on language used, which could support a potential constructive dismissal claim.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: '#333333',
  },
});
