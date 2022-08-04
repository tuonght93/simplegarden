import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector } from "react-redux"
import Header from '../../components/Header'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'


export default function SelectShop({ navigation, route }) {

    const insets = useSafeAreaInsets()

    const shop = useSelector(state => state.shop)

    const onSelect = (item) => {
        route.params['callback'](item)
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <View style={{ height: insets.top }} />
            <Header
                headerText="Chọn cửa hàng"
                leftPress={() => navigation.goBack()}
            />
            <ScrollView style={styles.content} contentContainerStyle={{ paddingHorizontal: 16 }}>
                {
                    shop.shops?.map((item, index) => {
                        return <TouchableOpacity style={styles.boxItemShop} onPress={() => onSelect(item)} key={index}>
                            <View style={styles.boxAddress}>
                                <Image style={styles.icLogo} source={require('../../assets/logo_small.png')} />
                                <Text style={styles.txtAddress}>{item.address}</Text>
                            </View>
                            <View style={styles.boxCheckbox}>
                                {
                                    route.params?.shop?.uuid === item.uuid &&
                                    <Image style={styles.icChecked} source={require('../../assets/ic_checked.png')} />
                                }
                            </View>
                        </TouchableOpacity>
                    })
                }
            </ScrollView>
        </View>
    )
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
    boxItemShop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
    },
    boxAddress: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    icLogo: {
        width: 25,
        height: 25,
        marginRight: 7
    },
    txtAddress: {
        fontSize: 14,
        color: '#2A3B56',
        flex: 1
    },
    boxCheckbox: {
        backgroundColor: '#F6F4F4',
        borderRadius: 12,
        marginLeft: 10,
        width: 24,
        height: 24,
    },
    icChecked: {
        width: 24,
        height: 24,
    },
})