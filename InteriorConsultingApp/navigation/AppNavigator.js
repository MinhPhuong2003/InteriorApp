import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import VerifyOTPScreen from '../screens/VerifyOTPScreen';
import CreateNewPasswordScreen from '../screens/CreateNewPasswordScreen';
import PasswordResetSuccessScreen from '../screens/PasswordResetSuccessScreen';
import MainTabs from './MainTabs';
import InteriorDetailScreen from '../screens/InteriorDetailScreen';
import BookingScreen from '../screens/BookingScreen';
import ProductScreen from '../screens/ProductScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckOutScreen from '../screens/CheckOutScreen';
import VlogScreen from '../screens/VlogScreen';
import ContactScreen from '../screens/ContactScreen';
import HelpScreen from '../screens/HelpScreen';
const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <Stack.Screen name="VerifyOTP" component={VerifyOTPScreen} />
    <Stack.Screen name="CreateNewPassword" component={CreateNewPasswordScreen} />
    <Stack.Screen name="PasswordResetSuccess" component={PasswordResetSuccessScreen} />
    <Stack.Screen name="HomeTabs" component={MainTabs} />
    <Stack.Screen name="InteriorDetail" component={InteriorDetailScreen} />
    <Stack.Screen name="Booking" component={BookingScreen} />
    <Stack.Screen name="Product" component={ProductScreen} />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
    <Stack.Screen name="CheckOut" component={CheckOutScreen} />
    <Stack.Screen name="Vlog" component={VlogScreen} />
    <Stack.Screen name="Contact" component={ContactScreen} />
    <Stack.Screen name="Help" component={HelpScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
