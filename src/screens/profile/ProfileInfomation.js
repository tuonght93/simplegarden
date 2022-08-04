import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector } from "react-redux";
import Header from '../../components/Header';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

export default function ProfileInfomation({ navigation }) {

    const insets = useSafeAreaInsets();

    const user = useSelector(state => state.auth.user);

    return (
        <View style={styles.container}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <View style={{ height: insets.top }} />
            <Header headerText="Thông tin của tôi" leftPress={() => navigation.goBack()} />
            <ScrollView style={styles.content} contentContainerStyle={{ paddingHorizontal: 16 }}>
                <View style={styles.boxInfo}>
                    <Image style={styles.avatar} source={{ uri: user.avatar }} />
                    <View style={styles.boxDataInfo}>
                        <Text style={styles.txtName}>{user.display_name}</Text>
                        <Text style={styles.txtPhone}>{user.phone}</Text>
                    </View>
                </View>
                <View style={styles.boxMenu}>
                    <Text style={styles.txtLabel}>Tên hiển thị</Text>
                    <Text style={styles.txtValue} numberOfLines={1}>{user.display_name}</Text>
                </View>
                <View style={styles.boxMenu}>
                    <Text style={styles.txtLabel}>Số điện thoại</Text>
                    <Text style={styles.txtValue} numberOfLines={1}>{user.phone}</Text>
                </View>
                <View style={styles.boxMenu}>
                    <Text style={styles.txtLabel}>Email</Text>
                    <Text style={styles.txtValue} numberOfLines={1}>{user.email}</Text>
                </View>
                <View style={styles.boxMenu}>
                    <Text style={styles.txtLabel}>Địa điểm của tôi</Text>
                    <View style={styles.boxAddress}>
                    <Text style={[styles.txtValue, {flex: 1}]} numberOfLines={1}>9 West 46th Street Ha Noi Viet Nam</Text>
                    <Image style={styles.icNext} source={require('../../assets/ic_next.png')} />
                    </View>
                </View>
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
        paddingTop: 17,
        paddingBottom: 70,
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
        color: '#8A94A3',
        flex: 0.3
    },
    txtValue: {
        fontSize: 14,
        fontWeight: 'normal',
        color: '#2A3B56',
        flex: 0.7,
        textAlign: 'right'
    },
    icNext: {
        width: 5,
        height: 11,
        marginLeft: 10
    },
    boxAddress: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 0.7,
        justifyContent: 'flex-end'
    }
})