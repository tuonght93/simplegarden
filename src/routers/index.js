import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import { useSelector, useDispatch } from "react-redux";
import { navigationRef } from './NavigationService';
import { actCheckLogin } from '../actions/auth';
import Main from './Main';
import Splash from '../screens/auth/Splash';
import SignInSignUp from '../screens/auth';
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import ForgotPassword from '../screens/auth/ForgotPassword';
import Intro from '../screens/auth/Intro';
import Product from '../screens/products/Product';
import Filter from '../screens/orders/Filter';
import Checkout from '../screens/orders/Checkout';
import SelectShop from '../screens/orders/SelectShop';

const Stack = createStackNavigator();

function App() {

    const dispatch = useDispatch()

    const auth = useSelector(state => state.auth)

    useEffect(() => {
        const onCheckLogin = async () => {
            let userToken;
            let isFirstTime;
            try {
                userToken = await AsyncStorage.getItem('userToken');
                isFirstTime = await AsyncStorage.getItem('isFirstTime');
            } catch (e) {
                // Restoring token failed
            }
            dispatch(actCheckLogin(userToken, isFirstTime))
        };

        onCheckLogin();
    }, [])

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator headerMode="none">
                {auth.isLoading ? (
                    <Stack.Screen name="Splash" component={Splash} />
                ) :
                    auth.isFirstTime === 1 ? (
                        <Stack.Screen name="Intro" component={Intro} />
                    ) :
                        auth.userToken === null ? (
                            <>
                                <Stack.Screen name="SignInSignUp" component={SignInSignUp} options={{
                                    animationTypeForReplace: auth.isSignout ? 'pop' : 'push',
                                }} />
                                <Stack.Screen name="SignIn" component={SignIn} />
                                <Stack.Screen name="SignUp" component={SignUp} />
                                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
                            </>
                        ) : (
                                <Stack.Screen name="ModalStack" component={ModalStack} />
                            )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

function ModalStack() {
    return (
        <Stack.Navigator initialRouteName="MainStackScreen" headerMode="none" mode="modal">
            <Stack.Screen name="MainStackScreen" component={MainStackScreen} />
            <Stack.Screen name="Product" component={Product} />
            <Stack.Screen name="Filter" component={Filter} />
        </Stack.Navigator>
    );
}

function MainStackScreen() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Main" component={Main} />
            <Stack.Screen name="Checkout" component={Checkout} />
            <Stack.Screen name="SelectShop" component={SelectShop} />
        </Stack.Navigator>
    );
}

export default App;