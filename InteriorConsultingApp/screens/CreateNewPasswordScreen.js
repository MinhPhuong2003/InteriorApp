import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';

const passwordSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'Mật khẩu ít nhất 6 ký tự')
    .required('Bắt buộc nhập'),
  confirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Mật khẩu xác nhận không khớp')
    .required('Bắt buộc nhập'),
});

const CreateNewPasswordScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async (values) => {
    try {
      setLoading(true);
      const user = auth().currentUser;
      if (user) {
        await user.updatePassword(values.password);
        setLoading(false);
        navigation.replace('PasswordResetSuccess');
      } else {
        setLoading(false);
        console.log('❌ Không tìm thấy người dùng, vui lòng đăng nhập lại.');
      }
    } catch (error) {
      setLoading(false);
      console.log('❌ Lỗi đổi mật khẩu:', error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.title}>Tạo Mật Khẩu Mới</Text>

      <Formik
        initialValues={{ password: '', confirm: '' }}
        validationSchema={passwordSchema}
        onSubmit={handleChangePassword}
      >
        {({ handleChange, handleSubmit, values, errors, touched }) => (
          <>
            {/* Mật khẩu mới */}
            <View style={styles.inputBox}>
              <Icon name="lock-closed-outline" size={20} color="#999" style={styles.icon} />
              <TextInput
                placeholder="Nhập mật khẩu mới"
                secureTextEntry={!showPassword}
                value={values.password}
                onChangeText={handleChange('password')}
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
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {/* Xác nhận mật khẩu */}
            <View style={styles.inputBox}>
              <Icon name="lock-closed-outline" size={20} color="#999" style={styles.icon} />
              <TextInput
                placeholder="Xác nhận mật khẩu mới"
                secureTextEntry={!showConfirm}
                value={values.confirm}
                onChangeText={handleChange('confirm')}
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
            {touched.confirm && errors.confirm && (
              <Text style={styles.errorText}>{errors.confirm}</Text>
            )}

            {/* Nút Đặt mật khẩu */}
            <TouchableOpacity
              style={styles.button}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Đặt Lại Mật Khẩu</Text>
              )}
            </TouchableOpacity>
          </>
        )}
      </Formik>
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
  button: {
    backgroundColor: '#4A44F2',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
  },
});
