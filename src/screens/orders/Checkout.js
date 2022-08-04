import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { nanoid } from 'nanoid'
import { useSelector, useDispatch } from "react-redux"
import dayjs from 'dayjs'
import { actCheckout } from '../../actions/order'
import Header from '../../components/Header'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import Loading from '../../components/Loading'
import { formatNumber } from '../../services/Helper'

export default function Checkout({ navigation }) {

    const insets = useSafeAreaInsets()

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const [shop, setShop] = useState({})

    const order = useSelector(state => state.order)

    var total_money = 0
    order.orders.forEach(order => {
        total_money = total_money + order.product.price * order.quantity
    })

    const onCheckout = async () => {
        if (!shop.uuid) {
            Alert.alert(
                'Thông báo',
                'Vui lòng chọn cửa hàng!',
                [
                    { text: 'OK', onPress: () => null, style: 'cancel' },
                ],
                { cancelable: false },
            );
            return
        }
        setLoading(true)
        var { orders } = order
        var items = []
        var total_dish = 0
        var amount = 0
        orders.forEach(item => {
            const uuid = nanoid()
            items.push({
                uuid,
                cid: uuid,
                product_uuid: item.product.uuid,
                product_price: item.product.price,
                quantity: item.quantity,
                added_qty: item.quantity,
            })
            total_dish = total_dish + item.quantity
            amount = amount + item.product.price * item.quantity
        })
        const cid = nanoid()
        const body = {
            items,
            total_dish,
            amount,
            cid,
            cid_tmp: cid,
            discount_amount: 0,
            is_canceled: false,
            is_completed: false,
            is_paid: false,
            is_returned: false,
            is_served: false,
            total_eater: 1,
            received_amount: amount,
            payment_method: 'cash',
            kind: 'takeaway',
            vat_amount: 0,
            service_amount: 0,
            promotion_automated: 1,
            time_in: dayjs().format('YYYY-MM-DD HH:mm:ss'),
            time_out: '',
            code_tmp: dayjs().format('DD MM YY-HH mm ss').replace(/\s+/g, ''),
            last_modified_at: Math.floor(Date.now() / 1000),
            place_uuid: shop.uuid
        }
        console.log(body)
        await dispatch(actCheckout(body))
        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor={loading ? "rgba(0,0,0,0.3)" : "#FFFFFF"} />
            {
                loading &&
                <Loading />
            }
            <View style={{ height: insets.top }} />
            <Header
                headerText="Thanh toán"
                leftPress={() => navigation.goBack()}
            />
            <ScrollView style={styles.content}>
                {/* <TouchableOpacity style={styles.boxInfomation} onPress={() => navigation.navigate('SelectShop')}>
                    <Text style={styles.txtLabel}>Giao hàng tới</Text>
                    <View style={styles.boxLeft}>
                        <View style={styles.boxAddress}>
                            <Image style={styles.icPositionPin} source={require('../../assets/ic_position_pin.png')} />
                            <Text style={styles.txtAddress} numberOfLines={1}>Ngõ 119 Hồ Đắc Di, Đống Đa, Hà Nội</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={styles.boxInfomation}>
                    <Text style={styles.txtLabel}>Hẹn giờ</Text>
                    <View style={styles.boxLeft}>
                        <View style={styles.boxAddress}>
                            <Image style={styles.icClock} source={require('../../assets/ic_clock.png')} />
                            <Text style={styles.txtAddress} numberOfLines={1}>Trong 30 phút</Text>
                        </View>
                        <Image style={styles.icNext} source={require('../../assets/ic_next.png')} />
                    </View>
                </View> */}
                <TouchableOpacity style={styles.boxInfomation} onPress={() => navigation.navigate('SelectShop', { callback: (item) => setShop(item), shop })}>
                    <Text style={styles.txtLabel}>Chọn cửa hàng</Text>
                    <View style={styles.boxLeft}>
                        <View style={styles.boxAddress}>
                            <Image style={styles.icShop} source={require('../../assets/ic_shop_address.png')} />
                            <Text style={styles.txtAddress} numberOfLines={1}>{shop.address || 'Chọn cửa hàng'}</Text>
                        </View>
                        <Image style={styles.icNext} source={require('../../assets/ic_next.png')} />
                    </View>
                </TouchableOpacity>
                <View style={styles.boxProduct}>
                    <Text style={[styles.txtLabel, { paddingHorizontal: 16 }]}>Đặt hàng</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.boxListProduct}>
                        {
                            order.orders?.map((item, index) => {
                                return <TouchableOpacity style={styles.boxItem} key={index} onPress={() => navigation.navigate('Product', { product: item.product })}>
                                    <Image style={styles.productImage} source={{ uri: item.product?.thumbnail }} />
                                    <View style={styles.boxContentProduct}>
                                        <Text style={styles.txtName}>{item.product?.name} ({item.quantity})</Text>
                                        <Text style={styles.txtPrice}>{formatNumber(item.product?.price)}đ</Text>
                                    </View>
                                </TouchableOpacity>
                            })
                        }
                    </ScrollView>
                </View>
                <View style={styles.boxPayment}>
                    <Text style={styles.txtLabel}>Chọn phương thức thanh toán</Text>
                    {/* <TouchableOpacity style={styles.boxPaymentMethod}>
                        <View style={styles.boxPaymentLeft}>
                            <Image style={styles.icDomestic} source={require('../../assets/ic_domestic_card.png')} />
                            <Text style={styles.txtCardName}>Thẻ nội địa</Text>
                        </View>
                        <View style={styles.boxPaymentLeft}>
                            <Text style={styles.txtCardName}>laura@gmail.com</Text>
                            <View style={styles.boxCheckbox}>
                                <Image style={styles.icChecked} source={require('../../assets/ic_checked.png')} />
                            </View>
                        </View>
                    </TouchableOpacity> */}
                    {/* <TouchableOpacity style={styles.boxPaymentMethod}>
                        <View style={styles.boxPaymentLeft}>
                            <Image style={styles.icCredit} source={require('../../assets/ic_credit_card.png')} />
                            <Text style={styles.txtCardName}>Credit card</Text>
                        </View>
                        <View style={styles.boxPaymentLeft}>
                            <Text style={styles.txtCardName}>4221 **** **** 9018</Text>
                            <View style={styles.boxCheckbox}>
                                <Image style={styles.icChecked} source={require('../../assets/ic_checked.png')} />
                            </View>
                        </View>
                    </TouchableOpacity> */}
                    <TouchableOpacity style={styles.boxPaymentMethod}>
                        <View style={styles.boxPaymentLeft}>
                            <Image style={styles.icCard} source={require('../../assets/ic_cash.png')} />
                            <Text style={styles.txtCardName}>Tiền mặt</Text>
                        </View>
                        <View style={styles.boxPaymentLeft}>
                            <Text style={styles.txtCardName}>Thanh toán khi nhận hàng</Text>
                            <View style={styles.boxCheckbox}>
                                <Image style={styles.icChecked} source={require('../../assets/ic_checked.png')} />
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.boxMoney}>
                    <View style={styles.boxPaymentMethod}>
                        <Text style={styles.txtLabel}>Giá món</Text>
                        <Text style={styles.txtMoney}>{formatNumber(total_money)}đ</Text>
                    </View>
                    {/* <View style={styles.boxPaymentMethod}>
                        <Text style={styles.txtLabel}>Chi phí vận chuyển (1,5km)</Text>
                        <Text style={styles.txtMoney}>15,000đ</Text>
                    </View> */}
                    <View style={styles.boxPaymentMethod}>
                        <Text style={styles.txtTotal}>Tổng tiền</Text>
                        <Text style={styles.txtTotalMoney}>{formatNumber(total_money)}đ</Text>
                    </View>
                </View>
                <View style={[styles.boxCheckout, { marginBottom: insets.bottom + 16 }]}>
                    <TouchableOpacity style={styles.btnCheckout} onPress={onCheckout}>
                        <Text style={styles.txtCheckout}>Thanh toán</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
    boxInfomation: {
        paddingVertical: 12,
        paddingHorizontal: 16
    },
    txtLabel: {
        fontSize: 12,
        color: '#8A94A3'
    },
    boxAddress: {
        backgroundColor: '#FFFFFF',
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
    boxLeft: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 10,
    },
    icNext: {
        width: 5,
        height: 11,
        marginLeft: 15
    },
    icClock: {
        width: 18,
        height: 18,
        marginRight: 12
    },
    icShop: {
        width: 20,
        height: 18,
        marginRight: 12
    },
    boxProduct: {
        paddingVertical: 12,
    },
    boxListProduct: {
        marginTop: 12,
        paddingLeft: 16,
        flexWrap: 'wrap',
    },
    boxItem: {
        width: 83,
        marginRight: 20,
    },
    productImage: {
        width: 83,
        height: 83,
        borderRadius: 6,
        marginBottom: 12,
        backgroundColor: '#bdbdbd',
    },
    boxContentProduct: {
        justifyContent: 'space-between',
        flexGrow: 1
    },
    txtName: {
        fontSize: 14,
        color: '#2A3B56',
        marginBottom: 6
    },
    txtPrice: {
        fontSize: 14,
        color: '#F5AC02',
        fontWeight: 'bold',
        alignSelf: 'stretch'
    },
    boxPayment: {
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingBottom: 12
    },
    boxPaymentMethod: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12
    },
    boxPaymentLeft: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    icDomestic: {
        width: 18,
        height: 15,
        marginRight: 10
    },
    txtCardName: {
        fontSize: 14,
        color: '#2A3B56',
    },
    boxCheckbox: {
        backgroundColor: '#F6F4F4',
        borderRadius: 12,
        marginLeft: 10,
        width: 24,
        height: 24,
    },
    icChecked: {
        width: 24,
        height: 24,
    },
    icCredit: {
        width: 20,
        height: 12,
        marginRight: 10
    },
    icCard: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    txtMoney: {
        fontFamily: 'SanFranciscoDisplay-Medium',
        fontSize: 14,
        color: '#2A3B56'
    },
    boxMoney: {
        paddingHorizontal: 16
    },
    txtTotal: {
        color: '#2A3B56',
        fontSize: 16,
        fontWeight: 'bold'
    },
    txtTotalMoney: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#F5AC02'
    },
    boxCheckout: {
        paddingHorizontal: 16,
        paddingVertical: 20
    },
    btnCheckout: {
        backgroundColor: '#1B4731',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6
    },
    txtCheckout: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
})