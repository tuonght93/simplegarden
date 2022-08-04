import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
import Header from '../../components/Header';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

export default function ForgotPassword({navigation}) {

    const [phone, setPhone] = useState('')

    return (
        <SafeAreaView style={styles.container}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <Header leftPress={() => navigation.goBack()} />
            <KeyboardAvoidingView
                behavior='padding' style={{ flex: 1, alignSelf: 'stretch' }}>
                <ScrollView style={styles.boxContent} keyboardShouldPersistTaps="handled" bounces={false}>
                    <View style={styles.boxButton}>
                        <Text style={styles.txtTitle}>Đăng nhập</Text>
                        <Text style={styles.txtPlaceholder}>Nhập số điện thoại của bạn</Text>
                        <View style={styles.boxInput}>
                            <Image source={require('../../assets/ic_phone.png')} style={styles.icPhone} />
                            <TextInput
                                style={styles.ipContent}
                                selectionColor="#2A3B56"
                                value={phone}
                                onChangeText={(phone) => setPhone(phone)}
                                placeholder="Số điện thoại"
                                placeholderTextColor="#BDBDBD"
                                keyboardType="number-pad"
                            />
                        </View>
                        <TouchableOpacity style={styles.btnSignIn} onPress={() => null}>
                            <Text style={styles.txtSignIn}>Tiếp tục</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    boxContent: {
        flex: 1,
    },
    boxButton: {
        paddingHorizontal: 16,
        paddingBottom: 20,
        paddingTop: 68
    },
    txtTitle: {
        paddingTop: 22,
        paddingBottom: 27,
        color: '#2A3B56',
        fontSize: 36,
        fontWeight: 'bold'
    },
    boxInput: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        backgroundColor: '#F6F4F4',
        borderRadius: 6,
        marginTop: 15
    },
    icUsername: {
        width: 14,
        height: 16,
        marginHorizontal: 20
    },
    icPhone: {
        width: 16,
        height: 16,
        marginHorizontal: 20
    },
    ipContent: {
        fontSize: 14,
        color: '#2A3B56',
        paddingVertical: 15,
        flex: 1
    },
    btnSignIn: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        backgroundColor: '#1B4731',
        marginBottom: 20,
        marginTop: 32
    },
    txtSignIn: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
})