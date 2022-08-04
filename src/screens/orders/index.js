import React, { useState, useEffect, useRef } from 'react'
import { View, Text, SafeAreaView, FlatList, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import LottieView from 'lottie-react-native'
import { useSelector, useDispatch } from "react-redux"
// import { actLoadDataProductRequest } from '../../actions/product'
import { utf8Convert } from '../../services/Helper'
import ItemProductHalf from '../../components/products/ItemProductHalf'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'


export default function Order({ navigation, route }) {

    const dispatch = useDispatch()

    const ref = useRef(null)

    const [keyword, setKeyword] = useState('')

    const [category_uuid, setCategory] = useState(route.params?.category_uuid || '')

    const order = useSelector(state => state.order)

    // const onLoadDataProductRequest = () => dispatch(actLoadDataProductRequest())

    const product = useSelector(state => state.product)

    var total = 0
    order.orders.forEach(order => {
        total = total + order.quantity
    })

    useEffect(() => {
        setCategory(route?.params?.category_uuid || '')
        ref.current?.scrollToOffset({ animated: true, offset: 0 })
        // onLoadDataProductRequest()
    }, [route.params?.category_uuid])

    const datas = product.products.filter(product => utf8Convert(product.name).toUpperCase().indexOf(utf8Convert(keyword).toUpperCase()) > -1 && (product.category_uuid.indexOf(category_uuid) > -1))

    return (
        <SafeAreaView style={styles.container}>
            <FocusAwareStatusBar barStyle="light-content" backgroundColor="#1B4731" />
            <View style={styles.content}>
                <View style={styles.boxHeader}>
                    <View style={styles.boxHeaderLeft}>
                        <Image style={styles.icSearch} source={require('../../assets/ic_search_gray.png')} />
                        <TextInput
                            style={styles.ipContent}
                            selectionColor="#2A3B56"
                            value={keyword}
                            onChangeText={(keyword) => setKeyword(keyword)}
                            placeholder="Nhập từ khoá"
                            placeholderTextColor="#BDBDBD"
                        />
                        <TouchableOpacity activeOpacity={1} style={styles.btnClose} onPress={() => setKeyword('')}>
                            <Image style={styles.icClose} source={require('../../assets/ic_close_gray.png')} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.boxHeaderRight} activeOpacity={1} onPress={() => navigation.navigate('Filter', { callback: (category_uuid) => { setCategory(category_uuid); ref.current?.scrollToOffset({ animated: true, offset: 0 }) } })}>
                        <Image style={styles.icFilter} source={require('../../assets/ic_filter.png')} />
                    </TouchableOpacity>
                </View>
                {
                    product.isLoading ?
                        <View style={styles.boxListProduct}>
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
                            ref={ref}
                            contentContainerStyle={{ paddingBottom: 90, paddingTop: 20, paddingHorizontal: 16 }}
                            data={datas}
                            renderItem={({ item }) => {
                                return <ItemProductHalf item={item} navigation={navigation} />
                            }}
                            columnWrapperStyle={{ justifyContent: 'space-between' }}
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
        borderRadius: 6,
        backgroundColor: '#FFFFFF',
        height: 48,
        paddingHorizontal: 10
    },
    icSearch: {
        width: 18,
        height: 18,
        marginHorizontal: 10
    },
    ipContent: {
        flex: 1,
        fontSize: 14,
        color: '#2A3B56',
        paddingVertical: 15,
    },
    btnClose: {
        padding: 10
    },
    icClose: {
        height: 10,
        width: 10,
    },
    boxHeaderRight: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    icFilter: {
        width: 24,
        height: 24
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
        paddingHorizontal: 16,
        paddingVertical: 20,
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