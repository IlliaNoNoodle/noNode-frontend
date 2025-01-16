import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Quote {
  text: string;
  context: string;
  person: string;
  timestamp: string;
}

interface KeyQuotesProps {
  quotes: Quote[];
}

export default function KeyQuotes({ quotes }: KeyQuotesProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Key Quotes</Text>
      {quotes.map((quote, index) => (
        <View key={index} style={styles.quoteCard}>
          <View style={styles.quoteHeader}>
            <Icon name="quote" size={28} color="#4F7EE7" />
            <Text style={styles.quoteText}>{quote.text}</Text>
          </View>
          <Text style={styles.quotePerson}>
            — {quote.person} {quote.timestamp}
          </Text>
          <View style={styles.context}>
            <Text style={styles.contextLabel}>Context</Text>
            <Text style={styles.contextText}>{quote.context}</Text>
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
  quoteCard: {
    backgroundColor: '#E5EDFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  quoteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginLeft: 8,
    flex: 1,
    color: '#333',
  },
  quotePerson: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'right',
    marginBottom: 8,
    color: '#666',
  },
  context: {
    marginTop: 8,
  },
  contextLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  contextText: {
    fontSize: 14,
    color: '#555',
  },
});
