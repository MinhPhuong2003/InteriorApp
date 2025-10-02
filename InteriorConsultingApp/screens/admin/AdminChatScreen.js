import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import firestore from "@react-native-firebase/firestore";
import Ionicons from "react-native-vector-icons/Ionicons";

const ADMIN_ID = "admin";

const AdminChatScreen = ({ navigation }) => {
  const [chatUsers, setChatUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("chats")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        snapshot.forEach((doc) => {
          doc.ref
            .collection("messages")
            .orderBy("createdAt", "asc")
            .onSnapshot(async (messagesSnap) => {
              const unreadMsgs = messagesSnap.docs.filter(
                (m) => m.data().read === false && m.data().senderId !== ADMIN_ID
              );

              const lastMsgDoc = messagesSnap.docs[messagesSnap.size - 1];
              let lastMessage = "";
              if (lastMsgDoc) {
                const data = lastMsgDoc.data();
                lastMessage =
                  (data.senderId === ADMIN_ID ? "Admin: " : "User: ") +
                  (data.text || "");
              }

              const userId = doc.data().participants?.userId;
              let userName = "User";

              if (userId) {
                try {
                  const userDoc = await firestore()
                    .collection("users")
                    .doc(userId)
                    .get();
                  if (userDoc.exists) {
                    userName = userDoc.data().name || "User";
                  }
                } catch (err) {
                  console.log("Fetch user error:", err);
                }
              }

              const chatObj = {
                id: doc.id,
                ...doc.data(),
                userName,
                unreadCount: unreadMsgs.length,
                lastMessage,
              };

              setChatUsers((prev) => {
                const others = prev.filter((c) => c.id !== doc.id);
                return [chatObj, ...others];
              });
            });
        });
      });

    return () => unsubscribe();
  }, []);

  const renderAvatar = (name) => {
    const firstLetter = name ? name.charAt(0).toUpperCase() : "U";
    return (
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{firstLetter}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.header}>CHAT</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Chat List */}
      <View style={{ flex: 1 }}>
        <FlatList
          data={chatUsers}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 12 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.chatItem}
              onPress={() =>
                navigation.navigate("AdminChatDetail", { chatId: item.id })
              }
            >
              <View style={styles.row}>
                {renderAvatar(item.userName)}
                <View style={{ flex: 1, marginLeft: 10 }}>
                  <Text style={styles.userText}>{item.userName}</Text>
                  <Text
                    style={[
                      styles.lastMsg,
                      item.lastMessage?.startsWith("Admin:")
                        ? styles.adminMsg
                        : styles.userMsg,
                    ]}
                    numberOfLines={1}
                  >
                    {item.lastMessage || "Chưa có tin nhắn"}
                  </Text>
                </View>
                {item.unreadCount > 0 && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.unreadCount}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default AdminChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f9f9f9",
  },
  backButton: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  chatItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#4a90e2",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  userText: { fontWeight: "bold", fontSize: 16, color: "#333" },
  lastMsg: { marginTop: 2, fontSize: 14 },
  adminMsg: { color: "blue", fontStyle: "italic" },
  userMsg: { color: "#555" },
  badge: {
    backgroundColor: "red",
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  badgeText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
});
