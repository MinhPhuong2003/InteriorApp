import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import firestore from "@react-native-firebase/firestore";

const AdminCategoryScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("categories")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(data);
      });

    return () => unsubscribe();
  }, []);

  const handleDelete = item => {
      Alert.alert('Xác nhận', `Bạn chắc chắn muốn xóa "${item.name}"?`, [
        { text: 'Hủy' },
        {
          text: 'Xóa',
          onPress: async () => {
            await firestore().collection('categories').doc(item.id).delete();
          },
        },
      ]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => navigation.navigate("CategoryDetail", { category: item })}
    >
      <Image
        source={{ uri: item.image || "https://via.placeholder.com/100" }}
        style={styles.categoryImage}
      />

      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={styles.categoryText} numberOfLines={1} ellipsizeMode="tail">
          Tên: {item.name}
        </Text>
        {item.description ? (
          <Text style={styles.categoryText} numberOfLines={1} ellipsizeMode="tail">
            Mô tả: {item.description}
          </Text>
        ) : null}
        <Text style={styles.categoryText}>
          Giá: {item.price ? `${item.price.toLocaleString()} đ` : "Chưa có"}
        </Text>
        <Text style={styles.categoryText}>
          Loại: {item.type === "interior" ? "Nội thất" : "Nhà mẫu"}
        </Text>
      </View>

      <View style={styles.actions}>
        {/* Sửa → chuyển sang EditCategoryScreen */}
        <TouchableOpacity
          onPress={() => navigation.navigate("EditCategory", { category: item })}
          style={styles.actionButton}
        >
          <Ionicons name="create-outline" size={20} color="#4A90E2" />
        </TouchableOpacity>

        {/* Xóa */}
        <TouchableOpacity
          onPress={() => handleDelete(item)}
          style={styles.actionButton}
        >
          <Ionicons name="trash-outline" size={20} color="#E53935" />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>QUẢN LÝ NỘI THẤT</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("AddCategory")}
          style={styles.addButton}
        >
          <Ionicons name="add-circle-outline" size={28} color="#4A90E2" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
};

export default AdminCategoryScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: { padding: 4 },
  addButton: { padding: 4 },
  header: { fontSize: 20, fontWeight: "bold", color: "#333" },

  categoryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
    marginTop: 2,
  },
  actions: { flexDirection: "row" },
  actionButton: { marginLeft: 10 },
});
