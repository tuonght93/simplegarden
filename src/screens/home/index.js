import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, FlatList, StyleSheet, Image, TouchableOpacity, useWindowDimensions, ScrollView, Platform, Alert } from 'react-native'
import LottieView from 'lottie-react-native'
import { useSelector, useDispatch } from "react-redux"
import Geolocation from '@react-native-community/geolocation'
import { check, PERMISSIONS, RESULTS, openSettings, request } from 'react-native-permissions'
import { actLoadDataProductRequest, actLoadDataMenu } from '../../actions/product'
import { actLoadDataShop } from '../../actions/shop'
import { actSetDataMyLocation } from '../../actions/auth'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import ItemShopHalf from '../../components/shops/ItemShopHalf'
import ItemProductHalf from '../../components/products/ItemProductHalf'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'


export default function Home({ navigation }) {

    const window = useWindowDimensions()

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    const [address, setAddress] = useState('')

    const [dotIndex, setDotIndex] = useState(0)

    const order = useSelector(state => state.order)

    const shop = useSelector(state => state.shop)

    const product = useSelector(state => state.product)

    const auth = useSelector(state => state.auth)

    var total = 0
    order.orders.forEach(order => {
        total = total + order.quantity
    })

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

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(actLoadDataProductRequest())
            await dispatch(actLoadDataShop())
            await dispatch(actLoadDataMenu())
            onGetMyLocation()
            setLoading(false)
        }
        fetchData()
    }, [])

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

    const CarouselItem = ({ item, index }) => {
        return (
            <View style={{ marginHorizontal: 7.5, }}>
                <Image source={{ uri: item.image }} key={index} aspectRatio={2.11} style={{ width: '100%', borderRadius: 6 }} />
            </View>
        )
    }

    const renderHeader = () => {
        return (
            <>
                <View style={styles.boxSlide}>
                    <Carousel
                        data={images}
                        renderItem={CarouselItem}
                        sliderWidth={window.width}
                        itemWidth={window.width - 45}
                        firstItem={0}
                        inactiveSlideScale={1}
                        onSnapToItem={(index) => setDotIndex(index)}
                        removeClippedSubviews={false}
                        loop
                    />
                    <Pagination
                        dotsLength={images.length}
                        activeDotIndex={dotIndex}
                        dotContainerStyle={{ marginHorizontal: 6 }}
                        dotStyle={{ width: 6, height: 6, borderRadius: 5, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: 'rgba(0, 0, 0, 0.3)' }}
                        inactiveDotStyle={{ width: 5, height: 5, borderRadius: 5, backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
                        containerStyle={{ paddingTop: 12, paddingBottom: 6 }}
                        inactiveDotScale={1}
                    />
                </View>
                <View style={styles.boxTitle}>
                    <Text style={styles.txtShop}>Cửa hàng</Text>
                    <TouchableOpacity style={styles.btnSeeAll} onPress={() => navigation.navigate('shop')}>
                        <Text style={styles.txtSeeAll}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.boxShop}>
                    <View style={styles.boxListShop}>
                        {
                            shop.shops.map((item, index) => {
                                return <ItemShopHalf item={item} key={index} navigation={navigation} />
                            })
                        }
                    </View>
                    <TouchableOpacity style={styles.boxViewMore}>
                        <Image style={styles.icPaperPlane} source={require('../../assets/ic_paper_plane.png')} />
                        <Text style={styles.txtNearShop}>Cửa hàng gần đây</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.boxTitle}>
                    <Text style={styles.txtShop}>Menu</Text>
                    <TouchableOpacity style={styles.btnSeeAll} onPress={() => navigation.navigate('order', {
                        screen: 'Order',
                        params: { category_uuid: '' }
                    })}>
                        <Text style={styles.txtSeeAll}>Xem tất cả</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.boxProduct}>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.boxListMenu}>
                        {
                            product.categories?.map((item, index) => {
                                return <TouchableOpacity style={styles.boxItemMenu} key={index} onPress={() => navigation.navigate('order', {
                                    screen: 'Order',
                                    params: { category_uuid: item.uuid }
                                })}>
                                    <View style={styles.bgMenu}>
                                        <Image source={require('../../assets/ic_menu.png')} style={styles.icMenu} />
                                    </View>
                                    <Text style={styles.txtMenuName} numberOfLines={1}>{item.name}</Text>
                                </TouchableOpacity>
                            })
                        }
                    </ScrollView>
                </View>
            </>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor="#1B4731" />
            <View style={styles.content}>
                <View style={styles.boxHeader}>
                    <View style={styles.boxHeaderLeft}>
                        <Image style={styles.avatar} source={{ uri: auth.user?.avatar }} />
                        <Text style={styles.txtName} numberOfLines={1}>{auth.user?.display_name}</Text>
                    </View>
                    <TouchableOpacity style={styles.boxHeaderRight} activeOpacity={1} onPress={() => navigation.navigate('order', {
                        screen: 'Order',
                        params: { category_uuid: '' }
                    })}>
                        <Image style={styles.icSearch} source={require('../../assets/ic_search.png')} />
                    </TouchableOpacity>
                </View>
                <View style={styles.boxAddress}>
                    <Image style={styles.icPositionPin} source={require('../../assets/ic_position_pin.png')} />
                    <Text style={styles.txtAddress}>{address}</Text>
                </View>
                {
                    loading ?
                        <View style={[styles.boxListProduct, { marginTop: 16 }]}>
                            <View style={{ width: '48%' }}>
                                <LottieView source={require('../../assets/product-loading.json')} autoPlay loop style={{ width: '100%', marginBottom: 16, aspectRatio: 1 }} resizeMode='cover' />
                            </View>
                            <View style={{ width: '48%' }}>
                                <LottieView source={require('../../assets/product-loading.json')} autoPlay loop style={{ width: '100%', marginBottom: 16, aspectRatio: 1 }} resizeMode='cover' />
                            </View>
                            <View style={{ width: '48%' }}>
                                <LottieView source={require('../../assets/product-loading.json')} autoPlay loop style={{ width: '100%', marginBottom: 16, aspectRatio: 1 }} resizeMode='cover' />
                            </View>
                            <View style={{ width: '48%' }}>
                                <LottieView source={require('../../assets/product-loading.json')} autoPlay loop style={{ width: '100%', marginBottom: 16, aspectRatio: 1 }} resizeMode='cover' />
                            </View>
                            <View style={{ width: '48%' }}>
                                <LottieView source={require('../../assets/product-loading.json')} autoPlay loop style={{ width: '100%', marginBottom: 16, aspectRatio: 1 }} resizeMode='cover' />
                            </View>
                            <View style={{ width: '48%' }}>
                                <LottieView source={require('../../assets/product-loading.json')} autoPlay loop style={{ width: '100%', marginBottom: 16, aspectRatio: 1 }} resizeMode='cover' />
                            </View>
                            <View style={{ width: '48%' }}>
                                <LottieView source={require('../../assets/product-loading.json')} autoPlay loop style={{ width: '100%', marginBottom: 16, aspectRatio: 1 }} resizeMode='cover' />
                            </View>
                            <View style={{ width: '48%' }}>
                                <LottieView source={require('../../assets/product-loading.json')} autoPlay loop style={{ width: '100%', marginBottom: 16, aspectRatio: 1 }} resizeMode='cover' />
                            </View>
                        </View>
                        :

                        <FlatList
                            contentContainerStyle={{ paddingBottom: 90 }}
                            data={product.products}
                            ListHeaderComponent={renderHeader}
                            renderItem={({ item }) => {
                                return <ItemProductHalf item={item} navigation={navigation} />
                            }}
                            columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
                            numColumns={2}
                            keyExtractor={(item, index) => index.toString()}
                            directionalLockEnabled={true}
                        />
                }
                <TouchableOpacity disabled={total === 0} style={styles.boxOrder} onPress={() => navigation.navigate('Checkout')}>
                    <View>
                        <Image source={require('../../assets/ic_shopping_bag.png')} style={styles.icBag} />
                        <View style={styles.boxTotal}>
                            <Text style={styles.txtTotal}>{total}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1B4731',
        flex: 1,
    },
    content: {
        backgroundColor: '#F6F4F4',
        flex: 1,
    },
    boxHeader: {
        backgroundColor: '#1B4731',
        height: 66,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16
    },
    boxHeaderLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        marginRight: 15,
        borderRadius: 20,
        backgroundColor: '#bdbdbd',
    },
    txtName: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1
    },
    boxHeaderRight: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    icSearch: {
        width: 25,
        height: 25,
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
    boxSlide: {
        backgroundColor: '#FFFFFF',
    },
    boxTitle: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    txtShop: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2A3B56'
    },
    txtSeeAll: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#2A3B56'
    },
    boxShop: {
        padding: 16,
        backgroundColor: '#F6F4F4',
    },
    boxListShop: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexGrow: 2,
        justifyContent: 'space-between',
    },
    boxViewMore: {
        marginTop: 12,
        height: 36,
        borderRadius: 6,
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#1B4731',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    icPaperPlane: {
        width: 11,
        height: 11,
        marginRight: 6
    },
    txtNearShop: {
        fontSize: 12,
        fontWeight: 'bold',
        color: '#1B4731'
    },
    boxProduct: {
        backgroundColor: '#F6F4F4',
        paddingBottom: 20
    },
    boxListMenu: {
        marginVertical: 16,
        paddingLeft: 16,
    },
    boxItemMenu: {
        width: 80,
        alignItems: 'center',
        marginRight: 20
    },
    bgMenu: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 10,
        backgroundColor: '#FEDEA0',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icMenu: {
        width: 24,
        height: 39,
    },
    txtMenuName: {
        fontSize: 14,
        color: '#2A3B56',
    },
    boxListProduct: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        flexGrow: 2,
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    boxOrder: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#1B4731',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    icBag: {
        width: 24,
        height: 25
    },
    boxTotal: {
        position: 'absolute',
        bottom: -8,
        right: -8,
        backgroundColor: '#FEDEA0',
        alignItems: 'center',
        justifyContent: 'center',
        width: 16,
        height: 16,
        borderRadius: 8
    },
    txtTotal: {
        fontSize: 12,
        color: '#1B4731'
    },
})