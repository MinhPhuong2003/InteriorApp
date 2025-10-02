import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

const categories = ['Giường', 'Tủ', 'Kệ TV', 'Tủ bếp', 'Bàn', 'Ghế'];

const EditProductScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price.toString());
  const [image, setImage] = useState(product.image);
  const [description, setDescription] = useState(product.description || '');
  const [category, setCategory] = useState(product.category || categories[0]);

  const selectImage = () => {
    launchImageLibrary({ mediaType: 'photo' }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
        Alert.alert('Lỗi', 'Không thể chọn hình ảnh');
      } else {
        const uri = response.assets[0].uri;
        setImage(uri);
      }
    });
  };

  const handleUpdateProduct = async () => {
    if (!name || !price || !description) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin sản phẩm');
      return;
    }

    try {
      await firestore().collection('products').doc(product.id).update({
        name,
        price: parseInt(price),
        image,
        description,
        category,
      });

      Alert.alert('Thành công', 'Sản phẩm đã được cập nhật', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert('Lỗi', 'Không thể cập nhật sản phẩm');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#fff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>SỬA SẢN PHẨM</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Form */}
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.label}>Tên sản phẩm:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nhập tên sản phẩm"
        />

        <Text style={styles.label}>Giá sản phẩm:</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Nhập giá sản phẩm"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Danh mục:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={category}
            onValueChange={setCategory}
            style={{ height: 50, width: '100%' }}
          >
            {categories.map(c => (
              <Picker.Item key={c} label={c} value={c} />
            ))}
          </Picker>
        </View>

        <Text style={styles.label}>Mô tả:</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Nhập mô tả sản phẩm"
          multiline
        />

        <Text style={styles.label}>Hình ảnh:</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={{ textAlign: 'center', marginTop: 5 }}>Chọn ảnh</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Nút cố định dưới */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleUpdateProduct}>
          <Text style={styles.buttonText}>CẬP NHẬT</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditProductScreen;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: { width: 40 },
  header: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  container: { flex: 1, padding: 20 },
  label: { marginTop: 10, fontSize: 16, fontWeight: 'bold' },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginTop: 5 },
  pickerWrapper: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginTop: 5 },
  imagePicker: { marginTop: 10, alignItems: 'center' },
  image: { width: 150, height: 150, borderRadius: 8, borderWidth: 1, borderColor: '#ccc' },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
