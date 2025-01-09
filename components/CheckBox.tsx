import React, { useState } from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

export function CheckBox(props: { label: string, checked: boolean, onToggle: () => void }) {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={props.onToggle}>
      <View style={[styles.checkbox, styles.checkboxChecked]}>
        {props.checked && <Text style={styles.checkmark}>✔</Text>}
      </View>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#DADBE1',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transpared',
  },
  checkmark: {
    color: '#fff',
    fontWeight: 'bold',
  },
  label: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
});