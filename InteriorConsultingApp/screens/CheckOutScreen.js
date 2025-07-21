import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CheckOutScreen = ({ navigation, route }) => {
  const { totalPrice } = route.params || { totalPrice: 0 };
  const shippingFee = 49900;
  const grandTotal = totalPrice + shippingFee;

  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={[styles.header, isPaymentSuccessful && styles.blur]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>THANH TOÁN</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: isPaymentSuccessful ? 0 : 200 }}>
        <View style={[styles.content, isPaymentSuccessful && styles.blur]}>
          {/* Địa chỉ giao hàng */}
          <View style={styles.section}>
            <Text style={styles.label}>Địa chỉ giao hàng</Text>
            <View style={styles.locationBox}>
              <Ionicons name="location-outline" size={20} color="#000" />
              <View style={{ flex: 1 }}>
                <Text style={styles.locationTitle}>Prince Garden</Text>
                <Text style={styles.locationText}>
                  Đường Nelson, số 3, gần trường Don Bosco, Chennai - 12
                </Text>
              </View>
              <TouchableOpacity>
                <Text style={styles.changeText}>Thay đổi</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Phương thức thanh toán */}
          <View style={styles.section}>
            <Text style={styles.label}>Phương thức thanh toán</Text>

            {[
              { key: 'cod', label: 'Thanh toán khi nhận hàng', desc: 'Trả tiền mặt hoặc UPI khi nhận hàng' },
              { key: 'card', label: 'Thẻ tín dụng/ghi nợ', desc: 'Thanh toán bằng thẻ tín dụng hoặc thẻ ghi nợ' },
            ].map(method => (
              <TouchableOpacity
                key={method.key}
                onPress={() => setPaymentMethod(method.key)}
                style={[
                  styles.methodBox,
                  paymentMethod === method.key && styles.methodSelected
                ]}
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

      {/* Tóm tắt đơn hàng và phần xác nhận */}
      <View style={styles.summary}>
        {!isPaymentSuccessful && (
          <>
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
              <Text style={[styles.footerValue, { fontWeight: 'bold' }]}>
                {grandTotal.toLocaleString()} đ
              </Text>
            </View>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => setIsPaymentSuccessful(true)}
            >
              <Text style={styles.checkoutText}>Xác nhận đơn hàng</Text>
            </TouchableOpacity>
          </>
        )}
        {isPaymentSuccessful && (
          <View style={styles.successContainer}>
            <View style={styles.successBox}>
              <Ionicons name="checkmark-circle" size={60} color="#28a745" />
              <Text style={styles.successText}>Thanh toán của bạn đã thành công</Text>
              <Text style={styles.successNote}>
                Chúng tôi sẽ liên hệ với bạn để cung cấp thêm chi tiết trong thời gian ngắn
              </Text>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate('HomeTabs')}>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  content: { flex: 1 },
  section: { paddingHorizontal: 16, marginTop: 12, marginBottom: 6 },
  label: { fontSize: 14, marginBottom: 8, fontWeight: '600' },
  locationBox: {
    flexDirection: 'row',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    alignItems: 'center',
    gap: 10,
  },
  locationTitle: { fontWeight: 'bold' },
  locationText: { fontSize: 12, color: '#444' },
  changeText: { color: '#6366F1', fontWeight: 'bold' },
  methodBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    gap: 12,
  },
  methodSelected: { borderColor: '#6366F1', backgroundColor: '#F3F4F6' },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#6366F1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#6366F1' },
  methodLabel: { fontWeight: 'bold' },
  methodDesc: { fontSize: 12, color: '#666' },
  summary: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  footerLabel: { fontSize: 14, color: '#555' },
  footerValue: { fontSize: 14, color: '#000' },
  checkoutButton: {
    marginTop: 16,
    backgroundColor: '#6366F1',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  successContainer: { flex: 0, justifyContent: 'center', alignItems: 'center', height: '33%' }, // 1/3 màn hình
  successBox: { alignItems: 'center', padding: 20, backgroundColor: '#fff', borderRadius: 10 },
  successText: { fontSize: 20, fontWeight: 'bold', color: '#28a745', marginVertical: 10 },
  successNote: { fontSize: 14, color: '#555', textAlign: 'center' },
  buttonContainer: { alignItems: 'center', width: '100%', marginTop: 10 },
  homeButton: { backgroundColor: '#6366F1', paddingVertical: 10, borderRadius: 8, alignItems: 'center', paddingHorizontal: 20 },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  blur: { opacity: 0.3 },
});