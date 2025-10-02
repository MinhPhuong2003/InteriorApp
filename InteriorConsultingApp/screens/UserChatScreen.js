import React, { useEffect, useState } from "react";
import { View, TextInput, FlatList, Text, TouchableOpacity, StyleSheet } from "react-native";
import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";

const ADMIN_ID = "admin";

const UserChatScreen = () => {
  const currentUser = auth().currentUser;
  const chatId = `chat_${currentUser.uid}_admin`;

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const chatRef = firestore().collection("chats").doc(chatId);

    chatRef.set(
      {
        createdAt: firestore.FieldValue.serverTimestamp(),
        participants: {
          userId: currentUser.uid,
          adminId: ADMIN_ID,
        },
      },
      { merge: true }
    );

    const unsubscribe = chatRef
      .collection("messages")
      .orderBy("createdAt", "asc")
      .onSnapshot(async (snapshot) => {
        const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setMessages(msgs);

        const batch = firestore().batch();
        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (data.senderId === ADMIN_ID && data.read === false) {
            batch.update(doc.ref, { read: true });
          }
        });
        if (!snapshot.empty) {
          await batch.commit();
        }
      });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    await firestore().collection("chats").doc(chatId).collection("messages").add({
      text: input,
      senderId: currentUser.uid,
      createdAt: firestore.FieldValue.serverTimestamp(),
      read: false,
    });

    setInput("");
  };

  return (
    <View style={{ flex: 1, padding: 12 }}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View
            style={[
              styles.message,
              item.senderId === currentUser.uid ? styles.myMessage : styles.userMessage,
            ]}
          >
            <Text style={{ color: item.senderId === currentUser.uid ? "#fff" : "#000" }}>
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

export default UserChatScreen;

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
