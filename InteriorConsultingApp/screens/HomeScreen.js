import React, { useRef, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native'; // 👈 thêm dòng này

const { width } = Dimensions.get('window');

const featuredProducts = [
  {
    id: '1',
    name: 'Bộ tủ bếp gỗ sang trọng',
    price: '3.850.000đ',
    image: require('../assets/botubepgo.jpg'),
  },
  {
    id: '2',
    name: 'Bộ bàn ăn với ghế da',
    price: '8.300.000đ',
    image: require('../assets/bobanan.jpg'),
  },
  {
    id: '3',
    name: 'Bàn phấn thông minh',
    price: '8.500.000đ',
    image: require('../assets/banphanthongminh.jpg'),
  },
];

const banners = [
  { image: require('../assets/slider.png') },
  { image: require('../assets/slider1.png') },
  { image: require('../assets/slider2.jpg') },
];

const interiorDesigns = [
  {
    id: '1',
    name: 'Thiết Kế Nội Thất Chung Cư 2 Phòng Ngủ Với Tông Màu Trắng Và Gỗ Ván Ép',
    image: require('../assets/noithatgo.jpg'),
    detail: 'Thiết kế hiện đại với gam màu trắng chủ đạo kết hợp chất liệu gỗ ván ép, tạo nên không gian ấm cúng và sang trọng cho căn hộ 2 phòng ngủ.',
  },
  {
    id: '2',
    name: 'Thiết Kế Nội Thất 2 Phòng Ngủ Hiện Đại',
    image: require('../assets/noithat2phongngu.jpg'),
    detail: 'Không gian nội thất được tối ưu với hai phòng ngủ tiện nghi, sử dụng ánh sáng tự nhiên kết hợp nội thất đơn giản nhưng tinh tế.',
  },
  {
    id: '3',
    name: 'Thiết Kế Phòng Khách Và Bếp Với Tông Màu Nâu Đất Sang Trọng',
    image: require('../assets/thietkechungcu.jpg'),
    detail: 'Tông màu nâu đất chủ đạo mang lại cảm giác sang trọng và ấm áp cho không gian phòng khách và nhà bếp.',
  },
  {
    id: '4',
    name: 'Thiết Kế Nội Thất Nhà Bếp Hiện Đại',
    image: require('../assets/noithatnhabep.jpg'),
    detail: 'Thiết kế nhà bếp hiện đại với thiết bị thông minh, bố trí khoa học và sử dụng màu sắc trung tính tạo cảm giác sạch sẽ, tiện nghi.',
  },
];


const modelHouses = [
  {
    id: '1',
    name: 'Nhà Màu Trắng - Hồng Nhẹ',
    image: require('../assets/nhamau1.jpg'),
    detail: 'Thiết kế hài hòa giữa sắc trắng và hồng nhẹ mang đến không gian sống nữ tính, tươi sáng và thanh lịch.',
  },
  {
    id: '2',
    name: 'Mẫu Nhà 1 Trệt 1 Lầu',
    image: require('../assets/nhamau2.jpg'),
    detail: 'Thiết kế nhà 1 trệt 1 lầu hiện đại, tận dụng tối đa diện tích với bố trí thông minh và tối ưu công năng sử dụng.',
  },
  {
    id: '3',
    name: 'Thiết Kế Chung Cư Phòng Khách Và Nhà Bếp Với Tông Màu Nâu Đất Sang Trọng',
    image: require('../assets/noithat2phongngu.jpg'),
    detail: 'Thiết kế mở giữa phòng khách và nhà bếp, tông màu nâu đất tạo cảm giác sang trọng và ấm áp cho gia chủ.'
  },
  {
    id: '4',
    name: 'Nội thất nhà bếp',
    image: require('../assets/noithatnhabep.jpg'),
    detail: 'Nhà bếp hiện đại với thiết kế tinh tế, tủ bếp thông minh và bố cục hợp lý, tối ưu hoá không gian nấu nướng.'
  },
];


const HomeScreen = () => {
  const [bannerIndex, setBannerIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('interior');
  const flatListRef = useRef();
  const bannerIndexRef = useRef(0);
  const navigation = useNavigation(); // 👈 hook navigation

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (bannerIndexRef.current + 1) % banners.length;
      bannerIndexRef.current = nextIndex;
      setBannerIndex(nextIndex);
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    const prevIndex = bannerIndex === 0 ? banners.length - 1 : bannerIndex - 1;
    bannerIndexRef.current = prevIndex;
    setBannerIndex(prevIndex);
    flatListRef.current?.scrollToIndex({ index: prevIndex, animated: true });
  };

  const handleNext = () => {
    const nextIndex = (bannerIndex + 1) % banners.length;
    bannerIndexRef.current = nextIndex;
    setBannerIndex(nextIndex);
    flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true });
  };

  const renderDesignItems = (data) => (
  <View style={styles.designList}>
    {data.map((item) => (
      <TouchableOpacity
        key={item.id}
        style={styles.designItem}
        onPress={() => navigation.navigate('InteriorDetail', {
          name: item.name,
          image: item.image,
          detail: item.detail,
        })}
      >
        <Image source={item.image} style={styles.designImage} />
        <Text style={styles.designTitle}>{item.name}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.bannerContainer}>
        <FlatList
          data={banners}
          ref={flatListRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.banner}>
              <Image source={item.image} style={styles.bannerImage} />
              <View style={styles.bannerOverlay} />
            </View>
          )}
        />
        <TouchableOpacity style={[styles.navButton, { left: 10 }]} onPress={handlePrev}>
          <Icon name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton, { right: 10 }]} onPress={handleNext}>
          <Icon name="chevron-forward" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.centeredHeader}>THIẾT KẾ NỘI THẤT CHICHI</Text>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'interior' && styles.tabButtonActive]}
            onPress={() => setActiveTab('interior')}>
            <Text style={styles.tabButtonText}>THIẾT KẾ NỘI THẤT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'model' && styles.tabButtonActive]}
            onPress={() => setActiveTab('model')}>
            <Text style={styles.tabButtonText}>NHÀ MẪU</Text>
          </TouchableOpacity>
        </View>
        {renderDesignItems(activeTab === 'interior' ? interiorDesigns : modelHouses)}
      </View>

       <View style={styles.section}>
  <Text style={styles.centeredHeader}>SẢN PHẨM NỔI BẬT</Text>
  <FlatList
    data={featuredProducts}
    horizontal
    showsHorizontalScrollIndicator={false}
    renderItem={({ item }) => (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('ProductDetail', {
            name: item.name,
            image: item.image,
            price: item.price,
            description: 'Đây là mô tả chi tiết sản phẩm. Chất liệu tốt, độ bền cao, thiết kế hiện đại phù hợp mọi không gian.'
          })
        }
      >
        <View style={styles.productCard}>
          <Image source={item.image} style={styles.productImage} />
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{item.price}</Text>

          <TouchableOpacity
            style={styles.productButton}
            onPress={() =>
              navigation.navigate('ProductDetail', {
                name: item.name,
                image: item.image,
                price: item.price,
                description: 'Đây là mô tả chi tiết sản phẩm. Chất liệu tốt, độ bền cao, thiết kế hiện đại phù hợp mọi không gian.',
              })
            }
          >
            <Text style={styles.productButtonText}>Xem chi tiết</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    )}
    keyExtractor={(item) => item.id}
  />
