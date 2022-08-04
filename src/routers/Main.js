import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, Keyboard, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TabHome from './TabHome';
import TabOrder from './TabOrder';
import TabShop from './TabShop';
import TabProfile from './TabProfile';
const Tab = createBottomTabNavigator();

function MyTabBar({ state, descriptors, navigation }) {

    const insets = useSafeAreaInsets();

    const [isVisible, setVisible] = useState(true)

    useEffect(() => {
        const eventShow = "keyboardDidShow"
        const eventHide = "keyboardDidHide"
        Keyboard.addListener(eventShow, _keyboardWillShow);
        Keyboard.addListener(eventHide, _keyboardWillHide);
        return () => {
            Keyboard.removeListener(eventShow, _keyboardWillShow);
            Keyboard.removeListener(eventHide, _keyboardWillHide);
        };
    }, []);

    const _keyboardWillShow = (event) => {
        setVisible(false)
    };

    const _keyboardWillHide = (event) => {
        setVisible(true)
    };

    return (
        isVisible ?
            <View style={{ flexDirection: 'row', height: 65 + (insets ? insets.bottom : 0), backgroundColor: 'rgb(255,255,255)', borderTopColor: 'rgb(199,199,204)', borderTopWidth: 0.333333, elevation: 8, paddingBottom: insets ? insets.bottom : 0, zIndex: -1 }}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const label =
                        options.tabBarLabel !== undefined
                            ? options.tabBarLabel
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                    const isFocused = state.index === index;
                    const onPress = () => {
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                        });

                        if (!isFocused && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    };

                    const onLongPress = () => {
                        navigation.emit({
                            type: 'tabLongPress',
                            target: route.key,
                        });
                    };

                    let iconName;
                    let iconStyle;
                    if (route.name === 'home') {
                        iconName = isFocused
                            ? require('../assets/ic_home_active.png')
                            : require('../assets/ic_home.png');
                        iconStyle = { width: 24, height: 22 }
                    } else if (route.name === 'order') {
                        iconName = isFocused
                            ? require('../assets/ic_order_active.png')
                            : require('../assets/ic_order.png');
                        iconStyle = { width: 20, height: 24 }
                    } else if (route.name === 'shop') {
                        iconName = isFocused
                            ? require('../assets/ic_pin_active.png')
                            : require('../assets/ic_pin.png');
                        iconStyle = { width: 20, height: 26 }
                    } else if (route.name === 'profile') {
                        iconName = isFocused
                            ? require('../assets/ic_user_active.png')
                            : require('../assets/ic_user.png');
                        iconStyle = { width: 22, height: 24 }
                    }

                    return (
                        <TouchableOpacity
                            activeOpacity={1}
                            accessibilityRole="button"
                            accessibilityStates={isFocused ? ['selected'] : []}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            key={index}
                            style={{ flex: 1, alignItems: 'center', backgroundColor: 'transparent', justifyContent: 'space-between', flexDirection: 'column', marginVertical: 10 }}
                        >
                            <View style={{ alignItems: 'center', justifyContent: 'flex-start', width: 26, height: 26 }}>
                                <Image source={iconName} style={iconStyle} />
                            </View>
                            <Text style={{ color: isFocused ? '#1B4731' : '#0E261A', fontSize: 14, fontWeight: 'normal' }}>
                                {label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            :
            null
    );
}

export default function Main() {
    return (
        <Tab.Navigator tabBar={props => <MyTabBar {...props} />}>
            <Tab.Screen name='home' component={TabHome} options={{ tabBarLabel: 'Trang chủ' }} />
            <Tab.Screen name='order' component={TabOrder} options={{ tabBarLabel: 'Đặt hàng' }} />
            <Tab.Screen name='shop' component={TabShop} options={{ tabBarLabel: 'Cửa hàng' }} />
            <Tab.Screen name='profile' component={TabProfile} options={{ tabBarLabel: 'Tôi' }} />
        </Tab.Navigator>
    );
}