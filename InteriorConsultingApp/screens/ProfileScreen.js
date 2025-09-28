import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ProfileScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.avatar}
        />
        <Text style={styles.name}>Võ Lê Minh Phương</Text>

        {/* Thông tin người dùng */}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Icon name="mail-outline" size={20} color="#888" />
            <Text style={styles.infoText}>phuongminh392@gmail.com</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="location-outline" size={20} color="#888" />
            <Text style={styles.infoText}>Ninh Thuận</Text>
          </View>

          <View style={styles.infoRow}>
            <Icon name="call-outline" size={20} color="#888" />
            <Text style={styles.infoText}>0378256319</Text>
          </View>
        </View>

        {/* Nút */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button}>
            <Icon name="create-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>Chỉnh sửa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.logoutButton]}
            onPress={() => navigation.replace('Login')}
          >
            <Icon name="log-out-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Đơn mua - trạng thái */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Đơn mua</Text>
        <View style={styles.orderStatusContainer}>
          <View style={styles.statusItem}>
            <Icon name="time-outline" size={24} color="#f39c12" />
            <Text style={styles.statusText}>Đang xử lý</Text>
          </View>
          <View style={styles.statusItem}>
            <Icon name="cube-outline" size={24} color="#3498db" />
            <Text style={styles.statusText}>Chờ giao</Text>
          </View>
          <View style={styles.statusItem}>
            <Icon name="checkmark-done-outline" size={24} color="green" />
            <Text style={styles.statusText}>Đã giao</Text>
          </View>
          <View style={styles.statusItem}>
            <Icon name="star-outline" size={24} color="#9b59b6" />
            <Text style={styles.statusText}>Đánh giá</Text>
          </View>
        </View>
      </View>

      {/* Lịch sử mua hàng */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lịch sử mua hàng</Text>
        <TouchableOpacity style={styles.historyBox}>
          <Icon name="receipt-outline" size={30} color="#2c3e50" />
          <Text style={styles.historyText}>Xem đơn hàng</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#F0F4F8',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    marginBottom: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  infoContainer: {
    alignSelf: 'stretch',
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    marginLeft: 6,
    fontSize: 15,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    gap: 12,
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 6,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '500',
  },
  section: {
    marginTop: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  historyBox: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  historyText: {
    fontSize: 16,
    marginLeft: 12,
    color: '#2c3e50',
  },
  orderStatusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    elevation: 2,
  },
  statusItem: {
    alignItems: 'center',
    width: 70,
  },
  statusText: {
    fontSize: 12,
    color: '#555',
    marginTop: 6,
    textAlign: 'center',
  },
});
