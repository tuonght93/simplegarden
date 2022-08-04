import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import Shop from '../screens/shops';
import ShopDetail from '../screens/shops/ShopDetail';

export default function TabShop() {
    return (
        <Stack.Navigator initialRouteName="Shop" headerMode="none">
            <Stack.Screen name="Shop" component={Shop} />
            <Stack.Screen name="ShopDetail" component={ShopDetail} />
        </Stack.Navigator>
    );
}
