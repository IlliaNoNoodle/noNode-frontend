import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function QuickAction() {
  return (
    <TouchableOpacity style={styles.quickAction}>
      <Text style={styles.quickActionTitle}>Quick Action</Text>
      <Text style={styles.quickActionSubtitle}>Save This Call as Evidence</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  quickAction: {
    padding: 16,
    backgroundColor: '#E1E9FF',
    borderRadius: 8,
    marginBottom: 16,
  },
  quickActionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  quickActionSubtitle: {
    fontSize: 14,
    marginTop: 4,
  },
});
