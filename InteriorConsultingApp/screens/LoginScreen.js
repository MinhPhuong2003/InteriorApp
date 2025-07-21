import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image, 
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

const LoginScreen = ({ navigation }) => {
  const [secureText, setSecureText] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Email không hợp lệ').required('Bắt buộc nhập'),
    password: Yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự').required('Bắt buộc nhập'),
  });

  return (
    <SafeAreaView style={styles.container}>
      <Image
                source={require('../assets/logo.png')} // Thay bằng ảnh đại diện thật
                style={styles.avatar}
              />
      <Text style={styles.title}>CHÀO MỪNG ĐẾN VỚI CHICHI INTERIOR!</Text>

      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          const hardcodedEmail = 'phuongminh392@gmail.com';
          const hardcodedPassword = '123456';

          if (
            values.email === hardcodedEmail &&
            values.password === hardcodedPassword
          ) {
            navigation.replace('HomeTabs');
          } else {
            alert('Sai email hoặc mật khẩu!');
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            {/* Nhập Email */}
            <View style={styles.inputContainer}>
              <Icon name="mail-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            {errors.email && touched.email && (
              <Text style={styles.error}>{errors.email}</Text>
            )}

            {/* Nhập Mật khẩu */}
            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.textInput}
                placeholder="Mật khẩu"
                secureTextEntry={secureText}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                <Icon
                  name={secureText ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#666"
                  style={{ marginRight: 10 }}
                />
              </TouchableOpacity>
            </View>
            {errors.password && touched.password && (
              <Text style={styles.error}>{errors.password}</Text>
            )}

            {/* Ghi nhớ đăng nhập & Quên mật khẩu */}
            <View style={styles.rememberRow}>
              <TouchableOpacity
                style={styles.checkboxContainer}
                onPress={() => setRememberMe(!rememberMe)}
              >
                <View
                  style={[
                    styles.checkbox,
                    rememberMe && styles.checkboxChecked,
                  ]}
                >
                  {rememberMe && <Icon name="checkmark" size={14} color="#fff" />}
                </View>
                <Text style={styles.rememberText}>Ghi nhớ đăng nhập</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.linkText}>Quên mật khẩu?</Text>
              </TouchableOpacity>
            </View>

            {/* Nút Đăng nhập */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Đăng nhập</Text>
            </TouchableOpacity>

            {/* Hoặc đăng nhập với */}
            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.orText}>hoặc đăng nhập với</Text>
              <View style={styles.line} />
            </View>

            {/* Đăng nhập Google */}
            <TouchableOpacity style={styles.socialBtn}>
              <View style={styles.socialContent}>
                <Icon name="logo-google" size={20} color="#DB4437" style={styles.socialIcon} />
                <Text style={styles.socialText}>Tiếp tục với Google</Text>
              </View>
            </TouchableOpacity>

            {/* Đăng nhập Facebook */}
            <TouchableOpacity style={styles.socialBtn}>
              <View style={styles.socialContent}>
                <Icon name="logo-facebook" size={20} color="#1877F2" style={styles.socialIcon} />
                <Text style={styles.socialText}>Tiếp tục với Facebook</Text>
              </View>
            </TouchableOpacity>

            {/* Đăng ký tài khoản */}
            <View style={styles.signupContainer}>
              <Text>Bạn chưa có tài khoản?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.signupText}> Đăng ký</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A44F2',
    textAlign: 'center',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
  },
  inputIcon: {
    marginRight: 6,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 8,
    fontSize: 13,
  },
  rememberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4A44F2',
    borderColor: '#4A44F2',
  },
  rememberText: {
    fontSize: 13,
    color: '#333',
  },
  linkText: {
    color: '#4A44F2',
    fontSize: 13,
  },
  button: {
    backgroundColor: '#4A44F2',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#666',
  },
  socialBtn: {
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    alignItems: 'center',
  },
  socialContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIcon: {
    marginRight: 8,
  },
  socialText: {
    fontSize: 14,
    color: '#000',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#4A44F2',
    fontWeight: 'bold',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16,
    alignSelf: 'center',
  },

});
