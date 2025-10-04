import React, { useState, useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../screens/HomeScreen';
import BookingListScreen from '../screens/BookingListScreen';
import ProfileScreen from '../screens/ProfileScreen';
import InteriorScreen from '../screens/InteriorScreen';
import ProductScreen from '../screens/ProductScreen';
import SideMenu from '../components/SideMenu';
import SettingsModal from '../components/SettingsModal';
import { CartContext } from '../context/CartContext';

const Tab = createBottomTabNavigator();

const MainTabs = ({ navigation }) => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isSettingsVisible, setSettingsVisible] = useState(false);
  const { totalQuantity } = useContext(CartContext);
  console.log('Total Quantity in MainTabs:', totalQuantity);

  if (totalQuantity === undefined) {
    console.error('CartContext not available or totalQuantity is undefined');
  }

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
        <View style={{ position: 'relative', marginRight: 16 }}>
          <Icon
            name="cart-outline"
            size={24}
            color="#000"
            onPress={() => nav.navigate('Cart')}
          />
          {totalQuantity > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {totalQuantity > 9 ? '9+' : totalQuantity}
              </Text>
            </View>
          )}
        </View>
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

  const renderProductTabIcon = ({ color, size }) => (
    <Icon name="cube-outline" size={size} color={color} />
  );

  return (
    <>
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          tabBarStyle: { height: 60, paddingBottom: 5 },
          headerStyle: { height: 60 },
        }}
      >
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
            headerRight: () => renderHeaderRight(navigation, true),
            tabBarIcon: renderProductTabIcon,
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

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MainTabs;