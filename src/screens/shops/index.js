import React, { useState, useEffect, useRef } from 'react';
import {
    View,
    Text,
    SafeAreaView,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
    UIManager,
    LayoutAnimation,
    Dimensions
} from 'react-native';
import MapView, { Marker, ProviderPropType, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSelector, useDispatch } from "react-redux";
import Carousel from 'react-native-snap-carousel';
// import { actLoadDataShop } from '../../actions/shop';
import { ScrollView } from 'react-native-gesture-handler';
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar';
import Loading from '../../components/Loading';

if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const window = Dimensions.get('window');

export default function Shop({ navigation }) {

    const map = useRef(null);

    const carousel = useRef(null);

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const [city_id, setCity] = useState(0);

    const [district_id, setDistrict] = useState('');

    const [isVisible, setVisible] = useState(false);

    const shop = useSelector(state => state.shop);

    const toggleBox = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setVisible(!isVisible)
    };

    const toggleCity = (id) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setCity(id)
    };

    // const onLoadDataShop = () => dispatch(actLoadDataShop())

    // useEffect(() => {
    //     const fetchData = async () => {
    //         await onLoadDataShop()
    //         setLoading(false)
    //     }
    //     fetchData()
    // }, [])

    const cities = [
        {
            name: 'Hà Nội',
            id: 0,
            districts: [
                {
                    name: 'Ba đình',
                    total: 18,
                    id: 1
                },
                {
                    name: 'Long Biên',
                    total: 45,
                    id: 2
                },
                {
                    name: 'Hai Bà Trưng',
                    total: 29,
                    id: 3
                },
                {
                    name: 'Tây Hồ',
                    total: 18,
                    id: 4
                },
                {
                    name: 'Hoàn kiếm',
                    total: 0,
                    id: 5
                }
            ]
        },
        {
            name: 'Bắc Ninh',
            id: 1,
            districts: [
                {
                    name: 'Ba đình',
                    total: 18,
                    id: 6
                },
                {
                    name: 'Long Biên',
                    total: 45,
                    id: 7
                },
                {
                    name: 'Hai Bà Trưng',
                    total: 29,
                    id: 8
                },
                {
                    name: 'Tây Hồ',
                    total: 18,
                    id: 9
                },
                {
                    name: 'Hoàn kiếm',
                    total: 0,
                    id: 10
                }
            ]
        },
        {
            name: 'Hải Dương',
            id: 2,
            districts: [
                {
                    name: 'Ba đình',
                    total: 18,
                    id: 11
                },
                {
                    name: 'Long Biên',
                    total: 45,
                    id: 12
                },
                {
                    name: 'Hai Bà Trưng',
                    total: 29,
                    id: 13
                },
                {
                    name: 'Tây Hồ',
                    total: 18,
                    id: 14
                },
                {
                    name: 'Hoàn kiếm',
                    total: 0,
                    id: 15
                }
            ]
        }
    ]

    const CarouselItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={styles.boxItemShop} onPress={() => navigation.navigate('ShopDetail', {data: item})}>
                <Image source={{ uri: item.logo }} key={index} aspectRatio={2.11} style={styles.poster} />
                <View style={styles.boxAddress}>
                    <Image style={styles.icLogo} source={require('../../assets/logo_small.png')} />
                    <Text style={styles.txtAddress}>{item.address}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    const MoveItem = (index) => {
        const region = {
            latitude: shop.shops[index].lat,
            longitude: shop.shops[index].lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }
        setTimeout(() => map.current.animateToRegion(region), 10);
    }

    return (
        <SafeAreaView style={styles.container}>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor="#1B4731" />
            {
                loading &&
                <Loading />
            }
            <View style={styles.boxHeader}>
                <TouchableOpacity style={styles.boxDistrict} activeOpacity={0} onPress={toggleBox}>
                    <Text style={styles.txtDistrict}>Ba đình</Text>
                    <Image style={styles.icArrowDown} source={require('../../assets/ic_arrow_down.png')} />
                </TouchableOpacity>
                <Text style={styles.txtDistrict}>Danh sách cửa hàng</Text>
            </View>
            <View style={styles.content}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    ref={map}
                    initialRegion={{
                        latitude: shop.shops[0]?.lat || 21.037250,
                        longitude: shop.shops[0]?.lng || 105.814992,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                    style={{ flex: 1 }}
                >
                    {
                        shop.shops.map((item, index) => {
                            return <Marker coordinate={{ latitude: item.lat, longitude: item.lng }} key={index} onPress={() => carousel.current?._snapToItem(index)}>
                                <Image style={{ width: 36, height: 45 }} source={require('../../assets/ic_pin_logo.png')} />
                            </Marker>
                        })
                    }
                </MapView>
                <View style={styles.boxListShop}>
                    <Carousel
                        data={shop.shops}
                        renderItem={CarouselItem}
                        sliderWidth={window.width}
                        itemWidth={window.width / 2}
                        firstItem={0}
                        inactiveSlideScale={0.99}
                        onSnapToItem={(index) => MoveItem(index)}
                        removeClippedSubviews={false}
                        loop
                        ref={carousel}
                    />
                </View>
                {
                    isVisible ?
                        <View style={styles.boxListCity}>
                            <ScrollView style={{ flex: 1 }}>
                                {
                                    cities.map((city, index) => {
                                        return <View key={index}>
                                            <TouchableOpacity style={styles.boxCity} onPress={() => toggleCity(city.id)}>
                                                <Text style={styles.txtCity}>{city.name}</Text>
                                                <Image source={require('../../assets/ic_arrow_up.png')} style={[styles.icBack, city_id === index ? {} : { transform: [{ rotate: '180deg' }] }]} />
                                            </TouchableOpacity>
                                            {
                                                city_id === index ?
                                                    city.districts.map((district, index2) => {
                                                        return <TouchableOpacity onPress={() => setDistrict(district.id)} style={[styles.boxCity, district_id === district.id ? { backgroundColor: '#FEDEA0' } : {}]} key={index2}>
                                                            <Text style={[styles.txtDistrictName, { marginLeft: 15 }]}>{district.name}</Text>
                                                            <Text style={styles.txtDistrictName}>{district.total}</Text>
                                                        </TouchableOpacity>
                                                    })
                                                    :
                                                    <View style={{ height: 0 }} />
                                            }
                                        </View>
                                    })
                                }
                            </ScrollView>
                        </View>
                        :
                        <View style={{ width: window.width, height: 0, backgroundColor: '#FFFFFF', position: 'absolute', top: 0 }}></View>
                }
            </View>
        </SafeAreaView>
    );
}

Shop.propTypes = {
    provider: ProviderPropType,
};

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
        height: 53,
        alignItems: 'center',
        justifyContent: 'center'
    },
    boxDistrict: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12
    },
    txtDistrict: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
    icArrowDown: {
        width: 9,
        height: 5,
        marginLeft: 6
    },
    boxListShop: {
        position: 'absolute',
        bottom: 30
    },
    boxItemShop: {
        marginHorizontal: 7.5,
        borderRadius: 10,
        padding: 5,
        backgroundColor: '#FFFFFF',
    },
    poster: {
        width: '100%',
        borderRadius: 6,
        aspectRatio: 1.6,
        marginBottom: 15,
        backgroundColor: '#bdbdbd',
    },
    boxAddress: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 7,
    },
    icLogo: {
        width: 25,
        height: 25,
        marginRight: 10
    },
    txtAddress: {
        fontSize: 14,
        color: '#2A3B56',
        flex: 1,
    },
    boxListCity: {
        width: window.width,
        position: 'absolute',
        top: 0,
        backgroundColor: '#FFFFFF',
        maxHeight: window.height / 2
    },
    boxCity: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 30
    },
    txtCity: {
        fontSize: 12,
        color: '#8A94A3'
    },
    icBack: {
        width: 9,
        height: 5
    },
    txtDistrictName: {
        fontSize: 14,
        color: '#2A3B56',
    }
})