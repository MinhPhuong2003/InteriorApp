// VlogScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const VlogScreen = () => {
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
        <Text style={styles.headerTitle}>Vlog</Text>
        {/* Để căn giữa tiêu đề, thụt lề phải 1 khoảng bằng back button */}
        <View style={{ width: 40 }} />
      </View>

      {/* Nội dung chính */}
      <ScrollView contentContainerStyle={styles.container}>
        <Ionicons
          name="videocam"
          size={60}
          color="#4A90E2"
          style={styles.icon}
        />
        <Text style={styles.title}>Chào mừng đến với Vlog của chúng tôi!</Text>
        <Text style={styles.subtitle}>
          Tại đây bạn sẽ tìm thấy những video mới nhất về phong cách sống,
          công nghệ và nhiều chủ đề hấp dẫn khác.
        </Text>
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
          }}
          style={styles.banner}
        />
        <Text style={styles.description}>
          Hãy theo dõi và khám phá các vlog độc đáo, chia sẻ những trải nghiệm
          thú vị và mẹo hay từ cộng đồng của chúng tôi.
        </Text>
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
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#4B5563',
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: 320,
  },
  banner: {
    width: 320,
    height: 180,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
  description: {
    fontSize: 16,
    color: '#374151',
    textAlign: 'center',
    maxWidth: 320,
    lineHeight: 22,
  },
});

export default VlogScreen;
