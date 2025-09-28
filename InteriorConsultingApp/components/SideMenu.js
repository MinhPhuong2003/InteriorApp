import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Animated,
  Pressable,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const SideMenu = ({ visible, onClose }) => {
  const navigation = useNavigation();
  const slideAnim = useRef(new Animated.Value(-250)).current;
  const [isMounted, setIsMounted] = useState(visible);

  useEffect(() => {
    if (visible) {
      setIsMounted(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -250,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsMounted(false);
        onClose?.();
      });
    }
  }, [visible]);

  const menuItems = [
    { icon: 'videocam-outline', label: 'Vlog' },
    { icon: 'call-outline', label: 'Liên hệ' },
    { icon: 'help-circle-outline', label: 'Trợ giúp' },
    { icon: 'log-out-outline', label: 'Đăng xuất' },
  ];

  const handleMenuPress = (label) => {
    switch (label) {
      case 'Vlog':
        navigation.navigate('Vlog');
        break;
      case 'Liên hệ':
        navigation.navigate('Contact');
        break;
      case 'Trợ giúp':
        navigation.navigate('Help');
        break;
      case 'Đăng xuất':
        navigation.replace('Login');
        break;
      default:
        break;
    }
    onClose();
  };

  if (!isMounted) return null;

  return (
    <Modal transparent visible={isMounted} animationType="none">
      <Pressable style={styles.overlay} onPress={onClose}>
        <Animated.View
          style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}
        >
          <View style={styles.userInfo}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.avatar}
            />
            <Text style={styles.userName}>Võ Lê Minh Phương</Text>
          </View>

          {menuItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.menuItem}
              onPress={() => handleMenuPress(item.label)}
            >
              <Ionicons
                name={item.icon}
                size={20}
                color="#333"
                style={styles.icon}
              />
              <Text style={styles.label}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    flexDirection: 'row',
  },
  menu: {
    width: 250,
    height: '100%',
    backgroundColor: '#fff',
    paddingTop: 30,
    paddingBottom: 20,
    paddingHorizontal: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 2,
  },
  userInfo: {
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  icon: {
    marginRight: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
});

export default SideMenu;
