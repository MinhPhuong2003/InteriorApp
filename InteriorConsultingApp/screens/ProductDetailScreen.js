import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const specifications = [
  { label: 'Chất liệu', value: 'Gỗ tự nhiên' },
  { label: 'Kích thước', value: '200 x 150 x 100 cm' },
  { label: 'Màu sắc', value: 'Nâu đậm' },
];

const otherImages = [
  require('../assets/nhamau1.jpg'),
  require('../assets/nhamau1.jpg'),
  require('../assets/nhamau1.jpg'),
];

const relatedProducts = [
  {
    id: '1',
    name: 'Bàn làm việc hiện đại',
    image: require('../assets/nhamau1.jpg'),
  },
  {
    id: '2',
    name: 'Kệ sách gỗ',
    image: require('../assets/nhamau1.jpg'),
  },
];

const ProductDetailScreen = ({ route, navigation }) => {
  const { name, price, image, description } = route.params;

  return (
    <ScrollView style={styles.container}>
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

      {/* Main Image */}
      <Image source={image} style={styles.image} />

      {/* Thông tin chính */}
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{price}</Text>
      <Text style={styles.description}>{description}</Text>

      {/* Thông số kỹ thuật */}
      <Text style={styles.sectionTitle}>Thông số kỹ thuật</Text>
      {specifications.map((item, index) => (
        <View key={index} style={styles.specRow}>
          <Text style={styles.specLabel}>{item.label}:</Text>
          <Text style={styles.specValue}>{item.value}</Text>
        </View>
      ))}

      {/* Đánh giá */}
      <Text style={styles.sectionTitle}>Đánh giá</Text>
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Đánh giá:</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          {[1, 2, 3, 4, 5].map((_, i) => (
            <Icon key={i} name="star" size={20} color="#FFD700" />
          ))}
          <Text style={{ marginLeft: 8 }}>(4.8/5)</Text>
        </View>
        <Text style={styles.infoText}>"Sản phẩm đẹp, giao hàng nhanh!" - Khách hàng A</Text>
      </View>

      {/* Hình ảnh khác */}
      <Text style={styles.sectionTitle}>Hình ảnh khác</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.gallery}>
        {otherImages.map((img, index) => (
          <Image key={index} source={img} style={styles.thumbnail} />
        ))}
      </ScrollView>

      {/* Sản phẩm liên quan */}
      <Text style={styles.sectionTitle}>Sản phẩm liên quan</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {relatedProducts.map((item) => (
          <TouchableOpacity key={item.id} style={styles.relatedItem}>
            <Image source={item.image} style={styles.relatedImage} />
            <Text style={styles.relatedName}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Nút Mua Ngay */}
    <TouchableOpacity style={styles.buyNowButton} onPress={() => console.log('Mua ngay')}>
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
    padding: 16,
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
  name: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  price: {
    fontSize: 16,
    color: '#e91e63',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
  },
  specRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  specLabel: {
    fontWeight: '500',
    width: 100,
    color: '#555',
  },
  specValue: {
    color: '#333',
  },
  infoBox: {
    backgroundColor: '#F2F2F2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 20,
  },
  gallery: {
    marginBottom: 16,
  },
  thumbnail: {
    width: 100,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
  },
  relatedItem: {
    marginRight: 12,
    alignItems: 'center',
    width: 100,
  },
  relatedImage: {
    width: 100,
    height: 80,
    borderRadius: 8,
  },
  relatedName: {
    fontSize: 12,
    marginTop: 4,
    textAlign: 'center',
  },
  buyNowButton: {
  flexDirection: 'row',
  backgroundColor: '#2D6B60',
  paddingVertical: 14,
  borderRadius: 8,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 24,
  marginBottom: 32,
},
buyNowText: {
  color: '#fff',
  fontWeight: '600',
  fontSize: 15,
},

});
