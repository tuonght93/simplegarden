import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, StatusBar, TextInput } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AirbnbRating } from 'react-native-ratings';
import Header from '../../components/Header';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

export default function RatingShipper({ navigation }) {

    const [rate, setRate] = useState(0);

    const [content, setContent] = useState(0);

    const insets = useSafeAreaInsets();

    return (
        <View style={styles.container}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <View style={{ height: insets.top }} />
            <Header
                headerText="Đánh giá shipper"
                leftPress={() => navigation.goBack()}
            />
            <ScrollView style={styles.content} contentContainerStyle={{paddingHorizontal: 16}}>
                <View style={styles.boxInfoShipper}>
                    <Image style={styles.avatar} source={{ uri: 'https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-1/p480x480/47577151_1932725243507478_3133480235035525120_n.jpg?_nc_cat=107&_nc_sid=dbb9e7&_nc_ohc=klCHSU_nVBkAX8nfYpX&_nc_ht=scontent.fhan2-3.fna&_nc_tp=6&oh=7f48be9fb8b425d03b16bf19742c0662&oe=5F2EA486' }} />
                    <View style={styles.boxTitle}>
                        <Text style={styles.txtName}>Nguyễn Phi Tường</Text>
                        <Text style={styles.txtStatus}>Shipper - Đang giao</Text>
                        <AirbnbRating
                            count={5}
                            defaultRating={rate}
                            showRating={false}
                            size={20}
                            onFinishRating={(position) => setRate(position)}
                            selectedColor={null}
                            starContainerStyle={{alignSelf: 'flex-start', marginTop: 16}}
                        />
                    </View>
                </View>
                <Text style={styles.txtTitle}>Vui lòng đánh giá để chúng tôi cải thiện chất lượng dịch vụ</Text>
                <TextInput
                    style={styles.ipContent}
                    selectionColor="#2A3B56"
                    value={content}
                    onChangeText={(content) => setContent(content)}
                    placeholder="Nhập nội dung"
                    placeholderTextColor="#8A94A3"
                    multiline
                />
                <TouchableOpacity style={styles.btnSubmit} onPress={() => null}>
                        <Text style={styles.txtSubmit}>Tiếp tục</Text>
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
    boxInfoShipper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 24
    },
    avatar: {
        width: 90,
        height: 90,
        borderRadius: 45,
        marginRight: 20
    },
    boxTitle: {
        flex: 1
    },
    txtName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2A3B56',
        paddingBottom: 3
    },
    txtStatus: {
        fontSize: 12,
        color: '#8A94A3'
    },
    txtTitle: {
        fontSize: 12,
        color: '#8A94A3',
        marginVertical: 12
    },
    ipContent: {
        height: 150,
        textAlignVertical: 'top',
        borderRadius: 6,
        backgroundColor: '#F6F4F4',
        paddingHorizontal: 20,
        fontSize: 14,
        marginBottom: 20
    },
    btnSubmit: {
        height: 50,
        borderRadius: 6,
        backgroundColor: '#1B4731',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtSubmit: {
        fontSize: 16,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
})