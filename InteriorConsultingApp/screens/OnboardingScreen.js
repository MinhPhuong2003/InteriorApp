import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const OnboardingScreen = ({ navigation }) => {
  const [step, setStep] = useState(0);

  const data = [
  {
    title: 'Nội Thất Thanh Lịch Tuyệt Vời',
    desc: 'Thiết kế tạo ra văn hóa,\nVăn hóa hình thành giá trị,\nGiá trị quyết định tương lai',
    image: require('../assets/onboarding.jpg'),
  },
  {
    title: 'Ý Tưởng Thiết Kế Sáng Tạo',
    desc: 'Thiết kế tốt là tạo ra điều dễ hiểu và đáng nhớ.',
    image: require('../assets/onboarding1.jpg'),
  },
  {
    title: 'Sẵn Sàng Bắt Đầu?',
    desc: 'Hãy đăng nhập để\nbắt đầu hành trình của bạn!',
    image: require('../assets/onboarding2.jpg'),
  },
];

  const nextStep = () => {
    if (step < data.length - 1) {
      setStep(step + 1);
    }
  };

  const skip = () => navigation.replace('Login');
  const goToLogin = () => navigation.replace('Login');

  return (
    <ImageBackground source={data[step].image} style={styles.background}>
      {/* Khung trắng mờ chứa nội dung */}
      <View style={styles.overlay}>
        <Text style={styles.title}>{data[step].title}</Text>
        <Text style={styles.desc}>{data[step].desc}</Text>

        <View style={styles.dots}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                step === index && { backgroundColor: '#4A44F2', width: 12 },
              ]}
            />
          ))}
        </View>

        {/* Skip / Next chỉ trong khung trắng */}
        <View style={styles.buttons}>
          <TouchableOpacity onPress={skip}>
            <Text style={styles.skip}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={nextStep}>
            <Text style={styles.next}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Nút Let’s go luôn hiển thị phía dưới */}
      <TouchableOpacity style={styles.letsGoBtn} onPress={goToLogin}>
        <Text style={styles.letsGoText}>Let’s go</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width,
    height,
  },
  overlay: {
    position: 'absolute',
    bottom: 130,
    alignSelf: 'center',
    width: width * 0.85,
    padding: 20,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  desc: {
    fontSize: 14,
    color: '#444',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  skip: {
    color: '#4A44F2',
    fontSize: 14,
    fontWeight: '600',
  },
  next: {
    color: '#4A44F2',
    fontWeight: 'bold',
    fontSize: 16,
  },
  letsGoBtn: {
    position: 'absolute',
    bottom: 50,
    width: width * 0.85,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 24,
    alignItems: 'center',
  },
  letsGoText: {
    color: '#4A44F2',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
