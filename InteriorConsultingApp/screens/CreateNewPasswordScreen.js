import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CreateNewPasswordScreen = ({ navigation }) => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Tạo Mật Khẩu Mới</Text>

      {/* Mật khẩu mới */}
      <View style={styles.inputBox}>
        <Icon name="lock-closed-outline" size={20} color="#999" style={styles.icon} />
        <TextInput
          placeholder="Nhập mật khẩu mới"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Icon
            name={showPassword ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      {/* Xác nhận mật khẩu */}
      <View style={styles.inputBox}>
        <Icon name="lock-closed-outline" size={20} color="#999" style={styles.icon} />
        <TextInput
          placeholder="Xác nhận mật khẩu mới"
          secureTextEntry={!showConfirm}
          value={confirm}
          onChangeText={setConfirm}
          style={styles.input}
        />
        <TouchableOpacity onPress={() => setShowConfirm(!showConfirm)}>
          <Icon
            name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
            size={20}
            color="#999"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.rules}>
        <Text style={styles.ruleText}>
          <Text style={styles.red}>✔</Text> Ít nhất một chữ cái viết hoa
        </Text>
        <Text style={styles.ruleText}>
          <Text style={styles.red}>✔</Text> Ít nhất một số
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('PasswordResetSuccess')}
      >
        <Text style={styles.buttonText}>Đặt Mật Khẩu</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CreateNewPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4A44F2',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 45,
    fontSize: 14,
  },
  rules: {
    marginBottom: 20,
    marginLeft: 5,
  },
  ruleText: {
    fontSize: 13,
    color: '#444',
    marginVertical: 2,
  },
  red: {
    color: 'red',
    fontWeight: 'bold',
    marginRight: 5,
  },
  button: {
    backgroundColor: '#4A44F2',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 5,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
