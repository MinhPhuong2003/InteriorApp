import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const formatPrice = (value) => {
  if (!value) return '';
  return new Intl.NumberFormat('vi-VN').format(Number(value)) + 'đ';
};

const ProductDetailScreen = ({ route, navigation }) => {
  const { name, price, image, description } = route.params;

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={{ flexGrow: 1, padding: 16 }}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>CHI TIẾT SẢN PHẨM</Text>

        <TouchableOpacity onPress={() => console.log('Thêm vào giỏ hàng')}>
          <Icon name="cart-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Nội dung chính */}
      <View style={{ flex: 1 }}>
        <Image source={{ uri: image }} style={styles.image} />

        <View style={{ marginBottom: 12 }}>
          <Text style={styles.label}>
            Tên sản phẩm: <Text style={styles.value}>{name}</Text>
          </Text>

          <Text style={styles.label}>
            Giá: <Text style={styles.price}>{formatPrice(price)}</Text>
          </Text>

          <Text style={[styles.label, { marginBottom: 4 }]}>Mô tả:</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>

      {/* Nút Mua Ngay nằm cuối */}
      <TouchableOpacity
        style={styles.buyNowButton}
        onPress={() => console.log('Mua ngay')}
      >
        <Icon name="cart" size={20} color="#fff" style={{ marginRight: 8 }} />
        <Text style={styles.buyNowText}>MUA NGAY</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  price: {
    fontSize: 16,
    color: '#e91e63',
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  buyNowButton: {
    flexDirection: 'row',
    backgroundColor: '#2D6B60',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 6,
  },
  buyNowText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 15,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 6,
  },
  value: {
    fontWeight: '400',
    color: '#555',
  },
});
