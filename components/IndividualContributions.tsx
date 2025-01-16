import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Contribution {
  person: string;
  comments: string;
  tone: string;
  observations: string;
}

interface IndividualContributionsProps {
  contributions: Contribution[];
}

export default function IndividualContributions({ contributions }: IndividualContributionsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Individual Contributions</Text>
      {contributions.map((contribution, index) => (
        <View key={index} style={styles.contributionCard}>
          <Text style={styles.personTitle}>{contribution.person}</Text>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="chatbubble-outline" size={16} color="#4F7EE7" />
              <Text style={styles.sectionTitle}>Key Comments</Text>
            </View>
            <Text style={styles.sectionContent}>{contribution.comments}</Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="mic-outline" size={16} color="#4F7EE7" />
              <Text style={styles.sectionTitle}>Tone & Behavior</Text>
            </View>
            <Text style={styles.sectionContent}>{contribution.tone}</Text>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Icon name="pulse-outline" size={16} color="#4F7EE7" />
              <Text style={styles.sectionTitle}>Observations/Concerns</Text>
            </View>
            <Text style={styles.sectionContent}>{contribution.observations}</Text>
          </View>
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
  contributionCard: {
    backgroundColor: '#F9FAFF',
    borderWidth: 1,
    borderColor: '#E0E7FF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  personTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  section: {
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  sectionContent: {
    fontSize: 14,
    color: '#555',
  },
});
