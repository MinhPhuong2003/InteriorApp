import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);

  // 4 trạng thái đơn hàng
  const [pendingOrders, setPendingOrders] = useState([]);
  const [confirmedOrders, setConfirmedOrders] = useState([]);
  const [shippingOrders, setShippingOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      // Lấy thông tin người dùng
      const userUnsubscribe = firestore()
        .collection('users')
        .doc(currentUser.uid)
        .onSnapshot(doc => {
          if (doc.exists) {
            const data = doc.data();
            setUserData(data);
            setAvatar(data.avatar || null);
          }
          setLoading(false);
        });

      // Lấy danh sách đơn hàng
      const ordersUnsubscribe = firestore()
        .collection('orders')
        .where('userId', '==', currentUser.uid)
        .onSnapshot(snapshot => {
          const pending = [];
          const confirmed = [];
          const shipping = [];
          const delivered = [];

          snapshot.forEach(doc => {
            const order = { id: doc.id, ...doc.data() };
            switch (order.status) {
              case 'pending':
                pending.push(order);
                break;
              case 'confirmed':
                confirmed.push(order);
                break;
              case 'shipping':
                shipping.push(order);
                break;
              case 'delivered':
                delivered.push(order);
                break;
              default:
                pending.push(order);
            }
          });

          setPendingOrders(pending);
          setConfirmedOrders(confirmed);
          setShippingOrders(shipping);
          setDeliveredOrders(delivered);
        });

      return () => {
        userUnsubscribe();
        ordersUnsubscribe();
      };
    } else {
      setLoading(false);
    }
  }, []);

  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, response => {
      if (response.didCancel) {
        console.log('Người dùng hủy chọn ảnh');
      } else if (response.errorCode) {
        console.log('Lỗi khi chọn ảnh:', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setAvatar(response.assets[0].uri);
      }
    });
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Không có dữ liệu người dùng</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Thẻ profile */}
      <View style={styles.profileCard}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={avatar ? { uri: avatar } : require('../assets/logo.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>
        <Text style={styles.name}>{userData.name}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Icon name="mail-outline" size={20} color="#888" />
            <Text style={styles.infoText}>{userData.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="location-outline" size={20} color="#888" />
            <Text style={styles.infoText}>{userData.address || 'Chưa có địa chỉ'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Icon name="call-outline" size={20} color="#888" />
            <Text style={styles.infoText}>{userData.phone || 'Chưa có số điện thoại'}</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditProfile')}>
            <Icon name="create-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>Chỉnh sửa</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={() => navigation.replace('Login')}>
            <Icon name="log-out-outline" size={18} color="#fff" />
            <Text style={styles.buttonText}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Đơn mua - trạng thái */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Đơn mua</Text>
        <View style={styles.orderStatusContainer}>
          <TouchableOpacity
            style={styles.statusItem}
            onPress={() => navigation.navigate('OrderDetails', { orders: pendingOrders, status: 'pending' })}
          >
            <Icon name="time-outline" size={24} color="#f39c12" />
            <Text style={styles.statusText}>Đang xử lý ({pendingOrders.length})</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.statusItem}
            onPress={() => navigation.navigate('OrderDetails', { orders: confirmedOrders, status: 'confirmed' })}
          >
            <Icon name="cube-outline" size={24} color="#3498db" />
            <Text style={styles.statusText}>Chờ giao ({confirmedOrders.length})</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.statusItem}
            onPress={() => navigation.navigate('OrderDetails', { orders: shippingOrders, status: 'shipping' })}
          >
            <Icon name="car-outline" size={24} color="#8e44ad" />
            <Text style={styles.statusText}>Đang giao ({shippingOrders.length})</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.statusItem}
            onPress={() => navigation.navigate('OrderDetails', { orders: deliveredOrders, status: 'delivered' })}
          >
            <Icon name="checkmark-done-outline" size={24} color="green" />
            <Text style={styles.statusText}>Đã giao ({deliveredOrders.length})</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Lịch sử mua hàng */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lịch sử mua hàng</Text>
        <TouchableOpacity style={styles.historyBox} onPress={() => navigation.navigate('OrderHistory')}>
          <Icon name="receipt-outline" size={30} color="#2c3e50" />
          <Text style={styles.historyText}>Xem đơn hàng</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F0F4F8' },
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
  avatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 16, borderWidth: 2, borderColor: '#3498db' },
  name: { fontSize: 22, fontWeight: '600', color: '#333', marginBottom: 8 },
  infoContainer: { alignSelf: 'stretch', marginTop: 10, marginBottom: 10, paddingLeft: 10 },
  infoRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  infoText: { marginLeft: 6, fontSize: 15, color: '#555' },
  buttonContainer: { flexDirection: 'row', marginTop: 20, gap: 12 },
  button: { flexDirection: 'row', backgroundColor: '#3498db', paddingVertical: 10, paddingHorizontal: 16, borderRadius: 12, alignItems: 'center', gap: 6 },
  logoutButton: { backgroundColor: '#e74c3c' },
  buttonText: { color: '#fff', fontWeight: '500' },
  section: { marginTop: 6 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 8, color: '#333' },
  historyBox: { backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center', padding: 16, borderRadius: 12, elevation: 2 },
  historyText: { fontSize: 16, marginLeft: 12, color: '#2c3e50' },
  orderStatusContainer: { flexDirection: 'row', justifyContent: 'space-around', backgroundColor: '#fff', paddingVertical: 16, borderRadius: 12, elevation: 2 },
  statusItem: { alignItems: 'center', width: 70 },
  statusText: { fontSize: 12, color: '#555', marginTop: 6, textAlign: 'center' },
});
