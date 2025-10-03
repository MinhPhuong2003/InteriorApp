import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Switch,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SettingsModal = ({ visible, onClose }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigation = useNavigation();

  const handleChangePassword = () => {
    onClose(); // Đóng modal trước
    navigation.navigate('CreateNewPassword'); // Điều hướng sang màn hình đổi mật khẩu
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <View style={styles.modalContent}>
          {/* Đổi mật khẩu */}
          <TouchableOpacity style={styles.option} onPress={handleChangePassword}>
            <Ionicons name="lock-closed-outline" size={20} style={styles.icon} />
            <Text style={styles.label}>Đổi mật khẩu</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000055',
  },
  modalContent: {
    position: 'absolute',
    top: 40,
    right: 10,
    backgroundColor: '#fff',
    width: 250,
    borderRadius: 8,
    padding: 15,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  icon: {
    marginRight: 10,
    color: '#444',
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});

export default SettingsModal;
