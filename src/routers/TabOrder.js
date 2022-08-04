import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import Order from '../screens/orders';
import SelectShop from '../screens/orders/SelectShop';

export default function TabOrder() {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Order">
      <Stack.Screen name="Order" component={Order} />
      <Stack.Screen name="SelectShop" component={SelectShop} />
    </Stack.Navigator>
  );
}
