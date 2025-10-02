import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const InteriorDetailScreen = ({ navigation, route }) => {
  const { name, image, detail } = route.params;

  const relatedProducts = [
    { id: '1', name: 'Phòng ngủ gỗ óc chó', image: require('../assets/nhamau1.jpg') },
    { id: '2', name: 'Tủ bếp hiện đại', image: require('../assets/nhamau1.jpg') },
    { id: '3', name: 'Phòng khách phong cách Bắc Âu', image: require('../assets/nhamau1.jpg') },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>THÔNG TIN CHI TIẾT</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Ảnh chính từ Firestore (URL) */}
      <Image
        source={typeof image === 'string' ? { uri: image } : image}
        style={styles.image}
      />

      {/* Tiêu đề */}
      <Text style={styles.title}>{name}</Text>

      {/* Mô tả chi tiết */}
      <Text style={styles.description}>{detail}</Text>

      {/* Đánh giá */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Đánh giá:</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
          {[1, 2, 3, 4, 5].map((_, i) => (
            <Icon key={i} name="star" size={20} color="#FFD700" />
          ))}
          <Text style={{ marginLeft: 8 }}>(4.8/5)</Text>
        </View>
        <Text style={styles.infoText}>"Thiết kế rất tinh tế và sang trọng!" - Khách hàng A</Text>
      </View>

      {/* Bộ sưu tập ảnh nhỏ */}
      <View style={{ marginBottom: 24 }}>
        <Text style={styles.infoTitle}>Hình ảnh khác:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[require('../assets/nhamau1.jpg'), require('../assets/nhamau1.jpg'), require('../assets/nhamau1.jpg')].map((img, index) => (
            <Image key={index} source={img} style={styles.thumbnail} />
          ))}
        </ScrollView>
      </View>

      {/* Gợi ý sản phẩm liên quan */}
      <View style={{ marginBottom: 24 }}>
        <Text style={styles.infoTitle}>Thiết kế liên quan:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {relatedProducts.map((item) => (
            <TouchableOpacity key={item.id} style={styles.relatedItem}>
              <Image source={item.image} style={styles.relatedImage} />
              <Text style={styles.relatedText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Nút Booking */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Booking')}
      >
        <View style={styles.buttonContent}>
          <Icon name="calendar-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.buttonText}>ĐẶT LỊCH TƯ VẤN</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default InteriorDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 16, paddingTop: 16 },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerTitle: { fontSize: 16, fontWeight: '500', textAlign: 'center' },
  image: { width: '100%', height: 220, borderRadius: 12, marginBottom: 16 },
  title: { fontSize: 18, fontWeight: '600', marginBottom: 6 },
  description: { fontSize: 14, color: '#444', marginBottom: 16 },
  infoBox: {
    backgroundColor: '#F2F2F2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  infoTitle: { fontSize: 15, fontWeight: '600', marginBottom: 6 },
  infoText: { fontSize: 13, color: '#333', lineHeight: 20 },
  thumbnail: { width: 100, height: 80, borderRadius: 8, marginRight: 10 },
  relatedItem: { marginRight: 12, alignItems: 'center', width: 100 },
  relatedImage: { width: 100, height: 80, borderRadius: 8 },
  relatedText: { fontSize: 12, marginTop: 4, textAlign: 'center' },
  button: {
    backgroundColor: '#2D6B60',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 15 },
  buttonContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
});
