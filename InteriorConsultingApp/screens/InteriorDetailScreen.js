import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const InteriorDetailScreen = ({ navigation, route }) => {
  const {
    name,
    image,
    description,
    style,
    usageRecommendation,
    createdAt,
    type,
  } = route.params;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.header}>Chi tiết nội thất</Text>
          <View style={{ width: 30 }} />
        </View>

        {/* Ảnh chính */}
        {image ? (
          <Image
            source={typeof image === "string" ? { uri: image } : image}
            style={styles.image}
          />
        ) : (
          <Image
            source={{ uri: "https://via.placeholder.com/200" }}
            style={styles.image}
          />
        )}

        {/* Thông tin */}
        <Text style={styles.label}>Tên:</Text>
        <Text style={styles.value}>{name || "Chưa có"}</Text>

        <Text style={styles.label}>Mô tả:</Text>
        <Text style={styles.value}>{description || "Chưa có"}</Text>

        <Text style={styles.label}>Loại:</Text>
        <Text style={styles.value}>
          {type === "interior"
            ? "Nội thất"
            : type === "modal"
            ? "Nhà mẫu"
            : "Chưa có"}
        </Text>

        <Text style={styles.label}>Phong cách thiết kế:</Text>
        <Text style={styles.value}>{style || "Chưa có"}</Text>

        <Text style={styles.label}>Khuyến nghị sử dụng:</Text>
        <Text style={styles.value}>{usageRecommendation || "Chưa có"}</Text>

        {createdAt ? (
          <>
            <Text style={styles.label}>Ngày tạo:</Text>
            <Text style={styles.value}>
              {createdAt.toDate
                ? createdAt.toDate().toLocaleString("vi-VN", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : new Date(createdAt.seconds * 1000).toLocaleString("vi-VN")}
            </Text>
          </>
        ) : null}
      </View>

      {/* Nút Booking */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Booking")}
      >
        <View style={styles.buttonContent}>
          <Ionicons
            name="calendar-outline"
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.buttonText}>ĐẶT LỊCH TƯ VẤN</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default InteriorDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  contentContainer: { flexGrow: 1, paddingBottom: 20 },
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
    height: 220,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: { fontSize: 16, fontWeight: "bold", marginTop: 10, color: "#333" },
  value: { fontSize: 15, color: "#555", marginTop: 4, textAlign: "justify" },
  button: {
    backgroundColor: "#2D6B60",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 25,
    marginBottom: 25,
  },
  buttonText: { color: "#fff", fontWeight: "600", fontSize: 15 },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
