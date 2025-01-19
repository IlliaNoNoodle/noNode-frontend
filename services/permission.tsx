import { Alert, PermissionsAndroid, Platform } from 'react-native';

export async function requestPermissions() {
  if (Platform.OS === 'android') {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    ]);

    if (
      granted['android.permission.RECORD_AUDIO'] !== PermissionsAndroid.RESULTS.GRANTED ||
      granted['android.permission.WRITE_EXTERNAL_STORAGE'] !== PermissionsAndroid.RESULTS.GRANTED
    ) {
      Alert.alert('Permissions Denied', 'You need to grant audio and storage permissions to use this feature.');
      return false;
    }
  }
  return true;
}
