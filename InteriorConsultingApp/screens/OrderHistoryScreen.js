import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const OrderHistoryScreen = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (currentUser) {
      const unsubscribe = firestore()
        .collection('orders')
        .where('userId', '==', currentUser.uid)
        .where('status', '==', 'delivered')
        .onSnapshot(snapshot => {
          const orderList = [];
          snapshot.forEach(doc => {
            orderList.push({ id: doc.id, ...doc.data() });
          });
          console.log('Delivered Orders:', orderList);
          setOrders(orderList);
          setLoading(false);
        });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#3498db" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Lịch sử mua hàng</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {orders.length === 0 ? (
          <Text style={styles.noOrdersText}>Chưa có đơn hàng nào đã giao.</Text>
        ) : (
          orders.map(order => (
            <View key={order.id} style={styles.orderBox}>
              <Text style={styles.orderId}>Mã đơn hàng: {order.id}</Text>
              <Text style={styles.orderDate}>
                Ngày đặt: {order.createdAt?.toDate().toLocaleDateString('vi-VN') || 'N/A'}
              </Text>
              {order.cartItems && order.cartItems.map(item => (
                <View key={item.id} style={styles.itemBox}>
                  <Image source={{ uri: item.image || '' }} style={styles.itemImage} />
                  <View style={{ flex: 1, marginLeft: 10 }}>
                    <Text style={styles.itemName}>{item.name || 'Không có tên'}</Text>
                    <Text style={styles.itemQty}>Số lượng: {item.quantity || 0}</Text>
                    <Text style={styles.itemPrice}>{(item.price * (item.quantity || 0)).toLocaleString() || '0'} đ</Text>
                  </View>
                </View>
              ))}
              <Text style={styles.orderTotal}>Tổng cộng: {order.grandTotal?.toLocaleString() || '0'} đ</Text>
              <Text style={styles.orderStatus}>Trạng thái: Đã giao</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default OrderHistoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F4F8' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  scrollContainer: { padding: 16 },
  noOrdersText: { textAlign: 'center', fontSize: 16, color: '#555', marginTop: 20 },
  orderBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  orderId: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  orderDate: { fontSize: 14, color: '#555', marginBottom: 10 },
  itemBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  itemImage: { width: 60, height: 60, borderRadius: 8, resizeMode: 'cover' },
  itemName: { fontWeight: '600', fontSize: 16 },
  itemQty: { fontSize: 14, color: '#555' },
  itemPrice: { fontSize: 14, fontWeight: 'bold', marginTop: 2 },
  orderTotal: { fontSize: 16, fontWeight: 'bold', color: '#333', marginTop: 10 },
  orderStatus: { fontSize: 14, color: 'green', marginTop: 5 },
});