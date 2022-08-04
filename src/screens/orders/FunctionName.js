import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../../components/Header';


export default function Checkout({ navigation }) {

    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <View style={{height: insets.top}} />
            <Header
                icon={require('../../assets/ic_close_black.png')}
                icBack={{ width: 16, height: 16 }}
                headerText="Bộ lọc"
                rightText="Xoá tất cả"
                leftPress={() => navigation.goBack()}
            />
            <ScrollView style={styles.content}>
                
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
})