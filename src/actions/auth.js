import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Types from '../constants/ActionType';
import HTTP from '../services/HTTP';

export const actCheckLogin = (userToken, isFirstTime) => {
    return dispatch => {
        if (userToken) {
            return HTTP.callApiWithHeader('profile', 'get', null, false).then(response => {
                if (response.status === 401) {
                    AsyncStorage.removeItem('userToken')
                    dispatch({ type: Types.RESTORE_TOKEN, userToken: null, isFirstTime });
                } else {
                    dispatch({ type: Types.RESTORE_TOKEN, userToken, isFirstTime });
                    dispatch({ type: Types.UPDATE_PROFILE, data: response.data });
                }
            }).catch(function (error) {
                AsyncStorage.removeItem('userToken')
                dispatch({ type: Types.RESTORE_TOKEN, userToken: null, isFirstTime });
            });
        } else {
            dispatch({ type: Types.RESTORE_TOKEN, userToken, isFirstTime });
        }
    }
}

export const actGoToLogin = () => {
    return dispatch => {
        dispatch({ type: Types.GO_TO_LOGIN });
    }
}

export const actSubmitLogin = (body) => {
    return dispatch => {
        return HTTP.callApi('sm/auth/login', 'post', body).then(response => {
            if (response.status === 200) {
                AsyncStorage.setItem('userToken', response.data.access_token)
                dispatch({ type: Types.LOGIN_SUCCESS, userToken: response.data.access_token });
                return HTTP.callApiWithHeader('profile', 'get', null, false).then(response => {
                    if (response.status === 401) {
                        AsyncStorage.removeItem('userToken')
                        dispatch({ type: Types.RESTORE_TOKEN, userToken: null, isFirstTime });
                    } else {
                        dispatch({ type: Types.UPDATE_PROFILE, data: response.data });
                    }
                }).catch(function (error) {
                    AsyncStorage.removeItem('userToken')
                    dispatch({ type: Types.RESTORE_TOKEN, userToken: null, isFirstTime });
                });
            } else {
                Alert.alert(
                    'Thông báo',
                    'Đăng nhập thất bại!',
                    [
                        { text: 'OK', onPress: () => null, style: 'cancel' },
                    ],
                    { cancelable: false },
                );
            }
        }).catch(function (error) {

        });
    }
}

export const actSubmitRegister = (body) => {
    return dispatch => {
        return HTTP.callApi('sm/auth/register', 'post', body).then(response => {
            if (response.status === 200) {
                return HTTP.callApi('auth/login', 'post', { phone: body.phone, password: body.password }).then(response => {
                    if (response.status === 200) {
                        AsyncStorage.setItem('userToken', response.data.access_token)
                        dispatch({ type: Types.LOGIN_SUCCESS, userToken: response.data.access_token });
                    } else {
                        Alert.alert(
                            'Thông báo',
                            'Đăng nhập thất bại!',
                            [
                                { text: 'OK', onPress: () => null, style: 'cancel' },
                            ],
                            { cancelable: false },
                        );
                    }
                }).catch(function (error) {

                });
            } else if (response.status === 422) {
                Alert.alert(
                    'Thông báo',
                    response.data.errors[Object.keys(response.data.errors)][0],
                    [
                        { text: 'OK', onPress: () => null, style: 'cancel' },
                    ],
                    { cancelable: false },
                );
            } else {
                Alert.alert(
                    'Thông báo',
                    'Đăng ký thất bại!',
                    [
                        { text: 'OK', onPress: () => null, style: 'cancel' },
                    ],
                    { cancelable: false },
                );
            }
        }).catch(function (error) {

        });
    }
}

export const actSignOut = () => {
    return dispatch => {
        AsyncStorage.removeItem('userToken')
        dispatch({ type: Types.SIGN_OUT });
    }
}

export const actSetDataMyLocation = (location) => {
    return dispatch => {
        dispatch({ type: Types.SET_DATA_MY_LOCATION, location });
    }
}




