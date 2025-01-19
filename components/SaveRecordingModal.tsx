import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

interface SaveRecordingModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: () => void;
  recordingName: string;
  setRecordingName: (name: string) => void;
  isSaving: boolean;
}

const SaveRecordingModal: React.FC<SaveRecordingModalProps> = ({
  isVisible,
  onClose,
  onSave,
  recordingName,
  setRecordingName,
  isSaving,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Save recording</Text>
          <TextInput
            style={styles.input}
            placeholder="Recording Name"
            value={recordingName}
            onChangeText={setRecordingName}
            editable={!isSaving}
          />
          <View style={styles.modalButtons}>
            <TouchableOpacity onPress={onClose} disabled={isSaving}>
              <Text style={[styles.cancelButton, isSaving && styles.disabledButton]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onSave} disabled={isSaving}>
              {isSaving ? (
                <ActivityIndicator color="green" />
              ) : (
                <Text style={styles.saveButtonText}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  cancelButton: {
    color: 'red',
    fontSize: 16,
  },
  saveButtonText: {
    color: 'green',
    fontSize: 16,
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default SaveRecordingModal;