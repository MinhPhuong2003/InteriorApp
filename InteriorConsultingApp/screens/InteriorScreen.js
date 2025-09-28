import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const interiorDesigns = [
  {
    id: '1',
    name: 'Phòng khách hiện đại',
    image: require('../assets/nhamau1.jpg'),
    detail: 'Không gian mở với tông màu trung tính và nội thất tối giản.',
  },
  {
    id: '2',
    name: 'Phòng ngủ tối giản',
    image: require('../assets/nhamau2.jpg'),
    detail: 'Thiết kế nhẹ nhàng với ánh sáng tự nhiên và vật liệu thân thiện.',
  },
  {
    id: '3',
    name: 'Phòng bếp cổ điển',
    image: require('../assets/nhamau2.jpg'),
    detail: 'Thiết kế nhẹ nhàng với ánh sáng tự nhiên và vật liệu thân thiện.',
  },
  {
    id: '4',
    name: 'Phòng khách cổ điển',
    image: require('../assets/nhamau2.jpg'),
    detail: 'Thiết kế nhẹ nhàng với ánh sáng tự nhiên và vật liệu thân thiện.',
  },
];

const houseDesigns = [
  {
    id: '5',
    name: 'Bếp Bắc Âu',
    image: require('../assets/nhamau1.jpg'),
    detail: 'Phong cách Bắc Âu nhẹ nhàng, gỗ sáng màu, kết hợp với nội thất trắng.',
  },
  {
    id: '6',
    name: 'Văn phòng sang trọng',
    image: require('../assets/nhamau1.jpg'),
    detail: 'Không gian làm việc chuyên nghiệp, kết hợp giữa ánh sáng vàng và vật liệu gỗ.',
  },
  {
    id: '7',
    name: 'Phòng trẻ em năng động',
    image: require('../assets/nhamau1.jpg'),
    detail: 'Màu sắc tươi sáng, có khu vui chơi và góc học tập cho trẻ.',
  },
  {
    id: '8',
    name: '2 phòng ngủ',
    image: require('../assets/nhamau1.jpg'),
    detail: 'Màu sắc tươi sáng, có khu vui chơi và góc học tập cho trẻ.',
  },
];

const InteriorScreen = () => {
  const navigation = useNavigation();
  const [category, setCategory] = useState('interior');
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const designs = category === 'interior' ? interiorDesigns : houseDesigns;

  const filteredDesigns = designs.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useFocusEffect(
    useCallback(() => {
      setSelectedTitle(null);
    }, [])
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        setSelectedTitle(item.name);
        navigation.navigate('InteriorDetail', {
          image: item.image,
          name: item.name,
          detail: item.detail,
        });
      }}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  const getDefaultTitle = () => {
    return category === 'interior' ? 'THIẾT KẾ NỘI THẤT' : 'THIẾT KẾ NHÀ MẪU';
  };

  return (
    <View style={styles.container}>
      {/* Thanh tìm kiếm */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          placeholder="Tìm kiếm..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />
      </View>

      {/* Tip design */}
      <View style={styles.tipBox}>
        <Text style={styles.tipText}>
          💡 Mẹo: Ưu tiên sử dụng ánh sáng tự nhiên và màu trung tính để làm nổi bật nội thất!
        </Text>
      </View>

      {/* Tiêu đề */}
      <Text style={styles.headerTitle}>
        {selectedTitle ? selectedTitle.toUpperCase() : getDefaultTitle()}
      </Text>
      <Text style={styles.subTitle}>
        Khám phá những ý tưởng thiết kế giúp không gian của bạn trở nên tinh tế và hiện đại hơn.
      </Text>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, category === 'interior' && styles.activeTab]}
          onPress={() => {
            setCategory('interior');
            setSelectedTitle(null);
            setSearchQuery('');
          }}
        >
          <Text style={category === 'interior' ? styles.activeTabText : styles.tabText}>
            Thiết kế nội thất
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, category === 'house' && styles.activeTab]}
          onPress={() => {
            setCategory('house');
            setSelectedTitle(null);
            setSearchQuery('');
          }}
        >
          <Text style={category === 'house' ? styles.activeTabText : styles.tabText}>
            Thiết kế nhà mẫu
          </Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách thiết kế */}
      <FlatList
        data={filteredDesigns}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const { width } = Dimensions.get('window');
const itemWidth = width / 2 - 20;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 50,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },

  tipBox: {
    backgroundColor: '#e7f5f1',
    marginHorizontal: 10,
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#2D6B60',
  },
  tipText: {
    fontSize: 13,
    color: '#2D6B60',
    fontStyle: 'italic',
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 10,
    color: '#2D6B60',
    textTransform: 'uppercase',
  },
  subTitle: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 20,
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: '#eee',
  },
  activeTab: {
    backgroundColor: '#2D6B60',
  },
  tabText: {
    color: '#555',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },

  list: { padding: 10 },
  itemContainer: {
    width: itemWidth,
    margin: 5,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
    padding: 10,
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  name: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default InteriorScreen;
