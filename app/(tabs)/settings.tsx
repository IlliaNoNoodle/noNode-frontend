import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

type Option = {
  id: string;
  title: string;
  description: string;
  checked: boolean;
};

type Section = {
  section: string;
  options: Option[];
};

const initialSettingsData: Section[] = [
  {
    section: 'General',
    options: [
      { id: '1', title: 'Title', description: 'Lorem ipsum dolor sit amet', checked: false },
      { id: '2', title: 'Title', description: 'Lorem ipsum dolor sit amet', checked: true },
    ],
  },
  {
    section: 'Advanced',
    options: [
      { id: '3', title: 'Title', description: 'Lorem ipsum dolor sit amet', checked: false },
      { id: '4', title: 'Title', description: 'Lorem ipsum dolor sit amet', checked: true },
      { id: '5', title: 'Title', description: 'Lorem ipsum dolor sit amet', checked: false },
    ],
  },
];

const SettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState<Section[]>(initialSettingsData);

  const toggleCheckbox = (sectionIndex: number, optionIndex: number) => {
    const updatedSettings = [...settings];
    updatedSettings[sectionIndex].options[optionIndex].checked =
      !updatedSettings[sectionIndex].options[optionIndex].checked;
    setSettings(updatedSettings);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      {/* Settings List */}
      <ScrollView contentContainerStyle={styles.settingsContainer}>
        {settings.map((section, sectionIndex) => (
          <View key={section.section} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.section}</Text>
            {section.options.map((option, optionIndex) => (
              <View
                key={option.id}
                style={styles.option}
                onPress={() => toggleCheckbox(sectionIndex, optionIndex)}
              >
                <View style={styles.optionDetails}>
                  <Text style={styles.optionTitle}>{option.title}</Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
                <TouchableOpacity onPress={() => {toggleCheckbox(sectionIndex, optionIndex)}}>
                  <Icon
                    name={option.checked ? 'checkbox' : 'square-outline'}
                    size={24}
                    color={option.checked ? '#4A90E2' : '#DADBE1'}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ))}
        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.signOutButton}>
            <Text style={styles.signOutText}>Sign out</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.deleteAccountText}>DELETE ACCOUNT</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 0,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
    paddingTop: 25,
  },
  header: {
    marginTop: 40,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  settingsContainer: {
    paddingBottom: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A90E2',
    marginBottom: 12,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 8,
  },
  optionDetails: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  optionDescription: {
    fontSize: 12,
    color: 'gray',
  },
  buttonsContainer: {
    marginTop: 16,
    marginBottom: 20,
  },
  signOutButton: {
    backgroundColor: '#E7E7FF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  signOutText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  deleteAccountText: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default SettingsScreen;
