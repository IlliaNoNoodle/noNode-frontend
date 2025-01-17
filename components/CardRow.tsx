import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

export default function CardRow() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false} // Hide the horizontal scroll indicator
      contentContainerStyle={styles.scrollContent}
    >
      <View style={[styles.card, styles.toxicRating]}>
        <Text style={styles.cardTitle}>Toxic Truth Rating</Text>
        <Text style={styles.cardScore}>Score</Text>
        <Text style={styles.highRisk}>72 (High Risk)</Text>
      </View>

      <View style={[styles.card, styles.redFlag]}>
        <Text style={styles.cardTitle}>Top Red Flag</Text>
        <Text style={styles.cardScore}>Potential Harassment Detected</Text>
      </View>

      <View style={[styles.card, styles.quickAction]}>
        <Text style={styles.cardTitle}>Quick Action</Text>
        <Text style={styles.cardScore}>Save This Call as Evidence</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    // paddingHorizontal: 8, // Add some horizontal padding to the scroll container
  },
  card: {
    width: 200, // Fixed width for horizontal scroll
    height: 120, // Fixed height
    padding: 16,
    borderRadius: 8,
    // marginHorizontal: 8,
    justifyContent: 'center', // Centers content vertically
    alignItems: 'flex-start',
    marginRight: 10, // Aligns text to the start of the card
  },
  toxicRating: {
    backgroundColor: '#FFECEC',
  },
  redFlag: {
    backgroundColor: '#FFECEC',
  },
  quickAction: {
    backgroundColor: '#E1E9FF',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardScore: {
    fontSize: 14,
    marginBottom: 4,
  },
  highRisk: {
    color: 'red',
    fontWeight: 'bold',
  },
});
