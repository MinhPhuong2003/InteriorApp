import React, { useContext, useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  FlatList, Image, Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { CartContext } from '../context/CartContext';

const CartScreen = ({ navigation }) => {
  const { cartItems, updateQuantity, removeItem, totalPrice, totalQuantity, resetCart } = useContext(CartContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const shippingFee = 0;
  const grandTotal = (totalPrice || 0) + shippingFee;
  const confirmRemoveItem = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleRemove = () => {
    if (selectedItem) {
      removeItem(selectedItem.id);
      setSelectedItem(null);
      setModalVisible(false);
    }
  };

  const renderItem = ({ item }) => {
    console.log('Cart item image:', item.image);
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          onError={(e) => {
            console.log('Error loading cart image:', e.nativeEvent.error);
          }}
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.name}>{item.name || 'Tên không xác định'}</Text>
          <Text style={styles.price}>{(item.price || 0).toLocaleString()} đ</Text>
        </View>
        <View style={styles.qtyContainer}>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 'dec')}>
            <Ionicons name="remove-circle-outline" size={24} color="#666" />
          </TouchableOpacity>
          <Text style={styles.qty}>{item.quantity || 0}</Text>
          <TouchableOpacity onPress={() => updateQuantity(item.id, 'inc')}>
            <Ionicons name="add-circle-outline" size={24} color="#666" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => confirmRemoveItem(item)} style={{ marginLeft: 12 }}>
            <Ionicons name="trash-outline" size={24} color="#cc0000" />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Giỏ Hàng</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={cartItems || []}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40, fontSize: 16 }}>Giỏ hàng trống</Text>}
      />

      {cartItems && cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.row}>
            <Text style={styles.footerLabel}>Tạm tính</Text>
            <Text style={styles.footerValue}>{(totalPrice || 0).toLocaleString()} đ</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.footerLabel}>Số lượng</Text>
            <Text style={styles.footerValue}>{totalQuantity || 0} sản phẩm</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.footerLabel}>Phí vận chuyển</Text>
            <Text style={styles.footerValue}>{shippingFee.toLocaleString()} đ</Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.footerLabel, { fontWeight: 'bold' }]}>Tổng cộng</Text>
            <Text style={[styles.footerValue, { fontWeight: 'bold' }]}>{grandTotal.toLocaleString()} đ</Text>
          </View>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => {
              console.log('Navigating to CheckOut with:', { cartItems, totalPrice, totalQuantity, shippingFee });
              navigation.navigate('CheckOut', { cartItems, totalPrice, totalQuantity, shippingFee });
            }}
          >
            <Text style={styles.checkoutText}>Thanh Toán</Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal transparent visible={modalVisible} animationType="none" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Image
                  source={{ uri: selectedItem.image }}
                  style={styles.modalImage}
                  onError={(e) => {
                    console.log('Error loading modal image:', e.nativeEvent.error);
                  }}
                />
                <Text style={styles.modalName}>{selectedItem.name || 'Tên không xác định'}</Text>
                <Text style={styles.modalPrice}>{(selectedItem.price || 0).toLocaleString()} đ</Text>
                <Text style={styles.modalQuestion}>Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?</Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#ccc' }]} onPress={() => setModalVisible(false)}>
                    <Text>Không</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.modalButton, { backgroundColor: '#cc0000' }]} onPress={handleRemove}>
                    <Text style={{ color: '#fff' }}>Có</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  price: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
    fontWeight: '600',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  qty: {
    marginHorizontal: 8,
    fontSize: 15,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#eee',
    padding: 16,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  footerLabel: {
    fontSize: 14,
    color: '#555',
  },
  footerValue: {
    fontSize: 14,
    color: '#000',
  },
  checkoutButton: {
    marginTop: 12,
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 12,
    resizeMode: 'cover',
  },
  modalName: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  modalPrice: {
    fontSize: 16,
    color: '#555',
    marginBottom: 12,
  },
  modalQuestion: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
});