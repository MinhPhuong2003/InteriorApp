import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Ionicons";
import { launchImageLibrary } from "react-native-image-picker";

const AddCategoryScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("interior");
  const [image, setImage] = useState("https://via.placeholder.com/150");
  const [style, setStyle] = useState("");
  const [usageRecommendation, setUsageRecommendation] = useState("");

  const selectImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (response.didCancel) {
        console.log("Người dùng đã hủy chọn ảnh");
      } else if (response.errorCode) {
        console.log("Lỗi ImagePicker: ", response.errorMessage);
        Alert.alert("Lỗi", "Không thể chọn hình ảnh");
      } else {
        const uri = response.assets[0].uri;
        setImage(uri);
      }
    });
  };

  const handleAddCategory = async () => {
    if (!name.trim()) {
      Alert.alert("Lỗi", "Vui lòng nhập tên danh mục!");
      return;
    }

    try {
      await firestore().collection("categories").add({
        name,
        description,
        type,
        image,
        style,
        usageRecommendation,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert(
        "Thêm thành công",
        "Đã thêm mẫu mới!",
        [
          {
            text: "OK",
            onPress: () => navigation.goBack(),
          },
        ],
        { cancelable: false }
      );
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Không thể thêm danh mục.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>THÊM NỘI THẤT</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Form */}
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text style={styles.label}>Tên danh mục:</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập tên danh mục..."
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Mô tả:</Text>
        <TextInput
          style={[styles.input, { height: 80, textAlignVertical: "top" }]}
          placeholder="Nhập mô tả..."
          value={description}
          onChangeText={setDescription}
          multiline
        />

        <Text style={styles.label}>Loại danh mục:</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={type}
            onValueChange={(itemValue) => setType(itemValue)}
          >
            <Picker.Item label="Thiết kế nội thất" value="interior" />
            <Picker.Item label="Nhà mẫu" value="model" />
          </Picker>
        </View>

        <Text style={styles.label}>Phong cách thiết kế:</Text>
        <TextInput
          style={[styles.input, { height: 80, textAlignVertical: "top" }]}
          placeholder="Nhập phong cách (ví dụ: Minimalism, Scandinavian)..."
          value={style}
          onChangeText={setStyle}
          multiline
        />

        <Text style={styles.label}>Khuyến nghị sử dụng:</Text>
        <TextInput
          style={[styles.input, { height: 80, textAlignVertical: "top" }]}
          placeholder="Nhập khuyến nghị sử dụng..."
          value={usageRecommendation}
          onChangeText={setUsageRecommendation}
          multiline
        />

        <Text style={styles.label}>Hình ảnh:</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
          <Image source={{ uri: image }} style={styles.image} />
          <Text style={{ textAlign: "center", marginTop: 5 }}>Chọn ảnh</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleAddCategory}>
          <Text style={styles.buttonText}>THÊM NỘI THẤT</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default AddCategoryScreen;

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
  backButton: {
    width: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 5,
  },
  imagePicker: {
    marginTop: 10,
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
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
  button: {
    backgroundColor: "#4A44F2",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});