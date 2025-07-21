import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const allAppointments = [
  {
    id: '1',
    date: '2025-07-22',
    time: '10:00 AM',
    consultant: 'Chuyên viên A',
    avatar: 'https://i.pravatar.cc/150?img=3',
    status: 'Đã xác nhận',
    topic: 'Tư vấn phòng khách',
  },
  {
    id: '2',
    date: '2025-07-25',
    time: '3:00 PM',
    consultant: 'Chuyên viên B',
    avatar: 'https://i.pravatar.cc/150?img=4',
    status: 'Chờ xác nhận',
    topic: 'Phối màu nội thất',
  },
];

const filters = ['Tất cả', 'Đã xác nhận', 'Chờ xác nhận'];

const AppointmentsScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('Tất cả');

  const filteredAppointments =
    selectedFilter === 'Tất cả'
      ? allAppointments
      : allAppointments.filter((item) => item.status === selectedFilter);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.topic}>{item.topic}</Text>
          <Text style={styles.consultant}>Người tư vấn: {item.consultant}</Text>
          <Text style={styles.datetime}>
            <Icon name="calendar-outline" size={14} /> {item.date} - {item.time}
          </Text>
        </View>
      </View>
      <Text
        style={[
          styles.status,
          item.status === 'Đã xác nhận'
            ? styles.statusConfirmed
            : styles.statusPending,
        ]}
      >
        {item.status}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="time-outline" size={22} color="#007AFF" />
        <Text style={styles.headerText}>Lịch tư vấn của bạn</Text>
      </View>

      {/* Bộ lọc */}
      <View style={styles.filterContainer}>
        {filters.map((status, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.filterButton,
              selectedFilter === status && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(status)}
          >
            <Text
              style={[
                styles.filterText,
                selectedFilter === status && styles.filterTextActive,
              ]}
            >
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Danh sách lịch hẹn */}
      {filteredAppointments.length > 0 ? (
        <FlatList
          data={filteredAppointments}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Bạn chưa có lịch tư vấn nào.</Text>
          <Text style={styles.emptySubtext}>
            Hãy đặt lịch để được hỗ trợ sớm nhất!
          </Text>
          <TouchableOpacity style={styles.newButton}>
            <Text style={styles.newButtonText}>Đặt lịch ngay</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Nút đặt lịch mới (luôn hiển thị ở cuối) */}
      <TouchableOpacity
        style={styles.fixedButton}
        onPress={() => navigation.navigate('Booking')}
      >
        <Icon name="add-circle-outline" size={18} color="#fff" />
        <Text style={styles.fixedButtonText}>Đặt lịch mới</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppointmentsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingBottom: 70,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#333',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterText: {
    color: '#555',
    fontSize: 14,
  },
  filterTextActive: {
    color: '#fff',
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  topic: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  consultant: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
  },
  datetime: {
    fontSize: 13,
    color: '#777',
  },
  status: {
    fontSize: 13,
    fontWeight: '600',
    marginTop: 12,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  statusConfirmed: {
    color: '#2ECC71',
    backgroundColor: '#DFF5E2',
  },
  statusPending: {
    color: '#E67E22',
    backgroundColor: '#FDEBD0',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 6,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666',
    marginBottom: 14,
  },
  newButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
  },
  newButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  fixedButton: {
    position: 'absolute',
    bottom: 16,
    left: 20,
    right: 20,
    backgroundColor: '#007AFF',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  fixedButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
    marginLeft: 6,
  },
});
