import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions, Linking, Platform } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MapView, { Marker, ProviderPropType, PROVIDER_GOOGLE } from 'react-native-maps'
import { useSelector, useDispatch } from "react-redux"
import { check, PERMISSIONS, RESULTS, openSettings, request } from 'react-native-permissions'
import Geolocation from '@react-native-community/geolocation'
import { actSetDataMyLocation } from '../../actions/auth'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import Header from '../../components/Header'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'

const window = Dimensions.get('window')

export default function ShopDetail({ navigation, route }) {

    const dispatch = useDispatch()

    const [dotIndex, setDotIndex] = useState(0)

    const insets = useSafeAreaInsets()

    const data = route.params?.data || {}

    const auth = useSelector(state => state.auth)

    const images = [
        {
            image: 'https://s3.ap-east-1.amazonaws.com/devstatic.comeup.vn/events/2bcd00f3b6e828020b37d10c634e30c9/8898_tytcN2_400x225.png'
        },
        {
            image: 'https://s3.ap-east-1.amazonaws.com/devstatic.comeup.vn/events/a0ed7abe1427fea5a0d3f9794b47dddc/8841_tgRzOt_400x225.png'
        },
        {
            image: 'https://s3.ap-east-1.amazonaws.com/devstatic.comeup.vn/events/f22f983abc98b6f6d4bc4f1b18178fb5/6206_TuzzZg_400x225.png'
        },
        {
            image: 'https://s3.ap-east-1.amazonaws.com/devstatic.comeup.vn/events/55ddc2480b90e16fd2f5a34d99961d79/458_ooPMEM_400x225.png'
        },
        {
            image: 'https://s3.ap-east-1.amazonaws.com/devstatic.comeup.vn/events/55ddc2480b90e16fd2f5a34d99961d79/459_vgHwcO_400x225.png'
        }
    ]

    const CarouselItem = ({ item, index }) => {
        return (
            <TouchableOpacity activeOpacity={1}>
                <Image source={{ uri: item }} key={index} aspectRatio={1.6} style={{ width: '100%' }} />
            </TouchableOpacity>
        )
    }

    const onDirection = () => {
        if (auth.location?.lat) {
            Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${auth.location?.lat},${auth.location?.lng}&destination=${data.lat},${data.lng}`)
        } else {
            onGetMyLocation()
        }
    }

    const onGetMyLocation = () => {
        var permission = Platform.OS === 'ios' ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
        check(permission).then(response => {
            if (response === RESULTS.BLOCKED) {
                alertForLocationPermission()
            } else if (response === RESULTS.GRANTED) {
                Geolocation.getCurrentPosition((position) => {
                    dispatch(actSetDataMyLocation({ lat: position.coords.latitude, lng: position.coords.longitude }))
                    getAddress({ lat: position.coords.latitude, lng: position.coords.longitude })
                },
                    error => console.log(error),
                    {
                        enableHighAccuracy: false,
                        timeout: 2000,
                        maximumAge: 3600000
                    })
            } else if (response === RESULTS.DENIED) {
                request(permission).then(response2 => {
                    if (response2 === RESULTS.GRANTED) {
                        Geolocation.getCurrentPosition((position) => {
                            dispatch(actSetDataMyLocation({ lat: position.coords.latitude, lng: position.coords.longitude }))
                            getAddress({ lat: position.coords.latitude, lng: position.coords.longitude })
                        })
                    }
                },
                    error => console.log(error),
                    {
                        enableHighAccuracy: false,
                        timeout: 2000,
                        maximumAge: 3600000
                    })
            } else {
                alertForLocationPermission()
            }
        });
    }

    const getAddress = async (coords) => {
        const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&key=AIzaSyB-k318-W3CWZg0Y5ZdwrWom5LLDiDJENA&result_type=street_address`;
        try {
            const result = await fetch(apiUrl);
            const json = await result.json();
            console.log(json)
            if (json.status === 'OK') {
                setAddress(json?.results[0]?.formatted_address || '')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const alertForLocationPermission = () => {
        setTimeout(() => {
            Alert.alert(
                'Truy cập vị trí',
                'Chúng tôi cần truy cập vị trí của bạn.',
                [
                    {
                        text: 'Huỷ',
                        style: 'cancel',
                    },
                    { text: 'Vào cài đặt', onPress: () => openSettings() },
                ],
            );
        }, 100)
    }

    return (
        <View style={styles.container}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <View style={{ height: insets.top }} />
            <Header
                headerText={data.contact_name}
                leftPress={() => navigation.goBack()}
            />
            <ScrollView style={styles.content}>
                <View>
                    <Carousel
                        data={[data.logo]}
                        renderItem={CarouselItem}
                        sliderWidth={window.width}
                        itemWidth={window.width}
                        firstItem={0}
                        inactiveSlideScale={1}
                        onSnapToItem={(index) => setDotIndex(index)}
                        removeClippedSubviews={false}
                    />
                    <Pagination
                        dotsLength={images.length}
                        activeDotIndex={dotIndex}
                        dotContainerStyle={{ marginHorizontal: 6 }}
                        dotStyle={{ width: 6, height: 6, borderRadius: 5, backgroundColor: 'transparent', borderWidth: 1, borderColor: '#FFFFFF' }}
                        inactiveDotStyle={{ width: 5, height: 5, borderRadius: 5, backgroundColor: '#FFFFFF' }}
                        containerStyle={{ paddingTop: 12, paddingBottom: 6, position: 'absolute', bottom: 0, alignSelf: 'center' }}
                        inactiveDotScale={1}
                    />
                </View>
                <View style={styles.boxContent}>
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        initialRegion={{
                            latitude: data.lat,
                            longitude: data.lng,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                        style={{ height: 130, marginBottom: 18 }}
                    >
                        <Marker
                            coordinate={{ latitude: data.lat, longitude: data.lng }}
                        >
                            <Image style={{ width: 36, height: 45 }} source={require('../../assets/ic_pin_logo.png')} />
                        </Marker>
                    </MapView>
                    <TouchableOpacity style={styles.btnFindWay} onPress={onDirection}>
                        <Text style={styles.txtFindWay}>Chỉ đường đến đây</Text>
                    </TouchableOpacity>
                    <View style={styles.boxInfomation}>
                        <Text style={styles.txtLabel}>Địa chỉ</Text>
                        <View style={styles.boxLeft}>
                            <View style={styles.boxAddress}>
                                <Image style={styles.icPositionPin} source={require('../../assets/ic_position_pin.png')} />
                                <Text style={styles.txtAddress}>{data.address}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.boxInfomation}>
                        <Text style={styles.txtLabel}>Giờ mở cửa</Text>
                        <View style={styles.boxLeft}>
                            <View style={styles.boxAddress}>
                                <Image style={styles.icClock} source={require('../../assets/ic_clock.png')} />
                                <Text style={styles.txtAddress}>7:00 - 22:00</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.boxInfomation}>
                        <Text style={styles.txtLabel}>Liên hệ</Text>
                        <View style={styles.boxLeft}>
                            <View style={styles.boxAddress}>
                                <Image style={styles.icPhone} source={require('../../assets/ic_phone_shop.png')} />
                                <Text style={styles.txtAddress}>{data.contact_phone}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

ShopDetail.propTypes = {
    provider: ProviderPropType,
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
    boxContent: {
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    btnFindWay: {
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#1B4731',
        borderRadius: 6,
        marginBottom: 15
    },
    txtFindWay: {
        color: '#1B4731',
        fontSize: 12,
        fontWeight: 'bold'
    },
    boxInfomation: {
        paddingVertical: 12,
    },
    txtLabel: {
        fontSize: 12,
        color: '#8A94A3'
    },
    boxAddress: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
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
    icClock: {
        width: 18,
        height: 18,
        marginRight: 12
    },
    icPhone: {
        width: 19,
        height: 18,
        marginRight: 12
    },
})