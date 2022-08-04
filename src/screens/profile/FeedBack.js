import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, TextInput, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import Header from '../../components/Header';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

export default function FeedBack({ navigation }) {

    const [name, setName] = useState('')

    const [phone, setPhone] = useState('')

    const [email, setEmail] = useState('')

    const [content, setContent] = useState('')

    return (
        <SafeAreaView style={styles.container}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <Header leftPress={() => navigation.goBack()} headerText='Góp ý' />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1, alignSelf: 'stretch' }}>
                <ScrollView style={styles.boxContent} keyboardShouldPersistTaps="handled" bounces={false}>
                    <View style={styles.boxButton}>
                        <Text style={styles.txtTitle}>Họ và tên</Text>
                        <View style={styles.boxInput}>
                            <TextInput
                                style={styles.ipContent}
                                selectionColor="#2A3B56"
                                value={name}
                                onChangeText={(name) => setName(name)}
                                placeholder="Nhập họ tên"
                                placeholderTextColor="#BDBDBD"
                            />
                        </View>
                        <Text style={styles.txtTitle}>Số điện thoại</Text>
                        <View style={styles.boxInput}>
                            <TextInput
                                style={styles.ipContent}
                                selectionColor="#2A3B56"
                                value={phone}
                                onChangeText={(phone) => setPhone(phone)}
                                placeholder="Nhập số điện thoại"
                                placeholderTextColor="#BDBDBD"
                            />
                        </View>
                        <Text style={styles.txtTitle}>Email</Text>
                        <View style={styles.boxInput}>
                            <TextInput
                                style={styles.ipContent}
                                selectionColor="#2A3B56"
                                value={email}
                                onChangeText={(email) => setEmail(email)}
                                placeholder="Nhập email"
                                placeholderTextColor="#BDBDBD"
                                keyboardType="email-address"
                            />
                        </View>
                        <Text style={styles.txtTitle}>Nội dung</Text>
                        <View style={[styles.boxInput, { height: 'auto' }]}>
                            <TextInput
                                style={[styles.ipContent, { height: 160, textAlignVertical: 'top' }]}
                                selectionColor="#2A3B56"
                                value={content}
                                onChangeText={(content) => setContent(content)}
                                placeholder="Nhập nội dung"
                                placeholderTextColor="#BDBDBD"
                                multiline
                            />
                        </View>
                        <TouchableOpacity style={styles.btnSignIn} onPress={() => null}>
                            <Text style={styles.txtSignIn}>Gửi</Text>
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