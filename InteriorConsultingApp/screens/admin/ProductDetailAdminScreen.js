import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';

const ProductDetailAdminScreen = ({ navigation, route }) => {
  const { product } = route.params;
  const [currentProduct, setCurrentProduct] = useState(product);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('products')
      .doc(product.id)
      .onSnapshot(doc => {
        if (doc.exists) {
          setCurrentProduct({ id: doc.id, ...doc.data() });
        }
      });

    return () => unsubscribe();
  }, [product.id]);

  const handleEdit = () => {
    navigation.navigate('EditProduct', { product: currentProduct });
  };

  const handleDelete = () => {
    Alert.alert('Xác nhận', `Bạn chắc chắn muốn xóa "${currentProduct.name}"?`, [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Xóa',
        style: 'destructive',
        onPress: async () => {
          await firestore().collection('products').doc(currentProduct.id).delete();
          navigation.goBack();
        },
      },
    ]);
  };

  if (!currentProduct) return null;

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.header}>Chi tiết sản phẩm</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hình ảnh */}
        <Image source={{ uri: currentProduct.image }} style={styles.image} />

        {/* Thông tin sản phẩm */}
        <View style={styles.infoContainer}>
          <View style={styles.row}>
            <Text style={styles.label}>Tên sản phẩm:</Text>
            <Text style={styles.value}>{currentProduct.name}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Giá bán:</Text>
            <Text style={styles.value}>{currentProduct.price?.toLocaleString()} đ</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Mô tả:</Text>
            <Text style={styles.value}>{currentProduct.description || 'Chưa có mô tả'}</Text>
          </View>

          <View style={styles.row}>
            <Text style={styles.label}>Ngày thêm:</Text>
            <Text style={styles.value}>
              {currentProduct.createdAt?.toDate
                ? currentProduct.createdAt.toDate().toLocaleString()
                : 'N/A'}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Nút Sửa / Xóa đặt dưới cùng */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#4A90E2' }]} onPress={handleEdit}>
          <Icon name="create-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>Sửa</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#E53935' }]} onPress={handleDelete}>
          <Icon name="trash-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailAdminScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: { width: 40 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  image: { width: '100%', height: 250, resizeMode: 'cover' },
  infoContainer: {
    padding: 16,
    margin: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  label: { fontSize: 16, fontWeight: '600', color: '#333', marginRight: 6 },
  value: { fontSize: 16, color: '#555', flexShrink: 1 },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8,
    flex: 0.48,
    justifyContent: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 6,
    fontWeight: '600',
  },
});
