import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import AppointmentsScreen from '../screens/AppointmentsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InteriorScreen from '../screens/InteriorScreen';
import ProductScreen from '../screens/ProductScreen';

const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator screenOptions={{ headerShown: true }}>
    {/* Home Tab */}
    <Tab.Screen
      name="TRANG CHỦ"
      component={HomeScreen}
      options={({ navigation }) => ({
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name="menu-outline"
            size={24}
            color="#000"
            style={{ marginLeft: 16 }}
            onPress={() => {
              console.log('Menu pressed (Home)');
            }}
          />
        ),
        headerRight: () => (
          <Icon
            name="settings-outline"
            size={24}
            color="#000"
            style={{ marginRight: 16 }}
            onPress={() => navigation.navigate('Profile')}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <Icon name="home-outline" size={size} color={color} />
        ),
      })}
    />
    {/* Interior Tab */}
    <Tab.Screen
      name="NỘI THẤT"
      component={InteriorScreen}
      options={({ navigation }) => ({
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name="menu-outline"
            size={24}
            color="#000"
            style={{ marginLeft: 16 }}
            onPress={() => {
              console.log('Menu pressed (Interior)');
            }}
          />
        ),
        headerRight: () => (
          <Icon
            name="settings-outline"
            size={24}
            color="#000"
            style={{ marginRight: 16 }}
            onPress={() => navigation.navigate('Interior')}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <Icon name="grid-outline" size={size} color={color} />
        ),
      })}
    />
    {/* ✅ Product Tab */}
    <Tab.Screen
      name="SẢN PHẨM"
      component={ProductScreen}
      options={({ navigation }) => ({
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name="menu-outline"
            size={24}
            color="#000"
            style={{ marginLeft: 16 }}
            onPress={() => {
              console.log('Menu pressed (Product)');
            }}
          />
        ),
        headerRight: () => (
          <Icon
            name="cart-outline"
            size={24}
            color="#000"
            style={{ marginRight: 16 }}
            onPress={() => {
              console.log('Settings/Product');
            }}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <Icon name="cube-outline" size={size} color={color} />
        ),
      })}
    />
    {/* Appointments Tab */}
    <Tab.Screen
      name="LỊCH HẸN"
      component={AppointmentsScreen}
      options={({ navigation }) => ({
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name="menu-outline"
            size={24}
            color="#000"
            style={{ marginLeft: 16 }}
            onPress={() => {
              console.log('Menu pressed (Appointments)');
            }}
          />
        ),
        headerRight: () => (
          <Icon
            name="settings-outline"
            size={24}
            color="#000"
            style={{ marginRight: 16 }}
            onPress={() => navigation.navigate('Profile')}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <Icon name="calendar-outline" size={size} color={color} />
        ),
      })}
    />
    
    {/* Profile Tab */}
    <Tab.Screen
      name="HỒ SƠ"
      component={ProfileScreen}
      options={({ navigation }) => ({
        headerTitleAlign: 'center',
        headerLeft: () => (
          <Icon
            name="menu-outline"
            size={24}
            color="#000"
            style={{ marginLeft: 16 }}
            onPress={() => {
              console.log('Menu pressed (Profile)');
            }}
          />
        ),
        headerRight: () => (
          <Icon
            name="settings-outline"
            size={24}
            color="#000"
            style={{ marginRight: 16 }}
            onPress={() => navigation.navigate('Profile')}
          />
        ),
        tabBarIcon: ({ color, size }) => (
          <Icon name="person-outline" size={size} color={color} />
        ),
      })}
    />
  </Tab.Navigator>
);

export default MainTabs;
