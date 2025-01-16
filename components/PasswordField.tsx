import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PasswordField = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);

  const validatePasswords = () => {
    if (password !== confirmPassword) {
      setPasswordError('Паролі не збігаються');
    } else {
      setPasswordError('');
      // Тут можна додати логіку збереження нового паролю
    }
  };

  const togglePasswordVisibility = (isConfirm = false) => {
    if (isConfirm) {
      setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
    } else {
      setIsPasswordVisible(!isPasswordVisible);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Current password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
          placeholder="Enter current password"
          placeholderTextColor="#888"
        />
        <TouchableOpacity 
          style={styles.eyeIcon} 
          onPress={() => togglePasswordVisibility()}
        >
          <Ionicons 
            name={isPasswordVisible ? 'eye-off' : 'eye'} 
            size={24} 
            color="gray" 
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Change password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          secureTextEntry={!isConfirmPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          onBlur={validatePasswords}
          placeholder="Enter new password"
          placeholderTextColor="#888"
        />
        <TouchableOpacity 
          style={styles.eyeIcon} 
          onPress={() => togglePasswordVisibility(true)}
        >
          <Ionicons 
            name={isConfirmPasswordVisible ? 'eye-off' : 'eye'} 
            size={24} 
            color="gray" 
          />
        </TouchableOpacity>
      </View>

      {passwordError ? (
        <Text style={styles.errorText}>{passwordError}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 5,
    color: '#333',
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginVertical: 5,
  },
  input: {
    flex: 1,
    padding: 10,
    color: '#000',
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
  },
});

export default PasswordField;