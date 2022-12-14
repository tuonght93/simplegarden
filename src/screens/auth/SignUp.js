import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, TextInput, KeyboardAvoidingView, Animated, Keyboard, Platform } from 'react-native';
import { useDispatch } from "react-redux";
import { actSubmitRegister } from '../../actions/auth';
import Header from '../../components/Header';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Loading from '../../components/Loading';

export default function SignIn({navigation}) {

    const marginBottomHeight = useRef(new Animated.Value(48)).current;

    const [loading, setLoading] = useState(false)

    const [phone, setPhone] = useState('')

    const [email, setEmail] = useState('')

    const [display_name, setName] = useState('')

    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    useEffect(() => {
        const eventShow = Platform.OS === 'ios' ? "keyboardWillShow" : "keyboardDidShow"
        const eventHide = Platform.OS === 'ios' ? "keyboardWillHide" : "keyboardDidHide"
        Keyboard.addListener(eventShow, _keyboardWillShow);
        Keyboard.addListener(eventHide, _keyboardWillHide);
        return () => {
            Keyboard.removeListener(eventShow, _keyboardWillShow);
            Keyboard.removeListener(eventHide, _keyboardWillHide);
        };
    }, []);

    const _keyboardWillShow = (event) => {
        Animated.parallel([
            Animated.timing(marginBottomHeight, {
                duration: event.duration,
                toValue: 0,
                useNativeDriver: false,
            }),
        ]).start();
    };

    const _keyboardWillHide = (event) => {
        Animated.parallel([
            Animated.timing(marginBottomHeight, {
                duration: event.duration,
                toValue: 48,
                useNativeDriver: false,
            }),
        ]).start();
    };

    const onSubmitRegister = async (body) => {
        setLoading(true)
        await dispatch(actSubmitRegister(body))
        setLoading(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            {
                loading &&
                <Loading />
            }
            <Header leftPress={() => navigation.goBack()} />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : null} style={{ flex: 1, alignSelf: 'stretch' }}>
                <ScrollView style={styles.boxContent} keyboardShouldPersistTaps="handled" bounces={false}>
                    <Animated.View style={[styles.boxLogo,{marginBottom: marginBottomHeight}]}>
                        <Image source={require('../../assets/logo.png')} style={styles.logo} />
                    </Animated.View>
                    <View style={styles.boxButton}>
                        <Text style={styles.txtTitle}>????ng k??</Text>
                        <View style={styles.boxInput}>
                            <Image source={require('../../assets/ic_phone.png')} style={styles.icUsername} />
                            <TextInput
                                style={styles.ipContent}
                                selectionColor="#2A3B56"
                                value={phone}
                                onChangeText={(phone) => setPhone(phone)}
                                placeholder="S??? ??i???n tho???i"
                                placeholderTextColor="#BDBDBD"
                                keyboardType="number-pad"
                            />
                        </View>
                        <View style={styles.boxInput}>
                            <Image source={require('../../assets/ic_username.png')} style={styles.icUsername} />
                            <TextInput
                                style={styles.ipContent}
                                selectionColor="#2A3B56"
                                value={email}
                                onChangeText={(email) => setEmail(email)}
                                placeholder="Email"
                                placeholderTextColor="#BDBDBD"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.boxInput}>
                            <Image source={require('../../assets/ic_username.png')} style={styles.icUsername} />
                            <TextInput
                                style={styles.ipContent}
                                selectionColor="#2A3B56"
                                value={display_name}
                                onChangeText={(display_name) => setName(display_name)}
                                placeholder="T??n hi???n th???"
                                placeholderTextColor="#BDBDBD"
                            />
                        </View>
                        <View style={styles.boxInput}>
                            <Image source={require('../../assets/ic_password.png')} style={styles.icPassword} />
                            <TextInput
                                style={styles.ipContent}
                                selectionColor="#2A3B56"
                                value={password}
                                onChangeText={(password) => setPassword(password)}
                                placeholder="M???t kh???u"
                                placeholderTextColor="#BDBDBD"
                                secureTextEntry
                            />
                        </View>
                        <TouchableOpacity disabled={phone === '' || email === '' || display_name === '' || password === ''} style={[styles.btnSignIn, phone === '' || email === '' || display_name === '' || password === '' ? {backgroundColor: '#bdbdbd'} : {}]} onPress={() => onSubmitRegister({phone, email, display_name, password})}>
                            <Text style={styles.txtSignIn}>????ng k??</Text>
                        </TouchableOpacity>
                        <Text style={styles.txtForgotPassword} onPress={() => navigation.navigate('ForgotPassword')}>Qu??n m???t kh???u?</Text>
                    </View>
                    <View style={styles.boxLine}>
                        <View style={styles.hr} />
                        <Text style={styles.txtConnect}>Ho???c k???t n???i v???i</Text>
                        <View style={styles.hr} />
                    </View>
                    <View style={styles.boxSocial}>
                        <TouchableOpacity style={styles.btnSocial}>
                            <Image source={require('../../assets/ic_facebook.png')} style={styles.icSocial} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnSocial}>
                            <Image source={require('../../assets/ic_google.png')} style={styles.icSocial} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnSocial}>
                            <Image source={require('../../assets/ic_apple.png')} style={styles.icSocial} />
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
    boxLogo: {
        alignItems: 'center',
        marginBottom: 48
    },
    logo: {
        width: 87,
        height: 87,
    },
    boxButton: {
        paddingHorizontal: 16,
        paddingVertical: 20,
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
    txtForgotPassword: {
        color: '#8A94A3',
        fontSize: 14,
        alignSelf: 'flex-end'
    },
    boxLine: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    hr: {
        flex: 1,
        height: 1,
        backgroundColor: '#D8D8D8',
    },
    txtConnect: {
        fontSize: 14,
        color: '#8A94A3',
        paddingHorizontal: 10
    },
    boxSocial: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 20
    },
    btnSocial: {
        marginHorizontal: 6
    },
    icSocial: {
        width: 40,
        height: 40
    },
})