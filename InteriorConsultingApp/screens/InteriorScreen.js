import React, { useState, useCallback, useEffect } from 'react';
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
import firestore from '@react-native-firebase/firestore';

const InteriorScreen = () => {
  const navigation = useNavigation();
  const [category, setCategory] = useState('interior');
  const [designs, setDesigns] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTitle, setSelectedTitle] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('categories')
      .orderBy('createdAt', 'desc')
      .onSnapshot(snapshot => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setDesigns(data);
      });
    return () => unsubscribe();
  }, []);

  useFocusEffect(
    useCallback(() => {
      setSelectedTitle(null);
    }, [])
  );

  const filteredDesigns = designs
    .filter(item => item.type === category)
    .filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => {
        setSelectedTitle(item.name);
        navigation.navigate('InteriorDetail', {
          image: item.image, 
          name: item.name,
          detail: item.detail || 'Không có mô tả chi tiết',
        });
      }}
    >
      <Image
        source={item.image ? { uri: item.image } : require('../assets/nhamau1.jpg')}
        style={styles.image}
      />
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

      {/* Tip */}
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
          style={[styles.tab, category === 'model' && styles.activeTab]}
          onPress={() => {
            setCategory('model');
            setSelectedTitle(null);
            setSearchQuery('');
          }}
        >
          <Text style={category === 'model' ? styles.activeTabText : styles.tabText}>
            Thiết kế nhà mẫu
          </Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách thiết kế */}
      <FlatList
        data={filteredDesigns}
        numColumns={2}
        renderItem={renderItem}
        keyExtractor={item => item.id}
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
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, fontSize: 14, color: '#333' },
  tipBox: {
    backgroundColor: '#e7f5f1',
    marginHorizontal: 10,
    marginTop: 10,
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#2D6B60',
  },
  tipText: { fontSize: 13, color: '#2D6B60', fontStyle: 'italic' },
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
  activeTab: { backgroundColor: '#2D6B60' },
  tabText: { color: '#555', fontWeight: '500' },
  activeTabText: { color: '#fff', fontWeight: '600' },
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
  image: { width: '100%', height: 120, borderRadius: 8, resizeMode: 'cover' },
  name: { marginTop: 8, fontSize: 14, fontWeight: '600', textAlign: 'center' },
});

export default InteriorScreen;
