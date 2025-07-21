// HelpScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const faqs = [
  {
    question: 'Làm thế nào để đăng ký tài khoản?',
    answer:
      'Bạn có thể đăng ký tài khoản bằng cách nhấn vào nút "Đăng ký" trên màn hình chính và điền thông tin theo yêu cầu.',
  },
  {
    question: 'Quên mật khẩu, tôi phải làm sao?',
    answer:
      'Bạn có thể sử dụng chức năng "Quên mật khẩu" để nhận email hoặc SMS hướng dẫn đặt lại mật khẩu.',
  },
  {
    question: 'Làm thế nào để liên hệ hỗ trợ?',
    answer:
      'Bạn có thể liên hệ qua số điện thoại hoặc email trong mục "Liên hệ" trên ứng dụng.',
  },
];

const HelpScreen = () => {
  const navigation = useNavigation();

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
              <Text style={styles.headerTitle}>Help</Text>
              {/* Để căn giữa tiêu đề, thụt lề phải 1 khoảng bằng back button */}
              <View style={{ width: 40 }} />
            </View>

      <ScrollView contentContainerStyle={styles.container}>
        <Ionicons
          name="help-circle"
          size={64}
          color="#4A90E2"
          style={styles.icon}
        />
        <Text style={styles.title}>Trợ giúp & Hỗ trợ</Text>
        {faqs.map((item, index) => (
          <View key={index} style={styles.faqItem}>
            <Text style={styles.question}>{item.question}</Text>
            <Text style={styles.answer}>{item.answer}</Text>
          </View>
        ))}
        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => Linking.openURL('mailto:support@example.com')}
        >
          <Ionicons name="mail" size={24} color="#fff" />
          <Text style={styles.contactText}>Liên hệ hỗ trợ qua Email</Text>
        </TouchableOpacity>
      </ScrollView>
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
    padding: 24,
    alignItems: 'center',
    paddingBottom: 40,
  },
  icon: {
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 24,
  },
  faqItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  answer: {
    fontSize: 14,
    color: '#4B5563',
    lineHeight: 20,
  },
  contactButton: {
    flexDirection: 'row',
    backgroundColor: '#4A90E2',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  contactText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '600',
  },
});

export default HelpScreen;
