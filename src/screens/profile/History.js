import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import { actLoadDataOrderHistory } from '../../actions/order';
import { formatNumber } from '../../services/Helper';


export default function History({ navigation }) {

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    const order = useSelector(state => state.order);

    const onLoadDataOrderHistory = () => dispatch(actLoadDataOrderHistory())

    useEffect(() => {
        const fetchData = async () => {
            await onLoadDataOrderHistory()
            setLoading(false)
        }
        fetchData()
    }, [])

    console.log(order.orderHistory)

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
            {
                loading ?
                    <ActivityIndicator size={"large"} color={"#000000"} />
                    :
                    <FlatList
                        contentContainerStyle={styles.content}
                        data={order.orderHistory}
                        renderItem={({ item }) => {
                            return <View style={styles.boxHistory}>
                                <View style={styles.boxHeader}>
                                    <Text style={styles.txtHeader}>{item.created_at} - {item.state_name}</Text>
                                </View>
                                <View style={styles.boxOrderInfo}>
                                    <View style={styles.boxOrderCode}>
                                        <Text style={styles.txtOrderCode}>Mã đơn hàng: {item.code}</Text>
                                        <Image style={styles.icNext} source={require('../../assets/ic_next.png')} />
                                    </View>
                                    <View style={styles.boxCard}>
                                        <Image style={styles.icWallet} source={require('../../assets/ic_wallet.png')} />
                                        <Text style={styles.txtTotalMoney}>{formatNumber(item.amount)}</Text>
                                    </View>
                                    {/* <View style={styles.boxCard}>
                                        <Image style={styles.icDelivery} source={require('../../assets/ic_delivery.png')} />
                                        <Text style={styles.txtTotalMoney}>Mã đơn hàng: 14802-1008298231</Text>
                                    </View> */}
                                </View>
                                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.boxListProduct}>
                                    {
                                        products.map((item, index) => {
                                            return <View style={styles.boxItem} key={index}>
                                                <Image style={styles.productImage} source={{ uri: item.poster }} />
                                                <View style={styles.boxContentProduct}>
                                                    <Text style={styles.txtName} numberOfLines={2}>{item.name}</Text>
                                                    <Text style={styles.txtPrice}>{item.price}đ</Text>
                                                </View>
                                            </View>
                                        })
                                    }
                                </ScrollView>
                                <View style={styles.boxAction}>
                                    {/* <View style={styles.btnRate}>
                                        <Text style={styles.txtRate}>Đánh giá</Text>
                                    </View> */}
                                    <View style={[styles.btnReOrder, { flex: 1 }]}>
                                        <Text style={styles.txtReOrder}>Đặt hàng lại</Text>
                                    </View>
                                </View>
                            </View>
                        }}
                        keyExtractor={(item, index) => index.toString()}
                        directionalLockEnabled={true}
                    />
                // <ScrollView style={styles.content}>
                //     <View style={styles.boxHistory}>
                //         <View style={styles.boxHeader}>
                //             <Text style={styles.txtHeader}>16/10/2019 - Đã hoàn thành</Text>
                //         </View>
                //         <View style={styles.boxOrderInfo}>
                //             <View style={styles.boxOrderCode}>
                //                 <Text style={styles.txtOrderCode}>Mã đơn hàng: 14802-1008298231</Text>
                //                 <Image style={styles.icNext} source={require('../../assets/ic_next.png')} />
                //             </View>
                //             <View style={styles.boxCard}>
                //                 <Image style={styles.icWallet} source={require('../../assets/ic_wallet.png')} />
                //                 <Text style={styles.txtTotalMoney}>Mã đơn hàng: 14802-1008298231</Text>
                //             </View>
                //             <View style={styles.boxCard}>
                //                 <Image style={styles.icDelivery} source={require('../../assets/ic_delivery.png')} />
                //                 <Text style={styles.txtTotalMoney}>Mã đơn hàng: 14802-1008298231</Text>
                //             </View>
                //         </View>
                //         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.boxListProduct}>
                //             {
                //                 products.map((item, index) => {
                //                     return <View style={styles.boxItem} key={index}>
                //                         <Image style={styles.productImage} source={{ uri: item.poster }} />
                //                         <View style={styles.boxContentProduct}>
                //                             <Text style={styles.txtName} numberOfLines={2}>{item.name}</Text>
                //                             <Text style={styles.txtPrice}>{item.price}đ</Text>
                //                         </View>
                //                     </View>
                //                 })
                //             }
                //         </ScrollView>
                //         <View style={styles.boxAction}>
                //             <View style={styles.btnRate}>
                //                 <Text style={styles.txtRate}>Đánh giá</Text>
                //             </View>
                //             <View style={styles.btnReOrder}>
                //                 <Text style={styles.txtReOrder}>Đặt hàng lại</Text>
                //             </View>
                //         </View>
                //     </View>
                //     <View style={styles.boxHistory}>
                //         <View style={styles.boxHeader}>
                //             <Text style={styles.txtHeader}>16/10/2019 - Đã hoàn thành</Text>
                //         </View>
                //         <View style={styles.boxOrderInfo}>
                //             <View style={styles.boxOrderCode}>
                //                 <Text style={styles.txtOrderCode}>Mã đơn hàng: 14802-1008298231</Text>
                //                 <Image style={styles.icNext} source={require('../../assets/ic_next.png')} />
                //             </View>
                //             <View style={styles.boxCard}>
                //                 <Image style={styles.icWallet} source={require('../../assets/ic_wallet.png')} />
                //                 <Text style={styles.txtTotalMoney}>Mã đơn hàng: 14802-1008298231</Text>
                //             </View>
                //             <View style={styles.boxCard}>
                //                 <Image style={styles.icDelivery} source={require('../../assets/ic_delivery.png')} />
                //                 <Text style={styles.txtTotalMoney}>Mã đơn hàng: 14802-1008298231</Text>
                //             </View>
                //         </View>
                //         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.boxListProduct}>
                //             {
                //                 products.map((item, index) => {
                //                     return <View style={styles.boxItem} key={index}>
                //                         <Image style={styles.productImage} source={{ uri: item.poster }} />
                //                         <View style={styles.boxContentProduct}>
                //                             <Text style={styles.txtName} numberOfLines={2}>{item.name}</Text>
                //                             <Text style={styles.txtPrice}>{item.price}đ</Text>
                //                         </View>
                //                     </View>
                //                 })
                //             }
                //         </ScrollView>
                //         <View style={styles.boxAction}>
                //             <View style={styles.btnRate}>
                //                 <Text style={styles.txtRate}>Đánh giá</Text>
                //             </View>
                //             <View style={styles.btnReOrder}>
                //                 <Text style={styles.txtReOrder}>Đặt hàng lại</Text>
                //             </View>
                //         </View>
                //     </View>
                //     <View style={styles.boxHistory}>
                //         <View style={styles.boxHeader}>
                //             <Text style={styles.txtHeader}>16/10/2019 - Đã hoàn thành</Text>
                //         </View>
                //         <View style={styles.boxOrderInfo}>
                //             <View style={styles.boxOrderCode}>
                //                 <Text style={styles.txtOrderCode}>Mã đơn hàng: 14802-1008298231</Text>
                //                 <Image style={styles.icNext} source={require('../../assets/ic_next.png')} />
                //             </View>
                //             <View style={styles.boxCard}>
                //                 <Image style={styles.icWallet} source={require('../../assets/ic_wallet.png')} />
                //                 <Text style={styles.txtTotalMoney}>Mã đơn hàng: 14802-1008298231</Text>
                //             </View>
                //             <View style={styles.boxCard}>
                //                 <Image style={styles.icDelivery} source={require('../../assets/ic_delivery.png')} />
                //                 <Text style={styles.txtTotalMoney}>Mã đơn hàng: 14802-1008298231</Text>
                //             </View>
                //         </View>
                //         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.boxListProduct}>
                //             {
                //                 products.map((item, index) => {
                //                     return <View style={styles.boxItem} key={index}>
                //                         <Image style={styles.productImage} source={{ uri: item.poster }} />
                //                         <View style={styles.boxContentProduct}>
                //                             <Text style={styles.txtName} numberOfLines={2}>{item.name}</Text>
                //                             <Text style={styles.txtPrice}>{item.price}đ</Text>
                //                         </View>
                //                     </View>
                //                 })
                //             }
                //         </ScrollView>
                //         <View style={styles.boxAction}>
                //             <View style={styles.btnRate}>
                //                 <Text style={styles.txtRate}>Đánh giá</Text>
                //             </View>
                //             <View style={styles.btnReOrder}>
                //                 <Text style={styles.txtReOrder}>Đặt hàng lại</Text>
                //             </View>
                //         </View>
                //     </View>
                // </ScrollView>
            }
        </View>
    );
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
    boxHistory: {

    },
    boxHeader: {
        paddingVertical: 10,
        backgroundColor: '#F5EFE5',
        paddingHorizontal: 16
    },
    txtHeader: {
        fontSize: 12,
        color: '#2A3B56'
    },
    boxOrderInfo: {
        paddingVertical: 12,
        paddingHorizontal: 16
    },
    boxOrderCode: {
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    txtOrderCode: {
        flex: 1,
        fontSize: 14,
        color: '#2A3B56'
    },
    icNext: {
        width: 5,
        height: 11,
        marginLeft: 6
    },
    boxCard: {
        flexDirection: 'row',
        alignContent: 'center',
        marginTop: 12
    },
    icWallet: {
        width: 17,
        height: 17,
        marginRight: 10
    },
    icDelivery: {
        width: 18,
        height: 17,
        marginRight: 10
    },
    txtTotalMoney: {
        fontSize: 12,
        color: '#8A94A3',
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
        marginBottom: 12
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
    boxAction: {
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    btnRate: {
        flex: 0.48,
        height: 36,
        borderRadius: 18,
        borderColor: '#1B4731',
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtRate: {
        fontSize: 14,
        color: '#1B4731',
        fontWeight: 'bold'
    },
    btnReOrder: {
        flex: 0.48,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#1B4731',
        alignItems: 'center',
        justifyContent: 'center'
    },
    txtReOrder: {
        fontSize: 14,
        color: '#FFFFFF',
        fontWeight: 'bold'
    },
})