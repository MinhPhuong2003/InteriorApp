import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import firestore from "@react-native-firebase/firestore";

const CategoryDetailScreen = ({ route, navigation }) => {
  const { category } = route.params;
  const [categoryData, setCategoryData] = useState(null);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("categories")
      .doc(category.id)
      .onSnapshot((doc) => {
        if (doc.exists) {
          setCategoryData({ id: doc.id, ...doc.data() });
        }
      });

    return () => unsubscribe();
  }, [category.id]);

  const handleDelete = () => {
    Alert.alert(
      "Xác nhận",
      `Bạn chắc chắn muốn xóa "${categoryData?.name}"?`,
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            try {
              await firestore().collection("categories").doc(category.id).delete();
              Alert.alert("Thành công", `Đã xóa "${categoryData?.name}"`, [
                { text: "OK", onPress: () => navigation.goBack() },
              ]);
            } catch (error) {
              console.error(error);
              Alert.alert("Lỗi", "Không thể xóa danh mục");
            }
          },
        },
      ]
    );
  };

  if (!categoryData) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Nội dung chi tiết */}
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.header}>Chi tiết danh mục</Text>
          <View style={{ width: 30 }} />
        </View>

        {/* Hình ảnh */}
        <Image
          source={{ uri: categoryData.image || "https://via.placeholder.com/200" }}
          style={styles.image}
        />

        {/* Thông tin */}
        <Text style={styles.label}>Tên danh mục:</Text>
        <Text style={styles.value}>{categoryData.name}</Text>

        {categoryData.description ? (
          <>
            <Text style={styles.label}>Mô tả:</Text>
            <Text style={styles.value}>{categoryData.description}</Text>
          </>
        ) : null}

        <Text style={styles.label}>Giá:</Text>
        <Text style={styles.value}>
          {categoryData.price ? `${categoryData.price.toLocaleString()} đ` : "Chưa có"}
        </Text>

        <Text style={styles.label}>Loại:</Text>
        <Text style={styles.value}>
          {categoryData.type === "interior" ? "Nội thất" : "Nhà mẫu"}
        </Text>
      </View>

      {/* Nút hành động */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#4A90E2" }]}
          onPress={() => navigation.navigate("EditCategory", { category: categoryData })}
        >
          <Ionicons name="create-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>Chỉnh sửa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: "#E53935" }]}
          onPress={handleDelete}
        >
          <Ionicons name="trash-outline" size={20} color="#fff" />
          <Text style={styles.actionText}>Xóa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CategoryDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  backButton: { padding: 4 },
  header: { fontSize: 20, fontWeight: "bold", color: "#333" },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10, color: "#333" },
  value: { fontSize: 15, color: "#555", marginTop: 4 },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 8,
    flex: 0.48,
    justifyContent: "center",
  },
  actionText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 6,
    fontWeight: "600",
  },
});
