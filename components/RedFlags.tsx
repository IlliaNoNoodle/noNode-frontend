import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface RedFlagDetail {
  title: string;
  description: string;
  timestamp: string;
}

interface RedFlagsProps {
  details: RedFlagDetail[];
}

export default function RedFlags({ details }: RedFlagsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Red Flags & Details</Text>
      {details.map((detail, index) => (
        <View key={index} style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="alert-circle-outline" size={20} color="#FFCC00" />
            <Text style={styles.cardTitle}>{detail.title}</Text>
            <Text style={styles.timestamp}>{detail.timestamp}</Text>
          </View>
          <Text style={styles.cardDescription}>{detail.description}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#F5F7FF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
    marginLeft: 8,
  },
  timestamp: {
    fontSize: 14,
    color: '#666',
  },
  cardDescription: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
