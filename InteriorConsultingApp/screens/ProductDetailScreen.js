import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CartContext } from '../context/CartContext';

const formatPrice = (value) => {
  if (!value) return '';
  return new Intl.NumberFormat('vi-VN').format(Number(value)) + 'đ';
};

const ProductDetailScreen = ({ route, navigation }) => {
  const { name, price, image, description, id } = route.params || {};
  const { addToCart, totalQuantity } = useContext(CartContext);
  console.log('Route params:', route.params);
  console.log('addToCart function:', addToCart);
  console.log('Total Quantity:', totalQuantity);

  const handleAddToCart = () => {
    if (!addToCart) {
      console.error('addToCart is undefined. Check CartContext.');
      return;
    }
    const product = { id: id || Date.now().toString(), name, price, image, description };
    console.log('Adding product to cart:', product);
    addToCart(product);
  };

  const handleViewCart = () => {
    navigation.navigate('Cart');
  };

  if (!name || !price || !image || !description) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Dữ liệu sản phẩm không hợp lệ!</Text>
      </View>
    );
  }

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

        <TouchableOpacity onPress={handleViewCart}>
          <View style={{ position: 'relative' }}>
            <Icon name="cart-outline" size={24} color="#000" />
            {totalQuantity > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>
                  {totalQuantity > 9 ? '9+' : totalQuantity}
                </Text>
              </View>
            )}
          </View>
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
        onPress={handleAddToCart}
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
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  badge: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});