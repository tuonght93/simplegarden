import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { actSignOut } from '../../actions/auth';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';


export default function Profile({ navigation, route }) {

    const insets = useSafeAreaInsets();

    const dispatch = useDispatch()

    const onSignOut = () => dispatch(actSignOut())

    // if(route.params.screen) {
    //     navigation.navigate(route.params.screen)
    // }

    const user = useSelector(state => state.auth.user);

    return (
        <View style={styles.container}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <View style={{ height: insets.top }} />
            <ScrollView style={styles.content} contentContainerStyle={{ paddingHorizontal: 16 }}>
                <View style={styles.boxInfo}>
                    <Image style={styles.avatar} source={{ uri: user.avatar }} />
                    <View style={styles.boxDataInfo}>
                        <Text style={styles.txtName}>{user.display_name}</Text>
                        <Text style={styles.txtPhone}>{user.phone}</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.boxMenu} onPress={() => navigation.navigate('ProfileInfomation')}>
                    <Text style={styles.txtLabel}>Thông tin của tôi</Text>
                    <Image style={styles.icNext} source={require('../../assets/ic_next.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMenu} onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.txtLabel}>Thay đổi mật khẩu</Text>
                    <Image style={styles.icNext} source={require('../../assets/ic_next.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMenu} onPress={() => navigation.navigate('OrderHistory')}>
                    <Text style={styles.txtLabel}>Lịch sử đặt hàng</Text>
                    <Image style={styles.icNext} source={require('../../assets/ic_next.png')} />
                </TouchableOpacity>
                {/* <TouchableOpacity style={styles.boxMenu} onPress={() => navigation.navigate('MyLocation')}>
                    <Text style={styles.txtLabel}>Địa điểm của tôi</Text>
                    <Image style={styles.icNext} source={require('../../assets/ic_next.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMenu}>
                    <Text style={styles.txtLabel}>Thông báo</Text>
                    <Image style={styles.icNext} source={require('../../assets/ic_next.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMenu} onPress={() => navigation.navigate('AboutUs')}>
                    <Text style={styles.txtLabel}>Về chúng tôi</Text>
                    <Image style={styles.icNext} source={require('../../assets/ic_next.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxMenu} onPress={() => navigation.navigate('FeedBack')}>
                    <Text style={styles.txtLabel}>Góp ý</Text>
                    <Image style={styles.icNext} source={require('../../assets/ic_next.png')} />
                </TouchableOpacity> */}
                <TouchableOpacity style={styles.boxMenu} onPress={onSignOut}>
                    <Text style={styles.txtlogout}>Đăng xuất</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    content: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    boxInfo: {
        paddingTop: 70,
        paddingBottom: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    avatar: {
        width: 120,
        height: 120,
        marginRight: 25,
        borderRadius: 60,
        backgroundColor: '#bdbdbd',
    },
    boxDataInfo: {
        flex: 1
    },
    txtName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2A3B56',
        marginBottom: 5
    },
    txtPhone: {
        fontSize: 12,
        color: '#8A94A3'
    },
    boxMenu: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15
    },
    txtLabel: {
        fontSize: 14,
        color: '#2A3B56'
    },
    icNext: {
        width: 5,
        height: 11
    },
    txtlogout: {
        fontSize: 14,
        color: '#828282'
    }
})