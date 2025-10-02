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
import firestore from '@react-native-firebase/firestore';

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

const ProductScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  const flatListRef = useRef();

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('products')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(list);
      });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentBannerIndex + 1) % banners.length;
      setCurrentBannerIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);
    return () => clearInterval(timer);
  }, [currentBannerIndex]);

  const filteredProducts = products.filter(
    p =>
      (!selectedCategory || p.category === selectedCategory) &&
      p.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderBanner = ({ item }) => (
    <Image source={item} style={styles.bannerImage} />
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item.label && styles.categoryItemActive,
      ]}
      onPress={() =>
        setSelectedCategory(selectedCategory === item.label ? null : item.label)
      }
    >
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
            ...item,
          })
        }
      >
        <Image
          source={{ uri: item.image }}
          style={styles.productImage}
        />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}₫</Text>
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
          }}
        >
          <Icon name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.arrowRight}
          onPress={() => {
            const nextIndex = (currentBannerIndex + 1) % banners.length;
            setCurrentBannerIndex(nextIndex);
            flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
          }}
        >
          <Icon name="chevron-forward" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Danh mục */}
      <Text style={styles.title}>DANH MỤC SẢN PHẨM</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      />

      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <Icon name="search-outline" size={24} color="#999" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="Tìm kiếm sản phẩm..."
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      {/* Sản phẩm */}
      <FlatList
        data={filteredProducts}
        renderItem={renderProduct}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        scrollEnabled={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  bannerContainer: { position: 'relative', height: 180 },
  bannerImage: { width, height: 180, resizeMode: 'cover' },
  arrowLeft: {
    position: 'absolute', top: '40%', left: 10,
    backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 20, padding: 5, zIndex: 1,
  },
  arrowRight: {
    position: 'absolute', top: '40%', right: 10,
    backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 20, padding: 5, zIndex: 1,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginTop: 12, marginBottom: 4, textAlign: 'center' },
  categoryList: { paddingHorizontal: 16, paddingBottom: 10 },
  categoryItem: { alignItems: 'center', marginRight: 2, width: 60 },
  categoryItemActive: { borderBottomWidth: 2, borderBottomColor: '#F79B34' },
  iconWrapper: {
    width: 50, height: 50, borderRadius: 25,
    backgroundColor: '#fff3e8', justifyContent: 'center', alignItems: 'center', marginBottom: 6,
  },
  categoryLabel: { fontSize: 13, color: '#333', textAlign: 'center' },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#f0f0f0',
    marginHorizontal: 16, borderRadius: 16, paddingHorizontal: 12, marginBottom: 10, height: 50,
  },
  searchInput: { flex: 1, fontSize: 16 },
  productList: { alignItems: 'center', paddingBottom: 20 },
  productItem: { width: productWidth, backgroundColor: '#f9f9f9', borderRadius: 10, margin: 8, padding: 10, alignItems: 'stretch' },
  productImage: { width: '100%', height: 100, borderRadius: 8, resizeMode: 'cover' },
  productName: { marginTop: 8, fontSize: 14, fontWeight: '500', textAlign: 'center' },
  productPrice: { fontSize: 14, color: '#e91e63', marginTop: 4, textAlign: 'center' },
  addToCartButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F79B34', paddingVertical: 6, paddingHorizontal: 10, borderRadius: 6, marginTop: 8, justifyContent: 'center' },
  addToCartText: { color: '#fff', fontSize: 13, fontWeight: '600' },
});

export default ProductScreen;
