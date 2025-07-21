import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Ionicons';

const SignUpScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const signUpSchema = Yup.object().shape({
    name: Yup.string().required('Vui lòng nhập tên'),
    email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
    password: Yup.string().min(6, 'Tối thiểu 6 ký tự').required('Vui lòng nhập mật khẩu'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Mật khẩu không khớp')
      .required('Vui lòng xác nhận mật khẩu'),
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Đăng Ký</Text>
      <Text style={styles.subtitle}>
        Bạn chưa có tài khoản?{'\n'}Hãy tạo một tài khoản mới
      </Text>

      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={signUpSchema}
        onSubmit={(values) => {
          console.log('Đăng ký:', values);
          // TODO: xử lý đăng ký Firebase hoặc API
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            {/* Tên người dùng */}
            <View style={styles.inputContainer}>
              <Icon name="person-outline" size={20} color="#999" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Tên người dùng"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
              />
            </View>
            {touched.name && errors.name && <Text style={styles.error}>{errors.name}</Text>}

            {/* Email */}
            <View style={styles.inputContainer}>
              <Icon name="mail-outline" size={20} color="#999" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
            </View>
            {touched.email && errors.email && <Text style={styles.error}>{errors.email}</Text>}

            {/* Mật khẩu */}
            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={20} color="#999" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Mật khẩu mới"
                secureTextEntry={!showPassword}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
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
              <Text style={styles.error}>{errors.password}</Text>
            )}

            {/* Xác nhận mật khẩu */}
            <View style={styles.inputContainer}>
              <Icon name="lock-closed-outline" size={20} color="#999" style={styles.icon} />
              <TextInput
                style={styles.input}
                placeholder="Xác nhận mật khẩu"
                secureTextEntry={!showConfirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Icon
                  name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color="#999"
                />
              </TouchableOpacity>
            </View>
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.error}>{errors.confirmPassword}</Text>
            )}

            {/* Nút đăng ký */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Đăng Ký</Text>
            </TouchableOpacity>

            {/* Đã có tài khoản? Đăng nhập */}
            <View style={styles.signupContainer}>
              <Text>Bạn đã có tài khoản?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.signupText}> Đăng Nhập</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#4A44F2',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 13,
    textAlign: 'center',
    marginVertical: 10,
    color: '#888',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 48,
  },
  error: {
    fontSize: 12,
    color: 'red',
    marginLeft: 5,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#4A44F2',
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
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
});
