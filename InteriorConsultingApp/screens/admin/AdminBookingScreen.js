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

/** Convert many possible saved date formats -> JS Date or null */
const parseToDate = (value) => {
  if (!value) return null;
  // Firestore Timestamp
  if (typeof value === "object" && typeof value.toDate === "function") {
    try {
      return value.toDate();
    } catch (e) {
      return null;
    }
  }
  // number (ms)
  if (typeof value === "number") return new Date(value);
  // string (ISO)
  if (typeof value === "string") {
    const d = new Date(value);
    return isNaN(d.getTime()) ? null : d;
  }
  return null;
};

const AdminBookingScreen = ({ navigation }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("bookings")
      .orderBy("createdAt", "desc")
      .onSnapshot(
        async (snapshot) => {
          if (!snapshot) {
            setBookings([]);
            return;
          }

          const bookingList = await Promise.all(
            snapshot.docs.map(async (doc) => {
              const data = doc.data();
              let userData = {};

              if (data.userId) {
                try {
                  const userDoc = await firestore()
                    .collection("users")
                    .doc(data.userId)
                    .get();
                  if (userDoc.exists) userData = userDoc.data();
                } catch (e) {
                  console.warn("Failed to fetch user data:", data.userId, e);
                }
              }

              return {
                id: doc.id,
                ...data,
                userName: userData.name || "Người dùng",
                userAvatar: userData.avatar || null,
              };
            })
          );

          setBookings(bookingList);
        },
        (err) => {
          console.error("Firestore onSnapshot error:", err);
          setBookings([]);
        }
      );

    return () => unsubscribe();
  }, []);

  const handleConfirm = async (id) => {
    try {
      await firestore().collection("bookings").doc(id).update({
        status: "Đã xác nhận",
      });
      Alert.alert("Thành công", "Lịch hẹn đã được xác nhận!");
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Không thể cập nhật trạng thái");
    }
  };

  const handleCancel = async (id) => {
    try {
      await firestore().collection("bookings").doc(id).update({
        status: "Đã hủy",
      });
      Alert.alert("Thành công", "Lịch hẹn đã bị hủy!");
    } catch (error) {
      console.error(error);
      Alert.alert("Lỗi", "Không thể hủy lịch hẹn");
    }
  };

  const renderItem = ({ item }) => {
    const dateSource = item.date || item.createdAt || null;
    const dateObj = parseToDate(dateSource);
    const dateTimeStr = dateObj
      ? dateObj.toLocaleString("vi-VN", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : null;

    const isPending =
      !item.status ||
      item.status === "Chờ xác nhận" ||
      item.status === "Đang chờ" ||
      item.status === "Chờ";

    return (
      <View style={styles.card}>
        {/* Header */}
        <View style={styles.headerRow}>
          <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
            {item.userAvatar ? (
              <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
            ) : (
              <Ionicons name="person-circle-outline" size={40} color="#999" />
            )}

            <View style={{ marginLeft: 8 }}>
              <Text style={styles.userName}>{item.userName}</Text>
              <Text style={styles.info}>ID: {item.userId}</Text>
            </View>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text
              style={[
                styles.status,
                item.status === "Đã xác nhận"
                  ? styles.statusConfirmed
                  : item.status === "Đã hủy"
                  ? styles.statusCancelled
                  : styles.statusPending,
              ]}
            >
              {item.status || "Chờ xác nhận"}
            </Text>
          </View>
        </View>

        {/* Nội dung */}
        {item.notes ? <Text style={styles.notes}>Nội dung: {item.notes}</Text> : null}

        {/* Hình ảnh */}
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.bookingImage} />
        ) : null}

        {/* Ngày & giờ */}
        <Text style={styles.info}>
          Ngày & giờ:{" "}
          <Text style={{ fontWeight: "600" }}>
            {dateTimeStr ? dateTimeStr : "Chưa có ngày"}
          </Text>
        </Text>

        {/* Buttons */}
        {isPending && (
          <View style={styles.actionRow}>
            <TouchableOpacity
              style={[styles.actionButton, styles.confirmButton]}
              onPress={() => handleConfirm(item.id)}
            >
              <Ionicons name="checkmark-circle-outline" size={18} color="#fff" />
              <Text style={styles.actionText}> Xác nhận</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.actionButton, styles.cancelButton]}
              onPress={() => handleCancel(item.id)}
            >
              <Ionicons name="close-circle-outline" size={18} color="#fff" />
              <Text style={styles.actionText}> Huỷ</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.pageTitle}>QUẢN LÝ ĐẶT LỊCH</Text>
        <View style={{ width: 28 }} />
      </View>

      <FlatList
        data={bookings}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default AdminBookingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F5F5" },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  backButton: { padding: 4 },
  pageTitle: { fontSize: 18, fontWeight: "700", color: "#333" },

  list: { padding: 16, paddingBottom: 50 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 8 },
  userName: { fontSize: 15, fontWeight: "bold", color: "#000" },
  info: { fontSize: 13, color: "#555", marginTop: 6 },
  notes: { fontSize: 14, marginTop: 8, color: "#333" },
  bookingImage: {
    width: "100%",
    height: 150,
    borderRadius: 8,
    marginTop: 8,
  },
  status: {
    fontSize: 13,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  statusConfirmed: { color: "#2ECC71", backgroundColor: "#DFF5E2" },
  statusPending: { color: "#E67E22", backgroundColor: "#FDEBD0" },
  statusCancelled: { color: "#E74C3C", backgroundColor: "#FADBD8" },
  actionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 12,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  confirmButton: { backgroundColor: "#007AFF" },
  cancelButton: { backgroundColor: "#E74C3C" },
  actionText: { color: "#fff", marginLeft: 6, fontWeight: "600" },
});
