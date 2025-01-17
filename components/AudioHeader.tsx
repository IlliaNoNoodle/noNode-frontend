import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Button, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import ShareButton from './ShareButton';
import { router } from 'expo-router';

export default function AudioHeader({ title }: { title: string }) {
  const [isRenameModalVisible, setRenameModalVisible] = useState(false);
  const [newName, setNewName] = useState(title);

  const handleExportPDF = async () => {
    try {
      const options = {
        html: `<h1>${title}</h1><p>This is the recording details.</p>`,
        fileName: `${title}-recording`,
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert('PDF Exported', `PDF saved to: ${file.filePath}`);
      console.log('PDF saved at:', file.filePath);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      Alert.alert('Error', 'Failed to export PDF.');
    }
  };

  const handleRename = () => setRenameModalVisible(true);

  const confirmRename = () => {
    console.log('Renamed to:', newName);
    // Update the recording's name in your store or backend here
    setRenameModalVisible(false);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Recording',
      'Are you sure you want to delete this recording?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            console.log('Recording deleted');
            // Remove the recording from your store or backend here
          },
        },
      ]
    );
  };

  return (
    <View style={styles.header}>
         <TouchableOpacity onPress={() => router.push("/files")}>
        <MaterialIcons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <ShareButton
        onExportPDF={handleExportPDF}
        onRename={handleRename}
        onDelete={handleDelete}
      />

      {/* Rename Modal */}
      <Modal
        transparent
        visible={isRenameModalVisible}
        animationType="slide"
        onRequestClose={() => setRenameModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rename Recording</Text>
            <TextInput
              style={styles.textInput}
              value={newName}
              onChangeText={setNewName}
              placeholder="Enter new name"
            />
            <Button title="Save" onPress={confirmRename} />
            <Button title="Cancel" onPress={() => setRenameModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
    marginBottom: 20,
    borderRadius: 4,
  },
});
