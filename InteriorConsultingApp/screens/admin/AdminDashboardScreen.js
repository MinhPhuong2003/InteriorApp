import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const AdminDashboardScreen = ({ navigation }) => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    bookings: 0,
    users: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const productSnap = await firestore().collection('products').get();
        const orderSnap = await firestore().collection('orders').get();
        const bookingSnap = await firestore().collection('bookings').get();
        const userSnap = await firestore().collection('users').get();
        setStats({
          products: productSnap.size,
          orders: orderSnap.size,
          bookings: bookingSnap.size,
          users: userSnap.size,
        });
      } catch (error) {
        console.log('Lỗi lấy dữ liệu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4A44F2" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Bảng Điều Khiển Admin</Text>

      {/* Thống kê */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: '#E0F7FA' }]}>
          <Text style={styles.statNumber}>{stats.products}</Text>
          <Text style={styles.statLabel}>Sản phẩm</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#FFF3E0' }]}>
          <Text style={styles.statNumber}>{stats.orders}</Text>
          <Text style={styles.statLabel}>Đơn hàng</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#F3E5F5' }]}>
          <Text style={styles.statNumber}>{stats.bookings}</Text>
          <Text style={styles.statLabel}>Lịch hẹn</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: '#E8F5E9' }]}>
          <Text style={styles.statNumber}>{stats.users}</Text>
          <Text style={styles.statLabel}>Người dùng</Text>
        </View>
      </View>

      {/* Giữ nguyên toàn bộ các phần còn lại */}
      <Text style={styles.sectionTitle}>Chức năng quản lý hệ thống</Text>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AdminProduct')}>
        <View style={styles.row}>
          <Icon name="cube-outline" size={20} color="#4A44F2" />
          <Text style={styles.cardText}>Quản lý sản phẩm</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AdminOrder')}>
        <View style={styles.row}>
          <Icon name="receipt-outline" size={20} color="#4A44F2" />
          <Text style={styles.cardText}>Quản lý đơn hàng</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AdminBooking')}>
        <View style={styles.row}>
          <Icon name="calendar-outline" size={20} color="#4A44F2" />
          <Text style={styles.cardText}>Quản lý đặt lịch</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AdminUser')}>
        <View style={styles.row}>
          <Icon name="people-outline" size={20} color="#4A44F2" />
          <Text style={styles.cardText}>Quản lý người dùng</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AdminCategory')}>
        <View style={styles.row}>
          <Icon name="albums-outline" size={20} color="#4A44F2" />
          <Text style={styles.cardText}>Quản lý danh mục nội thất</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AdminChat')}>
        <View style={styles.row}>
          <Icon name="chatbubble-ellipses-outline" size={20} color="#4A44F2" />
          <Text style={styles.cardText}>Chat trực tiếp với người dùng</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logout} onPress={() => navigation.replace('Login')}>
        <View style={styles.row}>
          <Icon name="log-out-outline" size={18} color="#E53935" />
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AdminDashboardScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#FAFAFA',
    flexGrow: 1,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4A44F2',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#4A4A4A',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  logout: {
    marginTop: 30,
    alignSelf: 'center',
  },
  logoutText: {
    color: '#E53935',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
