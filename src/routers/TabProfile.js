import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();
import Header from '../components/Header';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import Profile from '../screens/profile';
import ProfileInfomation from '../screens/profile/ProfileInfomation';
import Coming from '../screens/profile/Coming';
import History from '../screens/profile/History';
import OrderDraff from '../screens/profile/OrderDraff';
import RatingShipper from '../screens/profile/RatingShipper';
import OrderDetail from '../screens/profile/OrderDetail';
import MyLocation from '../screens/profile/MyLocation';
import ForgotPassword from '../screens/profile/ForgotPassword';
import FeedBack from '../screens/profile/FeedBack';
import AboutUs from '../screens/profile/AboutUs';

function OrderHistory({ navigation }) {

  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={{ height: insets.top }} />
      <Header
        headerText="Lịch sử đặt hàng"
        leftPress={() => navigation.navigate('Profile')}
      />
      <Tab.Navigator
        tabBarOptions={{
          labelStyle: { fontSize: 16, fontWeight: 'bold', textTransform: 'none' },
          tabStyle: { width: 'auto', minHeight: 35, paddingHorizontal: 10 },
          activeTintColor: '#2A3B56',
          inactiveTintColor: '#C4CBD6',
          indicatorStyle: { height: 2, backgroundColor: '#F5AC02' }
        }}
        lazy
      >
        <Tab.Screen name="Coming" component={Coming} options={{ tabBarLabel: 'Đang đến' }} />
        <Tab.Screen name="History" component={History} options={{ tabBarLabel: 'Lịch sử' }} />
        <Tab.Screen name="OrderDraff" component={OrderDraff} options={{ tabBarLabel: 'Đơn nháp' }} />
      </Tab.Navigator>
    </View>
  );
}

export default function TabProfile() {
  return (
    <Stack.Navigator initialRouteName="Profile" headerMode="none">
      <Stack.Screen name="Profile" component={Profile} options={{
        animationTypeForReplace: 'push',
      }} />
      <Stack.Screen name="ProfileInfomation" component={ProfileInfomation} />
      <Stack.Screen name="OrderHistory" component={OrderHistory} />
      <Stack.Screen name="RatingShipper" component={RatingShipper} />
      <Stack.Screen name="OrderDetail" component={OrderDetail} />
      <Stack.Screen name="MyLocation" component={MyLocation} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="FeedBack" component={FeedBack} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
})
