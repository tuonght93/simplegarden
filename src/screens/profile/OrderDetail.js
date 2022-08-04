import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import QRCode from 'react-native-qrcode-svg'
import Header from '../../components/Header'
import FocusAwareStatusBar from '../../components/FocusAwareStatusBar'
import { formatNumber } from '../../services/Helper'


export default function OrderDetail({ navigation, route }) {

    console.log(route)

    const data = route.params?.data

    const insets = useSafeAreaInsets()

    const products = [
        {
            poster: 'https://s3.ap-east-1.amazonaws.com/devstatic.comeup.vn/events/2bcd00f3b6e828020b37d10c634e30c9/8898_tytcN2_400x225.png',
            name: 'Chân gà rút xương',
            total_ordered: '999+',
            count_like: 120,
            price: '200,000'
        },
        {
            poster: 'https://s3.ap-east-1.amazonaws.com/devstatic.comeup.vn/events/a0ed7abe1427fea5a0d3f9794b47dddc/8841_tgRzOt_400x225.png',
            name: 'Chân gà nướng sả ớt',
            total_ordered: '999+',
            count_like: 120,
            price: '200,000'
        },
        {
            poster: 'https://s3.ap-east-1.amazonaws.com/devstatic.comeup.vn/events/f22f983abc98b6f6d4bc4f1b18178fb5/6206_TuzzZg_400x225.png',
            name: 'Hà Nội',
            total_ordered: '999+',
            count_like: 120,
            price: '200,000'
        },
        {
            poster: 'https://s3.ap-east-1.amazonaws.com/devstatic.comeup.vn/events/55ddc2480b90e16fd2f5a34d99961d79/458_ooPMEM_400x225.png',
            name: 'Hà Nội',
            total_ordered: '999+',
            count_like: 120,
            price: '200,000'
        },
        {
            poster: 'https://s3.ap-east-1.amazonaws.com/devstatic.comeup.vn/events/f22f983abc98b6f6d4bc4f1b18178fb5/6206_TuzzZg_400x225.png',
            name: 'Hà Nội',
            total_ordered: '999+',
            count_like: 120,
            price: '200,000'
        },
        {
            poster: 'https://s3.ap-east-1.amazonaws.com/devstatic.comeup.vn/events/55ddc2480b90e16fd2f5a34d99961d79/458_ooPMEM_400x225.png',
            name: 'Hà Nội',
            total_ordered: '999+',
            count_like: 120,
            price: '200,000'
        },
    ]

    return (
        <View style={styles.container}>
            <FocusAwareStatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <View style={{ height: insets.top }} />
            <Header
                headerText="Chi tiếp đơn hàng"
                leftPress={() => navigation.navigate('Profile')}
            />
            <ScrollView style={styles.content}>
                <View style={styles.boxQRCode}>
                    <View style={[styles.boxInfomation, { flex: 1, paddingHorizontal: 0 }]}>
                        <Text style={styles.txtLabel}>Mã đơn hàng</Text>
                        <View style={styles.boxLeft}>
                            <View style={styles.boxAddress}>
                                <Image style={styles.icOrderCode} source={require('../../assets/ic_order_code.png')} />
                                <Text style={styles.txtAddress}>{data.uuid}</Text>
                            </View>
                        </View>
                    </View>
                    <QRCode
                        value={data.code}
                        size={70}
                    />
                </View>
                <View style={styles.boxInfomation}>
                    <Text style={styles.txtLabel}>Phương thức thanh toán</Text>
                    <View style={styles.boxLeft}>
                        <View style={styles.boxAddress}>
                            <Image style={styles.icCash} source={require('../../assets/ic_cash.png')} />
                            <Text style={styles.txtAddress}>Thanh toán khi nhận hàng</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.boxInfomation}>
                    <Text style={styles.txtLabel}>Giao hàng tới</Text>
                    <View style={styles.boxLeft}>
                        <View style={styles.boxAddress}>
                            <Image style={styles.icPositionPin} source={require('../../assets/ic_position_pin.png')} />
                            <Text style={styles.txtAddress}>Ngõ 119 Hồ Đắc Di, Đống Đa, Hà Nội</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.boxInfomation}>
                    <Text style={styles.txtLabel}>Hẹn giờ</Text>
                    <View style={styles.boxLeft}>
                        <View style={styles.boxAddress}>
                            <Image style={styles.icClock} source={require('../../assets/ic_clock.png')} />
                            <Text style={styles.txtAddress}>Ngõ 119 Hồ Đắc Di, Đống Đa, Hà Nội</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.boxShiperInfo}>
                    <View style={styles.boxInfoLeft}>
                        <Image style={styles.avatar} source={{ uri: 'https://scontent.fhan2-3.fna.fbcdn.net/v/t1.0-1/p480x480/47577151_1932725243507478_3133480235035525120_n.jpg?_nc_cat=107&_nc_sid=dbb9e7&_nc_ohc=klCHSU_nVBkAX8nfYpX&_nc_ht=scontent.fhan2-3.fna&_nc_tp=6&oh=7f48be9fb8b425d03b16bf19742c0662&oe=5F2EA486' }} />
                        <View style={styles.boxTitle}>
                            <Text style={styles.txtName}>Nguyễn Phi Tường</Text>
                            <Text style={styles.txtStatus}>Shipper - Đang giao</Text>
                        </View>
                    </View>
                    <View style={styles.boxInfoRight}>
                        <View style={styles.btnPhone}>
                            <Image style={styles.icPhone} source={require('../../assets/ic_phone_order.png')} />
                        </View>
                        <View style={styles.btnComment}>
                            <Image style={styles.icComment} source={require('../../assets/ic_comment.png')} />
                        </View>
                    </View>
                </View>
                <View style={styles.boxProduct}>
                    <Text style={[styles.txtLabel, { paddingHorizontal: 16 }]}>Đặt hàng</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.boxListProduct}>
                        {
                            data.items?.map((item, index) => {
                                return <View style={styles.boxItem} key={index}>
                                    <Image style={styles.productImage} source={{ uri: item.product_image }} />
                                    <View style={styles.boxContentProduct}>
                                        <Text style={styles.txtName} numberOfLines={2}>{item.product_name} ({item.quantity})</Text>
                                        <Text style={styles.txtPrice}>{formatNumber(item.product_price)}đ</Text>
                                    </View>
                                </View>
                            })
                        }
                    </ScrollView>
                </View>
                <View style={styles.boxMoney}>
                    <View style={styles.boxPaymentMethod}>
                        <Text style={styles.txtLabel}>Giá món</Text>
                        <Text style={styles.txtMoney}>{formatNumber(data.amount)}đ</Text>
                    </View>
                    <View style={styles.boxPaymentMethod}>
                        <Text style={styles.txtLabel}>Chi phí vận chuyển (1,5km)</Text>
                        <Text style={styles.txtMoney}>15,000đ</Text>
                    </View>
                    <View style={styles.boxPaymentMethod}>
                        <Text style={styles.txtTotal}>Tổng tiền</Text>
                        <View style={styles.boxTotalMoney}>
                            <View style={styles.boxPaymentStatus}>
                                <Text style={styles.txtPaymentStatus} numberOfLines={1}>Đã thanh toán</Text>
                            </View>
                            <Text style={styles.txtTotalMoney}>{formatNumber(data.amount)}đ</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.boxCheckout}>
                    <TouchableOpacity style={[styles.btnCheckout, { marginBottom: 20 }]}>
                        <Text style={styles.txtCheckout}>Đặt hàng lại</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnRate}>
                        <Text style={styles.txtRate}>Đánh giá</Text>
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
    icOrderCode: {
        width: 17,
        height: 17,
        marginRight: 12
    },
    icClock: {
        width: 18,
        height: 18,
        marginRight: 12
    },
    icCash: {
        width: 20,
        height: 20,
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
    boxShiperInfo: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16
    },
    boxInfoLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
        backgroundColor: '#bdbdbd',
    },
    boxTitle: {
        flex: 1
    },
    txtName: {
        fontSize: 14,
        color: '#2A3B56',
        marginBottom: 4
    },
    txtStatus: {
        fontSize: 12,
        color: '#8A94A3'
    },
    boxInfoRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnPhone: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#F6F4F4',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15
    },
    icPhone: {
        width: 17,
        height: 17
    },
    btnComment: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#1B4731',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 15
    },
    icComment: {
        width: 19,
        height: 17
    },
    boxPaymentMethod: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12
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
    boxPaymentStatus: {
        paddingHorizontal: 6,
        paddingVertical: 5,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        borderColor: '#979797',
        borderWidth: 1,
        marginRight: 12
    },
    txtPaymentStatus: {
        fontSize: 12,
        color: '#8A94A3'
    },
    boxTotalMoney: {
        flexDirection: 'row',
        alignItems: 'center',
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
    btnRate: {
        backgroundColor: '#F6F4F4',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 6
    },
    txtRate: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2A3B56'
    },
    boxQRCode: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12
    }
})