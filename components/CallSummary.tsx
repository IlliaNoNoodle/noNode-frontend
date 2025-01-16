import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CallSummary() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Call Summary</Text>
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Discussion Objective</Text>
        <Text style={styles.summaryText}>
          The call was intended to address recent performance concerns for the marketing team. However, tensions escalated midway when conflicting feedback was delivered, leading to raised voices and personal accusations.
        </Text>
        <Text style={styles.summarySubTitle}>Key Points</Text>
        <Text style={styles.keyPoint}>🔑 Manager cited missed deadlines and communication lapses.</Text>
        <Text style={styles.keyPoint}>🔑 Employee felt unsupported and singled out.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
  },
  summaryCard: {
    padding: 16,
    backgroundColor: '#E1E9FF',
    borderRadius: 8,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  summaryText: {
    fontSize: 14,
    marginBottom: 16,
  },
  summarySubTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  keyPoint: {
    fontSize: 14,
    marginBottom: 4,
  },
});
