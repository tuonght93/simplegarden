import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import MapView, { Marker, ProviderPropType, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '../../components/Header';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';


export default function MyLocation({ navigation }) {

    const input = useRef(null);

    const [keyword, setKeyword] = useState('')

    const [isVisible, setVisible] = useState(true)

    const insets = useSafeAreaInsets();
    
        useEffect(() => {
            if(Platform.OS === 'android') {
            const eventShow = "keyboardDidShow"
            const eventHide = "keyboardDidHide"
            Keyboard.addListener(eventShow, _keyboardWillShow);
            Keyboard.addListener(eventHide, _keyboardWillHide);
            return () => {
                Keyboard.removeListener(eventShow, _keyboardWillShow);
                Keyboard.removeListener(eventHide, _keyboardWillHide);
            };
        }
        }, []);

    const _keyboardWillShow = (event) => {
        setVisible(false)
    };

    const _keyboardWillHide = (event) => {
        setVisible(true)
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
                <View style={{ height: insets.top }} />
                <Header
                    headerText="Địa điểm của tôi"
                    leftPress={() => navigation.goBack()}
                />
                <View style={styles.content}>
                    <View style={styles.boxMaps}>
                        <TouchableOpacity style={styles.boxSearch} onPress={() => input.current?.focus()}>
                            <View style={styles.bgSearch}>
                                <Image style={styles.icSearch} source={require('../../assets/ic_search_gray.png')} />
                                <TextInput
                                ref={input}
                                    style={styles.ipContent}
                                    selectionColor="#2A3B56"
                                    value={keyword}
                                    onChangeText={(keyword) => setKeyword(keyword)}
                                    placeholder="Tìm địa điểm"
                                    placeholderTextColor="#BDBDBD"
                                    onSubmitEditing={() => null}
                                />
                            </View>
                        </TouchableOpacity>
                        <View style={styles.boxAddress}>
                            <Image style={styles.icPositionPin} source={require('../../assets/ic_position_pin.png')} />
                            <Text style={styles.txtAddress}>Ngõ 119 Hồ Đắc Di, Đống Đa, Hà Nội</Text>
                        </View>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            initialRegion={{
                                latitude: 21.037250,
                                longitude: 105.814992,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            style={{ flex: 1 }}
                            showsUserLocation={true}
                            showsMyLocationButton={false}
                        >
                            <Marker
                                coordinate={{ latitude: 21.037250, longitude: 105.814992 }}
                            >
                                <Image style={{ width: 36, height: 45 }} source={require('../../assets/ic_pin_logo.png')} />
                            </Marker>
                        </MapView>
                    </View>
                    {
                        isVisible &&
                        <View style={styles.boxSave}>
                            <TouchableOpacity style={styles.btnSave}>
                                <Text style={styles.txtSave}>Lưu</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

MyLocation.propTypes = {
    provider: ProviderPropType,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    content: {
        backgroundColor: '#FFFFFF',
        flex: 1,
        // justifyContent: 'space-between'
    },
    boxMaps: {
        flex: 1
    },
    boxSearch: {
        backgroundColor: '#F6F4F4',
        paddingVertical: 14,
        paddingHorizontal: 16
    },
    bgSearch: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 16,
        paddingVertical: 16,
        borderRadius: 6
    },
    icSearch: {
        width: 18,
        height: 18,
        marginRight: 10
    },
    ipContent: {
        fontSize: 14,
        color: '#2A3B56',
        flex: 1,
        paddingVertical: 0
    },
    boxAddress: {
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icPositionPin: {
        width: 18,
        height: 18,
        marginRight: 12
    },
    txtAddress: {
        flex: 1,
        fontSize: 14,
        color: '#2A3B56',
        fontFamily: 'SanFranciscoDisplay-Medium'
    },
    boxSave: {
        paddingHorizontal: 16,
        paddingVertical: 20
    },
    btnSave: {
        backgroundColor: '#1B4731',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6
    },
    txtSave: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
})