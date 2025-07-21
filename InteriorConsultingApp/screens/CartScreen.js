import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  FlatList, Image, Modal,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const initialCart = [
  {
    id: '1',
    name: 'Ghế Vải',
    price: 590000,
    image: require('../assets/logo.png'),
    quantity: 1,
  },
  {
    id: '2',
    name: 'Bộ Ghế Vải',
    price: 1800000,
    image: require('../assets/logo.png'),
    quantity: 3,
  },
  {
    id: '3',
    name: 'Sofa Vải',
    price: 2500000,
    image: require('../assets/logo.png'),
    quantity: 1,
  },
];

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState(initialCart);

  // State modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity, 0
  );
  const shippingFee = 49900;
  const grandTotal = totalPrice + shippingFee;

  const updateQuantity = (id, type) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? {
              ...item,
              quantity:
                type === 'inc'
                  ? item.quantity + 1
                  : item.quantity > 1
                  ? item.quantity - 1
                  : 1,
            }
          : item
      )
    );
  };

  // Mở modal xác nhận xóa
  const confirmRemoveItem = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  // Xóa item thật sự
  const removeItem = () => {
    if (!selectedItem) return;
    setCartItems(prev => prev.filter(item => item.id !== selectedItem.id));
    setSelectedItem(null);
    setModalVisible(false);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>{item.price.toLocaleString()} đ</Text>
      </View>
      <View style={styles.qtyContainer}>
        <TouchableOpacity onPress={() => updateQuantity(item.id, 'dec')}>
          <Ionicons name="remove-circle-outline" size={24} color="#666" />
        </TouchableOpacity>
        <Text style={styles.qty}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => updateQuantity(item.id, 'inc')}>
          <Ionicons name="add-circle-outline" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => confirmRemoveItem(item)} style={{ marginLeft: 12 }}>
          <Ionicons name="trash-outline" size={24} color="#cc0000" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Giỏ Hàng</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* List */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 40, fontSize: 16 }}>Giỏ hàng trống</Text>}
      />

      {/* Footer */}
      {cartItems.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.row}>
            <Text style={styles.footerLabel}>Tạm tính</Text>
            <Text style={styles.footerValue}>{totalPrice.toLocaleString()} đ</Text>
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
  onPress={() => navigation.navigate('CheckOut', { totalPrice })}
>
  <Text style={styles.checkoutText}>Thanh Toán</Text>
</TouchableOpacity>
        </View>
      )}

      {/* Modal xác nhận xóa */}
      <Modal
        transparent
        visible={modalVisible}
        animationType="none"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Image source={selectedItem.image} style={styles.modalImage} />
                <Text style={styles.modalName}>{selectedItem.name}</Text>
                <Text style={styles.modalPrice}>{selectedItem.price.toLocaleString()} đ</Text>

                <Text style={styles.modalQuestion}>Bạn có chắc muốn xóa sản phẩm này khỏi giỏ hàng?</Text>

                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: '#ccc' }]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text>Không</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, { backgroundColor: '#cc0000' }]}
                    onPress={removeItem}
                  >
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