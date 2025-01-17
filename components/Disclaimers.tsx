import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Disclaimers({ id }: { id: any }) {
  const router = useRouter();

  const handleViewTranscript = (id : any) => {
    console.log("Navigating to transcription with ID:", id); 
    router.push(`/screens/transcription/${id}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Disclaimers</Text>

      <View style={styles.disclaimerSection}>
        <Text style={styles.disclaimerTitle}>Legal Disclaimer</Text>
        <Text style={styles.disclaimerText}>
          The contents of this report are for informational purposes only and do
          not constitute legal advice. Consult an attorney for any specific
          legal concerns.
        </Text>
      </View>

      <View style={styles.disclaimerSection}>
        <Text style={styles.disclaimerTitle}>Confidentiality Statement</Text>
        <Text style={styles.disclaimerText}>
          This report is confidential and should only be shared with authorized
          individuals.
        </Text>
      </View>

      <TouchableOpacity
            style={styles.button}
            onPress={() => handleViewTranscript(id)}
            >
            <Text style={styles.buttonText}>View transcript now</Text>
            <MaterialIcons name="arrow-forward" size={18} color="#FFFFFF" />
            </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9FAFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  disclaimerSection: {
    marginBottom: 16,
  },
  disclaimerTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  disclaimerText: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F7EE7',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
});
