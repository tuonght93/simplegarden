import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import AppIntroSlider from 'react-native-app-intro-slider';
import { useDispatch } from "react-redux";
import { actGoToLogin } from '../../actions/auth';

export default function Intro({ navigation }) {

    const dispatch = useDispatch()

    const slides = [
        {
            key: 'one',
            title: 'Gọi đồ dễ dàng',
            text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat ',
            image: require('../../assets/splash1.png'),
            width: 177,
            height: 178
        },
        {
            key: 'two',
            title: 'Thanh toán tiện lợi',
            text: 'Other cool stuff',
            image: require('../../assets/splash2.png'),
            width: 170,
            height: 133
        },
        {
            key: 'three',
            title: 'Ship tận nơi',
            text: 'I\'m already out of descriptions\nLorem ipsum bla bla bla',
            image: require('../../assets/splash3.png'),
            width: 261,
            height: 140
        }
    ];

    _renderItem = ({ item }) => {
        return (
            <View style={styles.slide}>
                <View style={styles.boxImage}>
                    <Image source={item.image} style={{ width: item.width, height: item.height }} />
                </View>
                <View style={styles.boxContent}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.text}>{item.text}</Text>
                    {
                        item.key === 'three' &&
                        <TouchableOpacity style={styles.boxStart} onPress={_onDone}>
                            <Text style={styles.txtStart}>Bắt đầu</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        );
    }

    _onDone = () => {
        AsyncStorage.setItem('isFirstTime', '1');
        dispatch(actGoToLogin())
    }

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#1B4731" />
            <AppIntroSlider renderItem={_renderItem} data={slides} showDoneButton={false} showNextButton={false} dotStyle={{ backgroundColor: 'rgba(246, 244, 244, 0.5)', }} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    slide: {
        flex: 1,
        backgroundColor: '#1B4731'
    },
    boxImage: {
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    boxContent: {
        flex: 0.5,
        alignItems: 'center',
        marginTop: 50,
        paddingHorizontal: 20
    },
    title: {
        fontSize: 26,
        color: '#FFFFFF',
        marginBottom: 15,
        textAlign: 'center'
    },
    text: {
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    boxStart: {
        width: 177,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FEDEA0',
        borderRadius: 6,
        marginTop: 55
    },
    txtStart: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1B4731'
    },
})