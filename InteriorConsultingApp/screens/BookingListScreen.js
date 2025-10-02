import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

const filters = ['Tất cả', 'Đã xác nhận', 'Chờ xác nhận'];
const ADMIN_ID = "admin";

const BookingListScreen = ({ navigation }) => {
  const [selectedFilter, setSelectedFilter] = useState('Tất cả');
  const [appointments, setAppointments] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const user = auth().currentUser;
    if (!user) return;
    const unsubscribeBookings = firestore()
      .collection('bookings')
      .where('userId', '==', user.uid)
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(data);
      });
    const chatId = `chat_${user.uid}_admin`;
    const unsubscribeChat = firestore()
      .collection('chats')
      .doc(chatId)
      .collection('messages')
      .where('senderId', '==', ADMIN_ID)
      .where('read', '==', false)
      .onSnapshot(snapshot => {
        setUnreadCount(snapshot.size);
      });
    return () => {
      unsubscribeBookings();
      unsubscribeChat();
    };
  }, []);
  const filteredAppointments =
    selectedFilter === 'Tất cả'
      ? appointments
      : appointments.filter(item => item.status === selectedFilter);
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.row}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.avatar} />
        ) : (
          <Icon name="image-outline" size={40} color="#ccc" />
        )}
        <View style={{ marginLeft: 12, flex: 1 }}>
          <Text style={styles.label}>
            Nội dung: <Text style={styles.value}>{item.notes || 'Không có ghi chú'}</Text>
          </Text>

          <Text style={styles.label}>
            Ngày & giờ:{' '}
            <Text style={styles.value}>
              {item.date ? new Date(item.date).toLocaleString() : 'Chưa có ngày'}
            </Text>
          </Text>
        </View>
      </View>
      <Text
        style={[
          styles.status,
          item.status === 'Đã xác nhận'
            ? styles.statusConfirmed
            : styles.statusPending,
        ]}>
        {item.status || 'Chờ xác nhận'}
      </Text>
    </View>
  );
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="time-outline" size={22} color="#007AFF" />
        <Text style={styles.headerText}>Lịch tư vấn của bạn</Text>

        {/* Nút chat + Badge số tin chưa đọc */}
        <TouchableOpacity
          style={styles.chatIconButton}
          onPress={() => navigation.navigate('UserChat')}
        >
          <Icon name="chatbubble-ellipses-outline" size={22} color="#fff" />
          {unreadCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{unreadCount}</Text>
            </View>
          )}
        </TouchableOpacity>
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
            onPress={() => setSelectedFilter(status)}>
            <Text
              style={[
                styles.filterText,
                selectedFilter === status && styles.filterTextActive,
              ]}>
              {status}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Danh sách lịch hẹn */}
      {filteredAppointments.length > 0 ? (
        <FlatList
          data={filteredAppointments}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Bạn chưa có lịch tư vấn nào.</Text>
          <Text style={styles.emptySubtext}>
            Hãy đặt lịch để được hỗ trợ sớm nhất!
          </Text>
          <TouchableOpacity
            style={styles.newButton}
            onPress={() => navigation.navigate('Booking')}>
            <Text style={styles.newButtonText}>Đặt lịch ngay</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Nút đặt lịch mới */}
      <TouchableOpacity
        style={styles.fixedButton}
        onPress={() => navigation.navigate('Booking')}>
        <Icon name="add-circle-outline" size={18} color="#fff" />
        <Text style={styles.fixedButtonText}>Đặt lịch mới</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingListScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', paddingBottom: 70 },
  header: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    padding: 16, 
    backgroundColor: '#fff',
    position: 'relative'
  },
  headerText: { fontSize: 18, fontWeight: 'bold', marginLeft: 8, color: '#333' },
  chatIconButton: {
    marginLeft: 'auto',
    backgroundColor: '#28A745',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: 'red',
    borderRadius: 10,
    paddingHorizontal: 5,
    paddingVertical: 1,
    minWidth: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  filterContainer: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10, paddingHorizontal: 16 },
  filterButton: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 20, backgroundColor: '#e0e0e0' },
  filterButtonActive: { backgroundColor: '#007AFF' },
  filterText: { color: '#555', fontSize: 14 },
  filterTextActive: { color: '#fff' },
  list: { paddingHorizontal: 16 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 12, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  row: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  label: { fontSize: 14, fontWeight: '600', color: '#444', marginBottom: 4 },
  value: { fontWeight: '400', color: '#000' },
  status: { fontSize: 13, fontWeight: '600', marginTop: 12, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 6, alignSelf: 'flex-start' },
  statusConfirmed: { color: '#2ECC71', backgroundColor: '#DFF5E2' },
  statusPending: { color: '#E67E22', backgroundColor: '#FDEBD0' },
  emptyContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
  emptyText: { fontSize: 16, color: '#999', marginBottom: 6 },
  emptySubtext: { fontSize: 14, color: '#666', marginBottom: 14 },
  newButton: { backgroundColor: '#007AFF', paddingVertical: 10, paddingHorizontal: 18, borderRadius: 10 },
  newButtonText: { color: '#fff', fontSize: 14, fontWeight: '600' },
  fixedButton: { position: 'absolute', bottom: 16, left: 20, right: 20, backgroundColor: '#007AFF', borderRadius: 30, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingVertical: 12, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 5 },
  fixedButtonText: { color: '#fff', fontSize: 15, fontWeight: '600', marginLeft: 6 },
});
