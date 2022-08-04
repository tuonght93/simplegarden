import React, { useState, useRef } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useSelector, useDispatch } from "react-redux"
import Header from '../../components/Header'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
const { width } = Dimensions.get('window')

export default function Filter({ navigation, route }) {

    const insets = useSafeAreaInsets()

    const dispatch = useDispatch()

    const [shopId, setShopId] = useState('')

    const product = useSelector(state => state.product)

    const addresses = [
        {
            name: 'Đáp Cầu',
        },
        {
            name: 'Chân gà nướng sả ớtChân gà nướng sả ớt',
        },
        {
            name: 'Hà Nội',
        },
        {
            name: 'Hà Nội',
        },
        {
            name: 'Hà Nội',
        },
        {
            name: 'Hà Nội',
        },
    ]

    const filterProduct = (uuid) => {
        route.params['callback'](uuid)
        navigation.goBack()
    }

    const clearFilter = () => {
        route.params['callback']('')
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <View style={{ height: insets.top }} />
            <Header
                icon={require('../../assets/ic_close_black.png')}
                icBack={{ width: 16, height: 16 }}
                headerText="Bộ lọc"
                rightText="Xoá tất cả"
                leftPress={() => navigation.goBack()}
                rightPress={clearFilter}
            />
            <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 87 }} bounces={false}>
                <View style={styles.boxSelect}>
                    <Text style={styles.txtTitle}>Danh mục</Text>
                    {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.boxListMenu}> */}
                    <View style={styles.boxListAddress}>
                        {
                            product.categories?.map((item, index) => {
                                return <TouchableOpacity style={[styles.boxItemMenu]} key={index} onPress={() => filterProduct(item.uuid)}>
                                    <View style={styles.bgMenu}>
                                        <Image source={require('../../assets/ic_menu.png')} style={styles.icMenu} />
                                    </View>
                                    <Text style={styles.txtMenuName} numberOfLines={1}>{item.name}</Text>
                                </TouchableOpacity>
                            })
                        }
                    </View>
                    {/* </ScrollView> */}
                    {/* <Text style={styles.txtTitle}>Địa điểm</Text>
                    <View style={styles.boxListAddress}>
                        {
                            addresses.map((address, index) => {
                                return <TouchableOpacity key={index} style={[styles.itemAddress, (index + 1) % 3 === 2 ? { width: '38%' } : { width: '28%' }, { backgroundColor: shopId === index ? '#1B4731' : '#F6F4F4' }]} onPress={() => setShopId(shopId !== index ? index : '')}>
                                    <Text style={[styles.txtAddress, { color: shopId === index ? '#FFFFFF' : '#8A94A3' }]} numberOfLines={1}>{address.name}</Text>
                                </TouchableOpacity>
                            })
                        }
                    </View> */}
                </View>
            </ScrollView>
            <View style={styles.boxApply}>
                <TouchableOpacity style={styles.btnApply}>
                    <Text style={styles.txtApply}>Áp dụng</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
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
    boxListMenu: {
        marginTop: 20,
        paddingLeft: 16,
        marginBottom: 10
    },
    boxItemMenu: {
        width: (width - 32) / 4,
        alignItems: 'center',
        marginBottom: 20
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
    txtTitle: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        fontSize: 14,
        color: '#2A3B56',
        fontWeight: 'bold'
    },
    boxListAddress: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        // flexGrow: 3,
        // justifyContent: 'space-between',
        paddingTop: 10,
        paddingHorizontal: 16,
    },
    itemAddress: {
        height: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        paddingHorizontal: 10
    },
    txtAddress: {
        fontSize: 12
    },
    boxApply: {
        backgroundColor: 'transparent',
        position: 'absolute',
        bottom: 0,
        width: '100%'
    },
    btnApply: {
        marginHorizontal: 16,
        marginTop: 17,
        marginBottom: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1B4731',
        borderRadius: 6,
        height: 50
    },
    txtApply: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold'
    },
})