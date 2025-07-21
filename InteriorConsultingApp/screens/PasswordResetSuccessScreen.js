import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const PasswordResetSuccessScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Nút quay lại (tuỳ chọn) */}
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {/* Icon dấu tích lớn */}
      <View style={styles.checkIcon}>
        <Icon name="checkmark-circle" size={250} color="#4A44F2" />
      </View>

      {/* Nút trở về đăng nhập */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={styles.buttonText}>Quay về đăng nhập</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default PasswordResetSuccessScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 24,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  checkIcon: {
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#4A44F2',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
