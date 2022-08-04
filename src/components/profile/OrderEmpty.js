import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';


export default function OrderEmpty() {

    return (
        <View style={styles.container}>
            <Image style={styles.icEmpty} source={require('../../assets/ic_empty_order.png')} />
            <Text style={styles.txtContent}>{'Không có đơn đặt hàng nào được đặt.\nKhám phá và đặt hàng ngay.'}</Text>
            <TouchableOpacity style={styles.btnOrderNow}>
                <Text style={styles.txtOrderNow}>Đặt hàng ngay</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        justifyContent: 'center',
    },
    icEmpty: {
        width: 130,
        height: 130,
        marginBottom: 25,
        alignSelf: 'center'
    },
    txtContent: {
        fontSize: 14,
        color: '#8A94A3',
        marginBottom: 30,
        marginHorizontal: 30,
        textAlign: 'center'
    },
    btnOrderNow: {
        marginVertical: 16,
        backgroundColor: '#1B4731',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 6,
        marginHorizontal: 30,
    },
    txtOrderNow: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
})