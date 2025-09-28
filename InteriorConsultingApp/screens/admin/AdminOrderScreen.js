import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const dummyOrders = [
  {
    id: '1',
    customerName: 'Nguyễn Văn A',
    total: 1250000,
    status: 'Chờ xử lý',
  },
  {
    id: '2',
    customerName: 'Trần Thị B',
    total: 799000,
    status: 'Đã xác nhận',
  },
  {
    id: '3',
    customerName: 'Phạm Văn C',
    total: 2430000,
    status: 'Đang giao',
  },
];

const AdminOrderScreen = ({ navigation }) => {
  const renderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.orderName}>Khách: {item.customerName}</Text>
        <Text style={styles.orderDetail}>Tổng: {item.total.toLocaleString()}đ</Text>
        <Text style={[styles.orderDetail, { color: '#888' }]}>Trạng thái: {item.status}</Text>
      </View>
      <TouchableOpacity style={styles.handleButton}>
        <Text style={styles.handleButtonText}>Xử lý</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Back button */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#4A44F2" />
        <Text style={styles.backText}>Quay lại</Text>
      </TouchableOpacity>

      {/* Header */}
      <View style={styles.headerRow}>
        <Icon name="receipt-outline" size={26} color="#4A44F2" />
        <Text style={styles.header}>Quản lý đơn hàng</Text>
      </View>

      <Text style={styles.description}>
        Xem và xử lý các đơn hàng từ khách hàng.
      </Text>

      {/* List đơn hàng */}
      <FlatList
        data={dummyOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
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
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FF',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backText: {
    marginLeft: 5,
    color: '#4A44F2',
    fontSize: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A44F2',
  },
  description: {
    fontSize: 15,
    color: '#555',
    marginBottom: 20,
  },
  placeholderBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 3,
  },
  placeholderText: {
    color: '#888',
    fontSize: 16,
  },
  orderItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  orderName: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  orderDetail: {
    fontSize: 14,
    color: '#333',
  },
  handleButton: {
    backgroundColor: '#4A44F2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  handleButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});
