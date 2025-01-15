import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface TranscriptionResult {
  text: string | null;
  status: string;
  error?: string;
  utterances?: Array<{
    confidence: number;
    speaker: string;
    text: string;
    start: number;
    end: number;
  }>;
}

export default function TranscriptionResult({ result }: { result?: TranscriptionResult }) {
  if (!result?.utterances?.length) {
    return <Text style={styles.noData}>No transcription available</Text>;
  }

  return (
    <View style={styles.container}>
      {result.utterances.map((utterance, index) => (
        <View 
          key={index} 
          style={[
            styles.messageContainer,
            utterance.speaker === 'A' ? styles.leftMessage : styles.rightMessage
          ]}
        >
          <View style={styles.speakerIndicator}>
            <View style={[
              styles.speakerDot,
              { backgroundColor: utterance.speaker === 'A' ? '#4C84FF' : '#FF6B6B' }
            ]} />
            <Text style={styles.speakerLabel}>Speaker {utterance.speaker}</Text>
          </View>
          <View style={[
            styles.messageBubble,
            utterance.speaker === 'A' ? styles.leftBubble : styles.rightBubble
          ]}>
            <Text style={[
              styles.messageText,
              utterance.speaker === 'A' ? styles.leftText : styles.rightText
            ]}>
              {utterance.text}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  noData: {
    textAlign: 'center',
    color: '#666',
    padding: 16,
  },
  messageContainer: {
    marginVertical: 8,
    maxWidth: '85%',
  },
  leftMessage: {
    alignSelf: 'flex-start',
  },
  rightMessage: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  speakerIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  speakerDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 4,
  },
  speakerLabel: {
    fontSize: 10,
    color: '#666666',
  },
  messageBubble: {
    padding: 12,
    borderRadius: 16,
    maxWidth: '100%',
  },
  leftBubble: {
    backgroundColor: '#F0F4FF',
    borderBottomLeftRadius: 4,
  },
  rightBubble: {
    backgroundColor: '#4C84FF',
    borderBottomRightRadius: 4,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  leftText: {
    color: '#000000',
  },
  rightText: {
    color: '#FFFFFF',
  },
});
