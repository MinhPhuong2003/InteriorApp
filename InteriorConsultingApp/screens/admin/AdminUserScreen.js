import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const AdminUserScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('users')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(data);
      });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.userItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>
          Tên người dùng: <Text style={styles.value}>{item.name}</Text>
        </Text>
        <Text style={styles.label}>
          Email: <Text style={styles.value}>{item.email}</Text>
        </Text>
        <Text style={styles.label}>
          Quyền: <Text style={styles.value}>{item.role}</Text>
        </Text>
        <Text style={styles.label}>
          Ngày tạo:{' '}
          <Text style={styles.value}>
            {item.createdAt
              ? new Date(item.createdAt.toDate()).toLocaleString('vi-VN')
              : 'Chưa có'}
          </Text>
        </Text>
      </View>
      <TouchableOpacity style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>QUẢN LÝ NGƯỜI DÙNG</Text>
        <View style={{ width: 40 }} /> 
        {/* khoảng trống để cân giữa header */}
      </View>

      {/* Danh sách user */}
      <FlatList
        data={users}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default AdminUserScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 },
  backButton: { padding: 4 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  userItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 14,
    backgroundColor: '#F1F1F1',
    borderRadius: 10,
    marginBottom: 12,
  },
  label: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  value: { fontWeight: '400', color: '#333' },
  deleteButton: {
    backgroundColor: '#FF5C5C',
    padding: 8,
    borderRadius: 8,
    marginLeft: 10,
  },
});
