import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import Home from '../screens/home';
import ShopDetail from '../screens/shops/ShopDetail';

export default function TabHome() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="ShopDetail" component={ShopDetail} />
        </Stack.Navigator>
    );
}
