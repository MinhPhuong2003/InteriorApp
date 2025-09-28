import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import firestore from "@react-native-firebase/firestore";

const AdminCategoryScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [categoryName, setCategoryName] = useState("");

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

  const handleSave = async () => {
    if (!categoryName.trim()) {
      Alert.alert("Thông báo", "Tên danh mục không được để trống");
      return;
    }

    try {
      if (editingCategory) {
        await firestore()
          .collection("categories")
          .doc(editingCategory.id)
          .update({ name: categoryName });
        Alert.alert("Thành công", "Đã cập nhật danh mục");
      } else {
        await firestore().collection("categories").add({
          name: categoryName,
          createdAt: firestore.FieldValue.serverTimestamp(),
        });
        Alert.alert("Thành công", "Đã thêm danh mục mới");
      }
      setModalVisible(false);
      setCategoryName("");
      setEditingCategory(null);
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Không thể lưu danh mục");
    }
  };

  const handleDelete = (id) => {
    Alert.alert("Xác nhận", "Bạn có chắc muốn xóa danh mục này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Xóa",
        style: "destructive",
        onPress: async () => {
          try {
            await firestore().collection("categories").doc(id).delete();
            Alert.alert("Thành công", "Đã xóa danh mục");
          } catch (error) {
            console.error(error);
            Alert.alert("Lỗi", "Không thể xóa danh mục");
          }
        },
      },
    ]);
  };

  const openModal = (category) => {
    if (category) {
      setEditingCategory(category);
      setCategoryName(category.name);
    } else {
      setEditingCategory(null);
      setCategoryName("");
    }
    setModalVisible(true);
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
        <TouchableOpacity onPress={() => openModal(item)} style={styles.actionButton}>
          <Ionicons name="create-outline" size={20} color="#4A90E2" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item.id)}
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

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {editingCategory ? "Sửa danh mục" : "Thêm danh mục mới"}
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập tên danh mục"
              value={categoryName}
              onChangeText={setCategoryName}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#4A90E2" }]}
                onPress={handleSave}
              >
                <Text style={styles.modalButtonText}>Lưu</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#aaa" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
  },
  modalActions: { flexDirection: "row", justifyContent: "space-between" },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: "center",
  },
  modalButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
