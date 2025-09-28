import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const AdminProductScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('products')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(list);
      });

    return () => unsubscribe();
  }, []);

  const handleAdd = () => {
    navigation.navigate('AddProduct');
  };

  const handleEdit = item => {
    navigation.navigate('EditProduct', { product: item });
  };

  const handleDelete = item => {
    Alert.alert('Xác nhận', `Bạn chắc chắn muốn xóa "${item.name}"?`, [
      { text: 'Hủy' },
      {
        text: 'Xóa',
        onPress: async () => {
          await firestore().collection('products').doc(item.id).delete();
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() =>
        navigation.navigate('ProductDetailAdmin', { product: item })
      }>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.label}>
          Tên: <Text style={styles.value}>{item.name}</Text>
        </Text>
        <Text style={styles.label}>
          Giá: <Text style={styles.value}>{item.price.toLocaleString()}đ</Text>
        </Text>
        <Text style={styles.label} numberOfLines={1}>
          Mô tả: <Text style={styles.value}>{item.description}</Text>
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Ionicons name="create-outline" size={22} color="#4A44F2" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item)}
          style={{ marginLeft: 12 }}>
          <Ionicons name="trash-outline" size={22} color="#F24444" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header giống bạn yêu cầu */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>QUẢN LÝ SẢN PHẨM</Text>
        <TouchableOpacity
          onPress={handleAdd}
          style={styles.addButton}
        >
          <Ionicons name="add-circle-outline" size={28} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Ionicons name="cube-outline" size={60} color="#ccc" />
            <Text style={styles.emptyText}>Chưa có sản phẩm nào</Text>
          </View>
        }
      />
    </View>
  );
};

export default AdminProductScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#f9f9f9' },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  header: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  addButton: {
    padding: 4,
  },
  productItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 14,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2,
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'cover',
    borderRadius: 8,
    marginRight: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginTop: 2,
  },
  value: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#333',
  },
  actions: { flexDirection: 'row', alignItems: 'center', marginLeft: 12 },
  emptyBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  emptyText: { marginTop: 12, fontSize: 16, color: '#888' },
  backButton: { marginRight: 12 },
});
