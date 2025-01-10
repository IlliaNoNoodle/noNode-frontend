import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export function IconSymbol(props: { size: number, name: string, color:string }){
  return (
    <View style={styles.iconContainer}>
      <Icon name={props.name} size={props.size} color={props.color} />
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
