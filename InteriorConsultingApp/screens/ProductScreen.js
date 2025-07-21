import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');
const productWidth = width / 2 - 24;

const banners = [
  require('../assets/slider.png'),
  require('../assets/slider1.png'),
  require('../assets/slider2.jpg'),
];

const categories = [
  { id: '1', icon: 'bed-outline', label: 'Giường' },
  { id: '2', icon: 'cube-outline', label: 'Tủ' },
  { id: '3', icon: 'tv-outline', label: 'Kệ TV' },
  { id: '4', icon: 'restaurant-outline', label: 'Tủ bếp' },
  { id: '5', icon: 'desktop-outline', label: 'Bàn' },
  { id: '6', icon: 'person-outline', label: 'Ghế' },
];

const allProducts = [
  { id: 'p1', name: 'Giường gỗ sồi', price: '4.500.000₫', category: 'Giường', image: require('../assets/slider.png') },
  { id: 'p2', name: 'Tủ quần áo 3 cánh', price: '3.900.000₫', category: 'Tủ', image: require('../assets/bobanan.jpg') },
  { id: 'p3', name: 'Kệ TV treo tường', price: '2.800.000₫', category: 'Kệ TV', image: require('../assets/bobanan.jpg') },
  { id: 'p4', name: 'Tủ bếp hiện đại', price: '5.500.000₫', category: 'Tủ bếp', image: require('../assets/bobanan.jpg') },
  { id: 'p5', name: 'Bàn làm việc gỗ', price: '3.500.000₫', category: 'Bàn', image: require('../assets/bobanan.jpg') },
  { id: 'p6', name: 'Ghế văn phòng', price: '1.800.000₫', category: 'Ghế', image: require('../assets/bobanan.jpg') },
];

const bestSellingProducts = [
  { id: 'b1', name: 'Giường ngủ hiện đại', price: '4.200.000₫', image: require('../assets/bobanan.jpg') },
  { id: 'b2', name: 'Bàn học gỗ tự nhiên', price: '2.600.000₫', image: require('../assets/bobanan.jpg') },
  { id: 'b3', name: 'Tủ gỗ 4 ngăn', price: '3.100.000₫', image: require('../assets/bobanan.jpg') },
];

const ProductScreen = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const flatListRef = useRef();

  const filteredProducts = allProducts.filter((p) =>
    (selectedCategory ? p.category === selectedCategory : true) &&
    p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentBannerIndex + 1) % banners.length;
      setCurrentBannerIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);

    return () => clearInterval(timer);
  }, [currentBannerIndex]);

  const renderBanner = ({ item }) => (
    <Image source={item} style={styles.bannerImage} />
  );

  const renderBestSellingProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.bestProductItem}
      onPress={() =>
        navigation.navigate('ProductDetail', {
          name: item.name,
          price: item.price,
          image: item.image,
          description: 'Đây là sản phẩm bán chạy với thiết kế tối ưu và chất lượng đảm bảo.',
        })
      }>
      <Image source={item.image} style={styles.bestProductImage} />
      <Text style={styles.bestProductName}>{item.name}</Text>
      <Text style={styles.bestProductPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.label && styles.categoryItemActive,
      ]}
      onPress={() =>
        setSelectedCategory(selectedCategory === item.label ? null : item.label)
      }>
      <View style={styles.iconWrapper}>
        <Icon name={item.icon} size={24} color="#F79B34" />
      </View>
      <Text style={styles.categoryLabel}>{item.label}</Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }) => (
  <View style={styles.productItem}>
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ProductDetail', {
          name: item.name,
          price: item.price,
          image: item.image,
          description: 'Đây là mô tả chi tiết sản phẩm. Chất liệu tốt, độ bền cao, thiết kế hiện đại phù hợp mọi không gian.'
        })
      }
    >
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>

    <TouchableOpacity
      style={styles.addToCartButton}
      onPress={() => console.log('Thêm vào giỏ:', item.name)}
    >
      <Icon name="cart-outline" size={18} color="#fff" style={{ marginRight: 6 }} />
      <Text style={styles.addToCartText}>Thêm vào giỏ</Text>
    </TouchableOpacity>
  </View>
);


  return (
    <ScrollView style={styles.container}>
      {/* Banner */}
      <View style={styles.bannerContainer}>
        <FlatList
          data={banners}
          renderItem={renderBanner}
          keyExtractor={(item, index) => index.toString()}
          horizontal
          pagingEnabled
          ref={flatListRef}
          scrollEnabled={false}
        />
        <TouchableOpacity
          style={styles.arrowLeft}
          onPress={() => {
            const prevIndex = (currentBannerIndex - 1 + banners.length) % banners.length;
            setCurrentBannerIndex(prevIndex);
            flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
          }}>
          <Icon name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.arrowRight}
          onPress={() => {
            const nextIndex = (currentBannerIndex + 1) % banners.length;
            setCurrentBannerIndex(nextIndex);
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
          }}>
          <Icon name="chevron-forward" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>DANH MỤC SẢN PHẨM</Text>

      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />

      {/* Thanh tìm kiếm nằm trên tiêu đề SẢN PHẨM NỔI BẬT */}
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={24} color="#999" style={styles.searchIcon} />
        <TextInput
          placeholder="Tìm kiếm sản phẩm..."
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <Text style={styles.title}>SẢN PHẨM</Text>

      <FlatList
        data={allProducts}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        scrollEnabled={false}
        contentContainerStyle={styles.productList}
      />

      {/* ✅ SẢN PHẨM BÁN CHẠY */}
      <Text style={styles.title}>SẢN PHẨM BÁN CHẠY</Text>
      <FlatList
        data={bestSellingProducts}
        renderItem={renderBestSellingProduct}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.bestSellingList}
      />

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerContainer: {
    position: 'relative',
    height: 180,
  },
  bannerImage: {
    width,
    height: 180,
    resizeMode: 'cover',
  },
  arrowLeft: {
    position: 'absolute',
    top: '40%',
    left: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 5,
    zIndex: 1,
  },
  arrowRight: {
    position: 'absolute',
    top: '40%',
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 20,
    padding: 5,
    zIndex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  categoryList: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 2,
    width: 60,
  },
  categoryItemActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#F79B34',
  },
  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff3e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  categoryLabel: {
    fontSize: 13,
    color: '#333',
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    marginHorizontal: 16,
    borderRadius: 16,
    paddingHorizontal: 12,
    marginBottom: 4,
    height: 50,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 10,
  },
  productList: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  productItem: {
    width: productWidth,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    margin: 8,
    padding: 10,
    alignItems: 'stretch',
  },
  productImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  productName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#e91e63',
    marginTop: 4,
    textAlign: 'center',
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F79B34',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginTop: 8,
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  bestSellingList: {
    paddingLeft: 16,
    paddingBottom: 30,
  },
  bestProductItem: {
    backgroundColor: '#fff8f0',
    borderRadius: 10,
    marginRight: 12,
    width: 140,
    padding: 10,
    alignItems: 'center',
  },
  bestProductImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
  },
  bestProductName: {
    fontSize: 13,
    fontWeight: '500',
    marginTop: 6,
    textAlign: 'center',
  },
  bestProductPrice: {
    fontSize: 13,
    color: '#F79B34',
    marginTop: 4,
  },
});

export default ProductScreen;
