import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './InteriorConsultingApp/navigation/AppNavigator';
import { CartProvider } from './InteriorConsultingApp/context/CartContext';

export default function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </CartProvider>
  );
}
