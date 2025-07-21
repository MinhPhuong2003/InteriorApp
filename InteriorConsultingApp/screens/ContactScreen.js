// ContactScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Linking,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ContactScreen = () => {
  const navigation = useNavigation();

  const contactInfo = [
    {
      icon: 'call',
      label: 'Điện thoại',
      value: '+84 123 456 789',
      action: () => Linking.openURL('tel:+84123456789'),
    },
    {
      icon: 'mail',
      label: 'Email',
      value: 'contact@example.com',
      action: () => Linking.openURL('mailto:contact@example.com'),
    },
    {
      icon: 'location-outline',
      label: 'Địa chỉ',
      value: '123 Đường ABC, Quận 1, TP.HCM',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f4f8' }}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Liên hệ</Text>
        {/* Giữ khoảng trống để cân bằng header */}
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Liên hệ với chúng tôi</Text>
        {contactInfo.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contactRow}
            activeOpacity={item.action ? 0.7 : 1}
            onPress={item.action}
          >
            <Ionicons
              name={item.icon}
              size={28}
              color="#4A90E2"
              style={styles.icon}
            />
            <View style={styles.textContainer}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 30,
    textAlign: 'center',
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  icon: {
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  value: {
    fontSize: 18,
    color: '#111827',
    fontWeight: '600',
  },
});

export default ContactScreen;
