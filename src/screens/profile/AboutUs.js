import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import Header from '../../components/Header';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';


export default function Checkout({ navigation }) {

    const isFocused = useIsFocused();

    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <View style={{ height: insets.top }} />
            <Header
                headerText="Về chúng tôi"
                leftPress={() => navigation.goBack()}
            />
            <ScrollView style={styles.content} contentContainerStyle={{ paddingHorizontal: 16 }}>
                <Text style={styles.txtContent}>Được xây dựng từ giữa năm 2020, Việt Nam, Gọi đồ online là cộng đồng tin cậy cho mọi người có thể tìm kiếm, đánh giá, bình luận các địa điểm ăn uống: nhà hàng, quán ăn, cafe, bar, karaoke, tiệm bánh, khu du lịch... tại Việt Nam - từ website hoặc ứng dụng di động. Tất cả thành viên từ Bắc đến Nam, Gọi đồ online kết nối những thực khách đến với các địa điểm ăn uống lớn nhỏ cả đất nước. Đến thời điểm hiện tại, Gọi đồ online với hàng trăm ngàn địa điểm và hàng trăm ngàn bình luận, hình ảnh tại Việt Nam, ở hầu hết các tỉnh thành. Gọi đồ online là cách dễ nhất để bạn có thể tìm kiếm và lựa chọn địa điểm tốt nhất cho mình và bạn bè.</Text>
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
    txtContent: {
        fontSize: 14,
        color: '#8A94A3',
        paddingVertical: 16,
        textAlign: 'justify'
    }
})