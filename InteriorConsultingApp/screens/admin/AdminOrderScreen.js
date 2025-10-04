import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const AdminOrderScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('orders')
      .orderBy('createdAt', 'desc')
      .onSnapshot(
        snapshot => {
          const fetchedOrders = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setOrders(fetchedOrders);
          setLoading(false);
        },
        error => {
          console.log('Lỗi khi lấy đơn hàng:', error);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = (orderId, status) => {
    firestore()
      .collection('orders')
      .doc(orderId)
      .update({ status })
      .then(() => {
        let statusText = '';
        if (status === 'confirmed') statusText = 'Chờ giao';
        else if (status === 'shipping') statusText = 'Đang giao';
        else if (status === 'delivered') statusText = 'Đã giao';

        Alert.alert('Cập nhật', `Đơn hàng đã chuyển sang trạng thái: ${statusText}`);
      })
      .catch(err => {
        console.log('Lỗi khi cập nhật trạng thái:', err);
        Alert.alert('Lỗi', 'Không thể cập nhật trạng thái đơn hàng.');
      });
  };

  const renderItem = ({ item }) => {
    const total = item.totalPrice || item.grandTotal || 0;

    const statusMap = {
      pending: { text: 'Đang xử lý', color: '#E67E22' },
      confirmed: { text: 'Chờ giao', color: '#3498DB' },
      shipping: { text: 'Đang giao', color: '#8E44AD' },
      delivered: { text: 'Đã giao', color: '#2ECC71' },
    };
    const statusStyle = statusMap[item.status] || statusMap['pending'];

    return (
      <View style={styles.orderBox}>
        <Text style={styles.orderId}>Mã đơn hàng: {item.id}</Text>
        <Text style={styles.orderDate}>
          Ngày đặt: {item.createdAt?.toDate().toLocaleDateString('vi-VN') || 'N/A'}
        </Text>
        <Text style={styles.orderName}>Khách: {item.address?.name || 'Không có tên'}</Text>

        {item.cartItems && item.cartItems.map(ci => (
          <View key={ci.id} style={styles.itemBox}>
            <Image source={{ uri: ci.image || '' }} style={styles.itemImage} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.itemName}>{ci.name || 'Không có tên'}</Text>
              <Text style={styles.itemQty}>Số lượng: {ci.quantity || 0}</Text>
              <Text style={styles.itemPrice}>{(ci.price * (ci.quantity || 0)).toLocaleString()} đ</Text>
            </View>
          </View>
        ))}

        <Text style={styles.orderTotal}>Tổng cộng: {total.toLocaleString()} đ</Text>
        <Text style={[styles.orderStatus, { color: statusStyle.color }]}>
          Trạng thái: {statusStyle.text}
        </Text>

        {/* Nút cập nhật trạng thái */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#3498DB' }]}
            onPress={() => handleUpdateStatus(item.id, 'confirmed')}
          >
            <Text style={styles.actionText}>Chờ giao</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#8E44AD' }]}
            onPress={() => handleUpdateStatus(item.id, 'shipping')}
          >
            <Text style={styles.actionText}>Đang giao</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: '#2ECC71' }]}
            onPress={() => handleUpdateStatus(item.id, 'delivered')}
          >
            <Text style={styles.actionText}>Đã giao</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#4A44F2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>QUẢN LÝ ĐƠN HÀNG</Text>
        <View style={{ width: 28 }} />
      </View>

      <FlatList
        data={orders}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16, paddingBottom: 50 }}
        ListEmptyComponent={
          <View style={styles.placeholderBox}>
            <Text style={styles.placeholderText}>Chưa có đơn hàng nào.</Text>
          </View>
        }
      />
    </View>
  );
};

export default AdminOrderScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FF' },

  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: { padding: 4 },
  pageTitle: { fontSize: 18, fontWeight: '700', color: '#333' },

  placeholderBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  placeholderText: { color: '#888', fontSize: 16 },

  orderBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  orderId: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  orderDate: { fontSize: 14, color: '#555', marginBottom: 6 },
  orderName: { fontWeight: 'bold', fontSize: 15, marginBottom: 6 },
  itemBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemImage: { width: 60, height: 60, borderRadius: 8, resizeMode: 'cover' },
  itemName: { fontSize: 14, fontWeight: '600' },
  itemQty: { fontSize: 13, color: '#555' },
  itemPrice: { fontSize: 14, fontWeight: 'bold', marginTop: 2 },
  orderTotal: { fontSize: 16, fontWeight: 'bold', color: '#333', marginTop: 10 },
  orderStatus: { fontSize: 14, marginTop: 4 },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 8,
    marginHorizontal: 4,
    borderRadius: 8,
    alignItems: 'center',
  },
  actionText: {
    color: '#fff',
    fontWeight: '600',
  },
});
