import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Link, useNavigation, useRouter } from 'expo-router';
import PasswordField from '../../components/PasswordField';
import { useFonts } from 'expo-font';

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
      { id: '3', title: 'Title', description: 'Lorem ipsum dolor sit amet', checked: true },
    ],
  },
  {
    section: 'Advanced',
    options: [
      { id: '4', title: 'Title', description: 'Lorem ipsum dolor sit amet', checked: false },
      { id: '5', title: 'Title', description: 'Lorem ipsum dolor sit amet', checked: true },
      { id: '6', title: 'Title', description: 'Lorem ipsum dolor sit amet', checked: false },
    ],
  },
];

const SettingsScreen: React.FC = () => {
  const [autosaveHighToxicRating, setAutosaveHighToxicRating] = useState(false);
  const [fontsLoaded] = useFonts({
    'NotoSans-Regular': require('../../assets/fonts/NotoSans-Regular.ttf'),
    'NotoSans-Bold': require('../../assets/fonts/NotoSans-Bold.ttf'),
    'NotoSans-SemiBold': require('../../assets/fonts/NotoSans-SemiBold.ttf'),
  });

  const navigation = useNavigation()
  const router = useRouter()

  const [settings, setSettings] = useState<Section[]>(initialSettingsData);

  const toggleCheckbox = (sectionIndex: number, optionIndex: number) => {
    const updatedSettings = [...settings];
    updatedSettings[sectionIndex].options[optionIndex].checked =
      !updatedSettings[sectionIndex].options[optionIndex].checked;
    setSettings(updatedSettings);
  };

  if (!fontsLoaded) {
    return null; // or a loading screen
  }

  return (
    <ScrollView 
    style={styles.container}
    contentContainerStyle={styles.scrollViewContent}
    showsVerticalScrollIndicator={false}
    keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.headerSectionColumn}>
        <View style={styles.headerSection}>
            <Text style={styles.headerSubtitleTop}>Autosave analysis with High Toxic Rating</Text>
            <TouchableOpacity 
              onPress={() => setAutosaveHighToxicRating(!autosaveHighToxicRating)}
              style={{ 
                width: 40,  // Fixed width to ensure consistent space
                height: 40,  // Fixed height to ensure vertical centering
                justifyContent: 'center', 
                alignItems: 'center' 
              }}
            >
              <Icon
                name={autosaveHighToxicRating ? 'checkbox' : 'checkbox-outline'}
                size={24}
                color={autosaveHighToxicRating ? '#007AFF' : '#DADBE1'}
              />
            </TouchableOpacity>
          </View>
           <Text style={styles.headerSubtitleBottom}>Please note analysis with low Toxic Ratings are removed after 28 days</Text>
        </View>
        <View style={[styles.headerSection, styles.headerSectionColumn]}>
            <Text style={styles.headerSubtitleTop}>Voice Recorder</Text>
            <Text style={styles.headerSubtitleBottom}>Version 1.0</Text>
        </View>
        <View style={[styles.headerSection, styles.headerSectionColumn]}>
            <Text style={styles.headerSubtitleTop}>Current tariff</Text>
            <Text style={styles.headerSubtitleBottom}>£9.99 / Month</Text>
        </View>
      </View>
        {/* Button */}
      <View>
          <TouchableOpacity onPress={() => {router.navigate('/settings/payment')}} style={styles.changeTarifButton}>
            <Text style={styles.changeTarifText}>Change tariff</Text>
          </TouchableOpacity>
        </View>
        {/*account section*/}
        <View style={styles.header}>
        <Text style={[styles.headerTitle, styles.headerTitleBlue]}>Account</Text>
          <View style={[styles.headerSectionColumn, styles.headerSectionColumnAccount]}>
          <Text style={styles.headerSubtitleTop}>Email</Text>
          <Text style={styles.headerSubtitleBottom}>michelle.rivera@example.com</Text>
          </View>
      </View>
      {/* Settings List */}
      <View>
        {/* Password field */}
        <PasswordField />
        {/* Buttons */}
        <View>
          <TouchableOpacity style={styles.signOutButton}>
            <Text style={styles.signOutText}>Sign out</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.deleteAccountText]}>DELETE ACCOUNT</Text>
          </TouchableOpacity>
        </View>
        </View>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 0,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 16,
    paddingTop: 30,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 100,
  },
  header: {
    marginTop: 40,
    marginBottom: 20,
  },
  headerSection: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    marginBottom: 12,
  },
  headerSectionColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  headerSectionColumnAccount: {
    marginTop: 16,
  },
  headerTitle: {
    fontWeight: 'bold',
    fontFamily: 'NotoSans-Bold',
    fontSize: 24,
  },
  headerTitleBlue: {
    color: '#4F6DFF',
    fontSize: 20,
  },
  headerSubtitleTop:{
    fontWeight: '600',
    fontFamily: 'NotoSans-SemiBold',
    marginBottom: 8,
  },
  headerSubtitleBottom:{
    fontWeight: '400',
    fontFamily: 'NotoSans-Regular',
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
    marginBottom: 12,
    fontFamily: 'NotoSans-Bold',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingVertical: 8,
  },
  optionDetails: {
    flex: 1,
  },
  optionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
    fontFamily: 'NotoSans-Bold',
  },
  optionDescription: {
    fontSize: 12,
    color: 'gray',
    fontFamily: 'NotoSans-Regular',
  },
  signOutButton: {
    backgroundColor: '#E7E7FF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginBottom: 8,
  },
  signOutText: {
    fontFamily: 'NotoSans-SemiBold',
    color: '#0B102A',
  },
  deleteAccountText: {
    fontFamily: 'NotoSans-Bold',
    color: 'red',
    textAlign:'center',
    marginTop: 24,
  },
  changeTarifButton: {
    backgroundColor: '#4F6DFF',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  changeTarifText: {
    fontFamily: 'NotoSans-SemiBold',
    color: '#F6F6F6',
  },
});