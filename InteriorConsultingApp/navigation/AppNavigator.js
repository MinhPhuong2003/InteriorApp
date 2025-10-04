import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import CreateNewPasswordScreen from '../screens/CreateNewPasswordScreen';
import PasswordResetSuccessScreen from '../screens/PasswordResetSuccessScreen';
import MainTabs from './MainTabs';
import InteriorDetailScreen from '../screens/InteriorDetailScreen';
import BookingScreen from '../screens/BookingScreen';
import ProductScreen from '../screens/ProductScreen';
import ProductDetailScreen from '../screens/ProductDetailScreen';
import CartScreen from '../screens/CartScreen';
import CheckOutScreen from '../screens/CheckOutScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import VlogScreen from '../screens/VlogScreen';
import ContactScreen from '../screens/ContactScreen';
import HelpScreen from '../screens/HelpScreen';
import UserChatScreen from '../screens/UserChatScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AdminDashboardScreen from '../screens/admin/AdminDashboardScreen';
import AdminProductScreen from '../screens/admin/AdminProductScreen';
import AdminOrderScreen from '../screens/admin/AdminOrderScreen';
import AdminBookingScreen from '../screens/admin/AdminBookingScreen';
import AdminUserScreen from '../screens/admin/AdminUserScreen';
import AddProductScreen from '../screens/admin/AddProductScreen';
import EditProductScreen from '../screens/admin/EditProductScreen';
import ProductDetailAdminScreen from '../screens/admin/ProductDetailAdminScreen';
import AdminCategoryScreen from '../screens/admin/AdminCategoryScreen';
import AddCategoryScreen from '../screens/admin/AddCategoryScreen';
import CategoryDetailScreen from '../screens/admin/CategoryDetailScreen';
import EditCategoryScreen from '../screens/admin/EditCategoryScreen';
import AdminChatScreen from '../screens/admin/AdminChatScreen';
import AdminChatDetailScreen from '../screens/admin/AdminChatDetailScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Onboarding" component={OnboardingScreen} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
    <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
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
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="OrderHistory" component={OrderHistoryScreen} options={{ headerShown: false }} />
    <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{ headerShown: false }} />
    <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
    <Stack.Screen name="AdminProduct" component={AdminProductScreen} />
    <Stack.Screen name="AdminOrder" component={AdminOrderScreen} />
    <Stack.Screen name="AdminBooking" component={AdminBookingScreen} />
    <Stack.Screen name="AdminUser" component={AdminUserScreen} />
    <Stack.Screen name="AddProduct" component={AddProductScreen} />
    <Stack.Screen name="EditProduct" component={EditProductScreen} />
    <Stack.Screen name="ProductDetailAdmin" component={ProductDetailAdminScreen} />
    <Stack.Screen name="AdminCategory" component={AdminCategoryScreen} />
    <Stack.Screen name="AddCategory" component={AddCategoryScreen} />
    <Stack.Screen name="EditCategory" component={EditCategoryScreen} />
    <Stack.Screen name="CategoryDetail" component={CategoryDetailScreen} />
    <Stack.Screen name="AdminChat" component={AdminChatScreen} />
    <Stack.Screen name="UserChat" component={UserChatScreen} />
    <Stack.Screen name="AdminChatDetail" component={AdminChatDetailScreen} />
  </Stack.Navigator>
);

export default AppNavigator;
