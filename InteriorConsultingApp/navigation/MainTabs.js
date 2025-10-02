import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import BookingListScreen from '../screens/BookingListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InteriorScreen from '../screens/InteriorScreen';
import ProductScreen from '../screens/ProductScreen';
import SideMenu from '../components/SideMenu';
import SettingsModal from '../components/SettingsModal';

const Tab = createBottomTabNavigator();

const MainTabs = ({ navigation }) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isSettingsVisible, setSettingsVisible] = useState(false);

  const renderHeaderLeft = () => (
    <Icon
      name="menu-outline"
      size={24}
      color="#000"
      style={{ marginLeft: 16 }}
      onPress={() => setMenuVisible(true)}
    />
  );

  const renderHeaderRight = (nav, isProductTab) => {
    if (isProductTab) {
      return (
        <Icon
          name="cart-outline"
          size={24}
          color="#000"
          style={{ marginRight: 16 }}
          onPress={() => nav.navigate('Cart')}
        />
      );
    }
    return (
      <Icon
        name="settings-outline"
        size={24}
        color="#000"
        style={{ marginRight: 16 }}
        onPress={() => setSettingsVisible(true)}
      />
    );
  };

  return (
    <>
      <Tab.Navigator screenOptions={{ headerShown: true }}>
        <Tab.Screen
          name="TRANG CHỦ"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
            headerLeft: renderHeaderLeft,
            headerRight: () => renderHeaderRight(navigation, false),
            tabBarIcon: ({ color, size }) => (
              <Icon name="home-outline" size={size} color={color} />
            ),
          })}
        />
        <Tab.Screen
          name="NỘI THẤT"
          component={InteriorScreen}
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
            headerLeft: renderHeaderLeft,
            headerRight: () => renderHeaderRight(navigation, false),
            tabBarIcon: ({ color, size }) => (
              <Icon name="grid-outline" size={size} color={color} />
            ),
          })}
        />
        <Tab.Screen
          name="SẢN PHẨM"
          component={ProductScreen}
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
            headerLeft: renderHeaderLeft,
            headerRight: () => renderHeaderRight(navigation, true), // Dùng nút giỏ hàng
            tabBarIcon: ({ color, size }) => (
              <Icon name="cube-outline" size={size} color={color} />
            ),
          })}
        />
        <Tab.Screen
          name="LỊCH HẸN"
          component={BookingListScreen}
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
            headerLeft: renderHeaderLeft,
            headerRight: () => renderHeaderRight(navigation, false),
            tabBarIcon: ({ color, size }) => (
              <Icon name="calendar-outline" size={size} color={color} />
            ),
          })}
        />
        <Tab.Screen
          name="HỒ SƠ"
          component={ProfileScreen}
          options={({ navigation }) => ({
            headerTitleAlign: 'center',
            headerLeft: renderHeaderLeft,
            headerRight: () => renderHeaderRight(navigation, false),
            tabBarIcon: ({ color, size }) => (
              <Icon name="person-outline" size={size} color={color} />
            ),
          })}
        />
      </Tab.Navigator>

      <SideMenu visible={isMenuVisible} onClose={() => setMenuVisible(false)} />
      <SettingsModal visible={isSettingsVisible} onClose={() => setSettingsVisible(false)} />
    </>
  );
};

export default MainTabs;

