import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface ShareButtonProps {
  onExportPDF: () => void;
  onRename: () => void;
  onDelete: () => void;
}

export default function ShareButton({
  onExportPDF,
  onRename,
  onDelete,
}: ShareButtonProps) {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    console.log('Toggle menu pressed, current state:', !menuVisible);
    setMenuVisible(!menuVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => console.log('Share pressed')}
        style={styles.shareButton}
      >
        <Text style={styles.shareText}>Share</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        onPress={toggleMenu} 
        style={styles.iconButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <MaterialIcons name="more-vert" size={24} color="black" />
      </TouchableOpacity>

      {menuVisible && (
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              onExportPDF();
              toggleMenu();
            }}
          >
            <MaterialIcons name="picture-as-pdf" size={20} color="black" />
            <Text style={styles.menuText}>Export to PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              onRename();
              toggleMenu();
            }}
          >
            <MaterialIcons name="edit" size={20} color="black" />
            <Text style={styles.menuText}>Rename</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              onDelete();
              toggleMenu();
            }}
          >
            <MaterialIcons name="delete" size={20} color="black" />
            <Text style={styles.menuText}>Delete</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shareButton: {
    backgroundColor: '#4F7EE7',
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
  },
  shareText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  iconButton: {
    padding: 8,
  },
  menu: {
    position: 'absolute',
    top: 40,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
    minWidth: 150,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  menuText: {
    marginLeft: 8,
    fontSize: 14,
  },
});
