import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import Header from '../../components/Header';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

export default function ForgotPassword({ navigation }) {


    const [old_password, setOldPassword] = useState('')

    const [password, setPassword] = useState('')

    const [password_confirmation, setPasswordConfirmation] = useState('')

    return (
        <SafeAreaView style={styles.container}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <Header leftPress={() => navigation.goBack()} headerText='Thay đổi mật khẩu' />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1, alignSelf: 'stretch' }}>
                <ScrollView style={styles.boxContent} keyboardShouldPersistTaps="handled" bounces={false}>
                    <View style={styles.boxButton}>
                        <Text style={styles.txtTitle}>Mật khẩu cũ</Text>
                        <View style={[styles.boxInput, { marginBottom: 10 }]}>
                            <Image source={require('../../assets/ic_password.png')} style={styles.icPassword} />
                            <TextInput
                                style={styles.ipContent}
                                selectionColor="#2A3B56"
                                value={old_password}
                                onChangeText={(old_password) => setOldPassword(old_password)}
                                placeholder="Mật khẩu cũ"
                                placeholderTextColor="#BDBDBD"
                                secureTextEntry
                            />
                        </View>
                        <Text style={styles.txtTitle}>Tạo mật khẩu mới</Text>
                        <View style={styles.boxInput}>
                            <Image source={require('../../assets/ic_password.png')} style={styles.icPassword} />
                            <TextInput
                                style={styles.ipContent}
                                selectionColor="#2A3B56"
                                value={password}
                                onChangeText={(password) => setPassword(password)}
                                placeholder="Mật khẩu mới"
                                placeholderTextColor="#BDBDBD"
                                secureTextEntry
                            />
                        </View>
                        <View style={styles.boxInput}>
                            <Image source={require('../../assets/ic_password.png')} style={styles.icPassword} />
                            <TextInput
                                style={styles.ipContent}
                                selectionColor="#2A3B56"
                                value={password_confirmation}
                                onChangeText={(password_confirmation) => setPasswordConfirmation(password_confirmation)}
                                placeholder="Nhập lại mật khẩu mới"
                                placeholderTextColor="#BDBDBD"
                                secureTextEntry
                            />
                        </View>
                        <TouchableOpacity style={styles.btnSignIn} onPress={() => null}>
                            <Text style={styles.txtSignIn}>Cập nhật</Text>
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
        paddingVertical: 20,
    },
    txtTitle: {
        paddingTop: 20,
        paddingBottom: 10,
        color: '#8A94A3',
        fontSize: 12,
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
    icPassword: {
        width: 14,
        height: 18,
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