import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { CartContext } from '../context/CartContext';

const CheckOutScreen = ({ navigation, route }) => {
  const { cartItems, totalPrice, totalQuantity, setCartItems } = useContext(CartContext);
  const { shippingFee = 0 } = route.params || {};
  const grandTotal = totalPrice + shippingFee;
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [address, setAddress] = useState(null);
  const [loadingAddress, setLoadingAddress] = useState(true);
  const [orderId, setOrderId] = useState(null);

  useEffect(() => {
    const user = auth().currentUser;
    if (user) {
      firestore()
        .collection('users')
        .doc(user.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            const data = doc.data();
            setAddress(
              data.address && typeof data.address === 'object'
                ? data.address
                : { name: data.name, phone: data.phone, address: data.address }
            );
          }
          setLoadingAddress(false);
        })
        .catch(err => {
          console.log('Error fetching address:', err);
          setLoadingAddress(false);
        });
    } else setLoadingAddress(false);
  }, []);

  const handleConfirmOrder = async () => {
    const user = auth().currentUser;
    if (!user) return Alert.alert('Lỗi', 'Vui lòng đăng nhập để đặt hàng.');
    if (!address) return Alert.alert('Lỗi', 'Vui lòng thêm địa chỉ giao hàng.');
    if (!cartItems || cartItems.length === 0) return Alert.alert('Lỗi', 'Giỏ hàng trống.');
    try {
      const orderRef = await firestore().collection('orders').add({
        userId: user.uid,
        cartItems,
        totalPrice,
        totalQuantity,
        shippingFee,
        grandTotal,
        paymentMethod,
        address,
        status: 'pending',
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      await firestore().collection('carts').doc(user.uid).delete().catch(() => null);
      setCartItems([]);
      setOrderId(orderRef.id);
      setIsPaymentSuccessful(true);
    } catch (error) {
      console.log('Lỗi khi lưu đơn hàng:', error);
      Alert.alert('Lỗi', 'Không thể đặt hàng. Vui lòng thử lại.');
    }
  };

  const handleViewPendingOrders = () => {
    const user = auth().currentUser;
    if (!user) return;

    firestore()
      .collection('orders')
      .where('userId', '==', user.uid)
      .where('status', '==', 'pending')
      .get()
      .then(querySnapshot => {
        const orders = [];
        querySnapshot.forEach(doc => orders.push({ id: doc.id, ...doc.data() }));
        if (orders.length > 0) navigation.navigate('OrderDetails', { orders, status: 'pending' });
        else Alert.alert('Thông báo', 'Không có đơn hàng đang xử lý.');
      })
      .catch(err => console.log(err));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={[styles.header, isPaymentSuccessful && styles.blur]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>THANH TOÁN</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={{ paddingBottom: isPaymentSuccessful ? 0 : 200 }}>
        <View style={[styles.content, isPaymentSuccessful && styles.blur]}>
          {/* Chi tiết sản phẩm */}
          <View style={styles.section}>
            <Text style={styles.label}>Chi tiết sản phẩm</Text>
            {cartItems.map(item => (
              <View key={item.id} style={styles.itemBox}>
                <Image source={{ uri: item.image || '' }} style={styles.itemImage} />
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.itemName}>{item.name || 'Không có tên'}</Text>
                  <Text style={styles.itemQty}>Số lượng: {item.quantity || 0}</Text>
                  <Text style={styles.itemPrice}>{(item.price * (item.quantity || 0)).toLocaleString()} đ</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Địa chỉ */}
          <View style={styles.section}>
            <Text style={styles.label}>Địa chỉ giao hàng</Text>
            <View style={styles.locationBox}>
              <Ionicons name="location-outline" size={20} color="#000" />
              <View style={{ flex: 1 }}>
                {loadingAddress ? (
                  <ActivityIndicator size="small" color="#6366F1" />
                ) : address ? (
                  <>
                    <Text style={styles.locationTitle}>{address.name || 'Chưa có tên'}</Text>
                    <Text style={styles.locationText}>SĐT: {address.phone || 'Chưa có số điện thoại'}</Text>
                    <Text style={styles.locationText}>{address.address || 'Chưa có địa chỉ'}</Text>
                  </>
                ) : (
                  <Text style={styles.locationText}>Chưa có địa chỉ. Vui lòng thêm địa chỉ trong hồ sơ.</Text>
                )}
              </View>
              <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
                <Text style={styles.changeText}>Thay đổi</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Phương thức thanh toán */}
          <View style={styles.section}>
            <Text style={styles.label}>Phương thức thanh toán</Text>
            {[{ key: 'cod', label: 'Thanh toán khi nhận hàng', desc: 'Trả tiền mặt khi nhận hàng' }].map(method => (
              <TouchableOpacity
                key={method.key}
                onPress={() => setPaymentMethod(method.key)}
                style={[styles.methodBox, paymentMethod === method.key && styles.methodSelected]}
              >
                <View style={styles.radioCircle}>
                  {paymentMethod === method.key && <View style={styles.radioDot} />}
                </View>
                <View>
                  <Text style={styles.methodLabel}>{method.label}</Text>
                  <Text style={styles.methodDesc}>{method.desc}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Footer summary */}
      <View style={styles.summary}>
        {!isPaymentSuccessful ? (
          <>
            <View style={styles.row}>
              <Text style={styles.footerLabel}>Tạm tính</Text>
              <Text style={styles.footerValue}>{totalPrice.toLocaleString()} đ</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.footerLabel}>Số lượng</Text>
              <Text style={styles.footerValue}>{totalQuantity} sản phẩm</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.footerLabel}>Phí vận chuyển</Text>
              <Text style={styles.footerValue}>{shippingFee.toLocaleString()} đ</Text>
            </View>
            <View style={styles.row}>
              <Text style={[styles.footerLabel, { fontWeight: 'bold' }]}>Tổng cộng</Text>
              <Text style={[styles.footerValue, { fontWeight: 'bold' }]}>{grandTotal.toLocaleString()} đ</Text>
            </View>
            <TouchableOpacity style={styles.checkoutButton} onPress={handleConfirmOrder}>
              <Text style={styles.checkoutText}>Xác nhận đơn hàng</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.successContainer}>
            <View style={styles.successBox}>
              <Ionicons name="checkmark-circle" size={60} color="#28a745" />
              <Text style={styles.successText}>Thanh toán của bạn đã thành công</Text>
              <Text style={styles.successNote}>
                Chúng tôi sẽ liên hệ với bạn để cung cấp thêm chi tiết trong thời gian ngắn
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.homeButton} onPress={handleViewPendingOrders}>
                  <Text style={styles.buttonText}>Xem trạng thái đơn hàng</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.homeButton, { marginTop: 10 }]}
                  onPress={() => navigation.navigate('HomeTabs')}
                >
                  <Text style={styles.buttonText}>Về trang chủ</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default CheckOutScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#ddd' },
  title: { fontSize: 20, fontWeight: 'bold' },
  content: { flex: 1 },
  section: { paddingHorizontal: 16, marginTop: 12, marginBottom: 6 },
  label: { fontSize: 14, marginBottom: 8, fontWeight: '600' },
  locationBox: { flexDirection: 'row', padding: 12, borderWidth: 1, borderColor: '#ddd', borderRadius: 10, alignItems: 'center', gap: 10 },
  locationTitle: { fontWeight: 'bold' },
  locationText: { fontSize: 12, color: '#444' },
  changeText: { color: '#6366F1', fontWeight: 'bold' },
  methodBox: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#ddd', borderRadius: 10, padding: 12, marginBottom: 10, gap: 12 },
  methodSelected: { borderColor: '#6366F1', backgroundColor: '#F3F4F6' },
  radioCircle: { width: 20, height: 20, borderRadius: 10, borderWidth: 2, borderColor: '#6366F1', justifyContent: 'center', alignItems: 'center' },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#6366F1' },
  methodLabel: { fontWeight: 'bold' },
  methodDesc: { fontSize: 12, color: '#666' },
  summary: { padding: 16, backgroundColor: '#fff', borderTopWidth: 1, borderColor: '#eee' },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  footerLabel: { fontSize: 14, color: '#555' },
  footerValue: { fontSize: 14, color: '#000' },
  checkoutButton: { marginTop: 16, backgroundColor: '#6366F1', paddingVertical: 12, borderRadius: 12, alignItems: 'center' },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  successContainer: { flex: 0, justifyContent: 'center', alignItems: 'center', height: '33%' },
  successBox: { alignItems: 'center', padding: 20, backgroundColor: '#fff', borderRadius: 10 },
  successText: { fontSize: 20, fontWeight: 'bold', color: '#28a745', marginVertical: 10 },
  successNote: { fontSize: 14, color: '#555', textAlign: 'center' },
  buttonContainer: { alignItems: 'center', width: '100%', marginTop: 10 },
  homeButton: { backgroundColor: '#6366F1', paddingVertical: 10, borderRadius: 8, alignItems: 'center', paddingHorizontal: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  blur: { opacity: 0.3 },
  itemBox: { flexDirection: 'row', alignItems: 'center', padding: 10, borderWidth: 1, borderColor: '#ddd', borderRadius: 10, marginBottom: 10 },
  itemImage: { width: 60, height: 60, borderRadius: 8, resizeMode: 'cover' },
  itemName: { fontWeight: '600', fontSize: 16 },
  itemQty: { fontSize: 14, color: '#555' },
  itemPrice: { fontSize: 14, fontWeight: 'bold', marginTop: 2 },
});
