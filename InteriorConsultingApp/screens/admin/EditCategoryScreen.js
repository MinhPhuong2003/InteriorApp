import React, { useState } from "react";
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
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { launchImageLibrary } from "react-native-image-picker";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";

const EditCategoryScreen = ({ route, navigation }) => {
  const { category } = route.params;

  const [name, setName] = useState(category.name || "");
  const [description, setDescription] = useState(category.description || "");
  const [price, setPrice] = useState(category.price ? String(category.price) : "");
  const [type, setType] = useState(category.type || "interior");
  const [image, setImage] = useState(category.image || "");

  const selectImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorCode) {
        console.log("ImagePicker Error: ", response.errorMessage);
        Alert.alert("Lỗi", "Không thể chọn hình ảnh");
      } else {
        const uri = response.assets[0].uri;
        setImage(uri);
      }
    });
  };

  const handleUpdateCategory = async () => {
    if (!name || !price || !type) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin danh mục");
      return;
    }

    try {
      await firestore().collection("categories").doc(category.id).update({
        name,
        description,
        price: price ? parseFloat(price) : null,
        type,
        image,
      });

      Alert.alert("Thành công", "Danh mục đã được cập nhật", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Không thể cập nhật danh mục");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>SỬA DANH MỤC</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Tên */}
        <Text style={styles.label}>Tên:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Nhập tên danh mục"
        />

        {/* Mô tả */}
        <Text style={styles.label}>Mô tả:</Text>
        <TextInput
          style={[styles.input, { height: 100, textAlignVertical: "top" }]}
          value={description}
          onChangeText={setDescription}
          placeholder="Nhập mô tả danh mục"
          multiline
        />

        {/* Giá */}
        <Text style={styles.label}>Giá:</Text>
        <TextInput
          style={styles.input}
          value={price}
          onChangeText={setPrice}
          placeholder="Nhập giá"
          keyboardType="numeric"
        />

        {/* Loại */}
        <Text style={styles.label}>Loại:</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={type} onValueChange={(val) => setType(val)} style={{ flex: 1 }}>
            <Picker.Item label="Interior" value="interior" />
            <Picker.Item label="Model" value="model" />
          </Picker>
        </View>

        {/* Hình ảnh */}
        <Text style={styles.label}>Hình ảnh:</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.image} />
          ) : (
            <View style={[styles.image, { justifyContent: "center", alignItems: "center" }]}>
              <Text>Chọn hình ảnh</Text>
            </View>
          )}
          <Text style={{ textAlign: "center", marginTop: 5 }}>Thêm ảnh</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Nút cố định dưới */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleUpdateCategory}>
          <Text style={styles.buttonText}>CẬP NHẬT</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default EditCategoryScreen;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  backButton: { width: 40 },
  header: { fontSize: 20, fontWeight: "bold", color: "#333" },
  container: { flex: 1, padding: 20 },
  label: { marginTop: 10, fontSize: 16, fontWeight: "bold" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 5,
    marginBottom: 16,
    overflow: "hidden",
  },
  imagePicker: { marginTop: 10, alignItems: "center" },
  image: { width: 150, height: 150, borderRadius: 8, borderWidth: 1, borderColor: "#ccc" },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  button: { backgroundColor: "#28a745", padding: 15, borderRadius: 8, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
