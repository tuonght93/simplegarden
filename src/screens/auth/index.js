import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';

export default function SignInSignUp({navigation}) {

    useEffect(() => {
        LoginManager.logOut();
    }, []);

    const onLoginFacebook = () => {
        LoginManager.logInWithPermissions(["public_profile", "email"]).then(
			(result) => {
				if (result.isCancelled) {
					//alert("Login cancelled");
				} else {
					AccessToken.getCurrentAccessToken().then(
						(data) => {
							const accessToken = data.accessToken.toString()
							if (accessToken) console.log(accessToken)
							else alert('Error')
						}
					)
				}
			},
			(error) => {
				alert("Login fail with error: " + error);
			}
		);
    }
    return (
        <SafeAreaView style={styles.container}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <View style={styles.boxLogo}>
                <Image source={require('../../assets/logo.png')} style={styles.logo} />
            </View>
            <View style={styles.boxContent}>
                <View style={styles.boxButton}>
                    <TouchableOpacity style={styles.btnSignIn} onPress={() => navigation.navigate('SignIn')}>
                        <Text style={styles.txtSignIn}>Đăng nhập</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSignUp} onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.txtSignUp}>Đăng ký</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.boxLine}>
                    <View style={styles.hr} />
                    <Text style={styles.txtConnect}>Hoặc kết nối với</Text>
                    <View style={styles.hr} />
                </View>
                <View style={styles.boxSocial}>
                    <TouchableOpacity style={styles.btnSocial} onPress={onLoginFacebook}>
                        <Image source={require('../../assets/ic_facebook.png')} style={styles.icSocial} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSocial}>
                        <Image source={require('../../assets/ic_google.png')} style={styles.icSocial} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSocial}>
                        <Image source={require('../../assets/ic_apple.png')} style={styles.icSocial} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    boxLogo: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 205,
        height: 205,
        marginTop: 20
    },
    boxContent: {
        flex: 0.5,
    },
    boxButton: {
        paddingHorizontal: 16,
        paddingVertical: 20,
    },
    btnSignIn: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        backgroundColor: '#1B4731',
        marginBottom: 20
    },
    txtSignIn: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    btnSignUp: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6,
        backgroundColor: '#FEDEA0',
    },
    txtSignUp: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1B4731'
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
        alignItems: 'center'
    },
    btnSocial: {
        marginHorizontal: 6
    },
    icSocial: {
        width: 40,
        height: 40
    },
})