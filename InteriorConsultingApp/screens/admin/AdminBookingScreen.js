import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const sampleBookings = [
  {
    id: '1',
    customerName: 'Nguyễn Văn A',
    date: '2025-07-25',
    time: '09:00',
    status: 'Chờ xác nhận',
  },
  {
    id: '2',
    customerName: 'Trần Thị B',
    date: '2025-07-26',
    time: '14:00',
    status: 'Đã xác nhận',
  },
  {
    id: '3',
    customerName: 'Lê Văn C',
    date: '2025-07-27',
    time: '10:30',
    status: 'Đã hủy',
  },
];

const AdminBookingScreen = () => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <View style={styles.itemInfo}>
        <Text style={styles.customerName}>{item.customerName}</Text>
        <Text style={styles.dateTime}>{item.date} lúc {item.time}</Text>
      </View>
      <View style={styles.statusBox}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Ionicons name="calendar-outline" size={28} color="#4A44F2" />
        <Text style={styles.header}>Quản lý đặt lịch</Text>
      </View>

      <FlatList
        data={sampleBookings}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default AdminBookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F9FF',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#4A44F2',
  },
  listContent: {
    gap: 12,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  itemInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  dateTime: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statusBox: {
    justifyContent: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#EEF1FF',
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#4A44F2',
  },
});