</View>


      <View style={styles.footer}>
        <View style={styles.footerContainer}>
          <View style={styles.footerLeft}>
            <Text style={styles.footerTitle}>THIẾT KẾ NỘI THẤT CHICHI</Text>
            <Text style={styles.footerSubText}>
              Chichi Decor vôi thiệu đến bạn những không gian sống tiện nghi, hiện đại, tối ưu hóa công năng sử dụng. Đến với Chichi bạn sẽ được trải nghiệm không gian sống tiện nghi, hiện đại, tối ưu hóa công năng sử dụng, phù hợp với nhu cầu và gu thẩm mỹ của bạn.
            </Text>
          </View>
          <View style={styles.footerRight}>
            <View style={styles.footerServices}>
              <Text style={styles.footerTitle}>DỊCH VỤ</Text>
              <View style={styles.serviceList}>
                <Text style={styles.serviceItem}>Thiết kế nội thất căn hộ</Text>
                <Text style={styles.serviceItem}>Thiết kế nội thất biệt thự</Text>
                <Text style={styles.serviceItem}>Thiết kế nội thất nhà phố</Text>
              </View>
            </View>
            <View style={styles.footerIcons}>
              <TouchableOpacity>
                <Icon name="logo-facebook" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="logo-youtube" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="logo-instagram" size={24} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="logo-twitter" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  bannerContainer: { height: 200, marginBottom: 16, position: 'relative' },
  banner: { width: width, height: 200 },
  bannerImage: { width: '100%', height: '100%', borderRadius: 8 },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  navButton: {
    position: 'absolute',
    top: '50%',
    transform: [{ translateY: -14 }],
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 6,
    borderRadius: 20,
    zIndex: 10,
  },

  section: { paddingHorizontal: 16, marginBottom: 5 },

  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#ccc',
  },
  tabButtonText: {
    fontWeight: 'bold',
  },

  designList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  designItem: {
    width: (width - 48) / 2,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 12,
    overflow: 'hidden',
  },
  designImage: {
    width: '100%',
    height: 100,
  },
  designTitle: {
    fontSize: 13,
    fontWeight: '600',
    padding: 8,
    textAlign: 'center',
    textAlignVertical: 'center',
  },

  productCard: {
    width: 160,
    marginRight: 12,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-between',
    height: 240,
  },
  productImage: { width: '100%', height: 100, borderRadius: 8 },
  productName: {
    fontWeight: '600',
    marginTop: 8,
    height: 40,
  },
  productPrice: {
    color: '#000',
    marginTop: 4,
  },
  productButton: {
    backgroundColor: '#000',
    paddingVertical: 6,
    borderRadius: 6,
    marginTop: 8,
  },
  productButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 13,
  },

  centeredHeader: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  footer: {
    padding: 16,
    backgroundColor: '#000',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerLeft: {
    flex: 1,
    paddingRight: 16,
  },
  footerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  footerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  footerSubText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
    textAlign: 'justify',
  },
  footerServices: {
    marginBottom: 8,
  },
  serviceList: {
    alignItems: 'flex-start',
  },
  serviceItem: {
    color: '#fff',
    fontSize: 14,
  },
  footerIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 16,
  },
});