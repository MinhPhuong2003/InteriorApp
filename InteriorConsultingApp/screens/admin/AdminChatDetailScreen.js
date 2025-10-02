import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import firestore from "@react-native-firebase/firestore";

const ADMIN_ID = "admin";

const AdminChatDetailScreen = ({ route }) => {
  const { chatId } = route.params;
  const chatRef = firestore().collection("chats").doc(chatId);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const unsubscribe = chatRef
      .collection("messages")
      .orderBy("createdAt", "asc")
      .onSnapshot(async (snapshot) => {
        const msgs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMessages(msgs);

        const unread = snapshot.docs.filter(
          (doc) => doc.data().senderId !== ADMIN_ID && !doc.data().read
        );
        const batch = firestore().batch();
        unread.forEach((doc) => batch.update(doc.ref, { read: true }));
        if (unread.length > 0) await batch.commit();
      });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const doc = await chatRef.get();
    if (!doc.exists) {
      const userId = chatId.split("_")[1];
      await chatRef.set({
        createdAt: firestore.FieldValue.serverTimestamp(),
        participants: { userId, adminId: ADMIN_ID },
      });
    }

    await chatRef.collection("messages").add({
      text: input,
      senderId: ADMIN_ID,
      createdAt: firestore.FieldValue.serverTimestamp(),
      read: false,
    });

    setInput("");
  };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.senderId === ADMIN_ID
                ? styles.myMessage
                : styles.userMessage,
            ]}
          >
            <Text
              style={{
                color: item.senderId === ADMIN_ID ? "#fff" : "#000",
              }}
            >
              {item.text}
            </Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Nhập tin nhắn..."
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={{ color: "#fff" }}>Gửi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminChatDetailScreen;

const styles = StyleSheet.create({
  message: { padding: 10, borderRadius: 8, marginVertical: 4, maxWidth: "70%" },
  myMessage: { backgroundColor: "#007AFF", alignSelf: "flex-end" },
  userMessage: { backgroundColor: "#E5E5EA", alignSelf: "flex-start" },
  inputContainer: { flexDirection: "row", marginTop: 8 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 12,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 16,
    justifyContent: "center",
    borderRadius: 20,
    marginLeft: 8,
  },
});
