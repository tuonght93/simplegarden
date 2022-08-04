import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MapView, { Marker, ProviderPropType, PROVIDER_GOOGLE } from 'react-native-maps';
import { Modalize } from 'react-native-modalize';
import OrderEmpty from '../../components/profile/OrderEmpty';


export default function Coming({ navigation }) {

    const modalizeRef = useRef(null);

    const [totalOrder] = useState(1)

    useEffect(() => {
        modalizeRef.current &&
            modalizeRef.current?.open('top');
    }, [])

    return (
        <View style={styles.container}>
            {
                totalOrder === 0 ?
                    <OrderEmpty />
                    :
                    <View style={styles.content}>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            initialRegion={{
                                latitude: 21.037250,
                                longitude: 105.814992,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}
                            style={{ flex: 1 }}
                        >
                            <Marker
                                coordinate={{ latitude: 21.037250, longitude: 105.814992 }}
                            >
                                <Image style={{ width: 36, height: 45 }} source={require('../../assets/ic_pin_logo.png')} />
                            </Marker>
                        </MapView>
                        <Modalize ref={modalizeRef} alwaysOpen={30} modalHeight={250} handlePosition="inside" handleStyle={styles.handleStyle} rootStyle={styles.rootStyle} overlayStyle={styles.overlayStyle}>
                            <View style={styles.boxContent}>
                                <Text style={styles.txtTime}>Đến sau 21 phút</Text>
                                <View style={styles.boxOrderInfo}>
                                    <TouchableOpacity style={styles.boxOrderCode} onPress={() => navigation.navigate('OrderDetail')}>
                                        <Text style={styles.txtOrderCode}>Mã đơn hàng: 14802-1008298231</Text>
                                        <Image style={styles.icNext} source={require('../../assets/ic_next.png')} />
                                    </TouchableOpacity>
                                    <View style={styles.boxCard}>
                                        <Image style={styles.icWallet} source={require('../../assets/ic_wallet.png')} />
                                        <Text style={styles.txtTotalMoney}>Mã đơn hàng: 14802-1008298231</Text>
                                    </View>
                                    <View style={styles.boxCard}>
                                        <Image style={styles.icDelivery} source={require('../../assets/ic_delivery.png')} />
                                        <Text style={styles.txtTotalMoney}>Mã đơn hàng: 14802-1008298231</Text>
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
                            </View>
                        </Modalize>
                    </View>
            }
        </View>
    );
}

Coming.propTypes = {
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
    },
    boxContent: {
        paddingHorizontal: 25,
        paddingTop: 30
    },
    txtTime: {
        fontSize: 12,
        color: '#8A94A3',
        paddingBottom: 12
    },
    boxOrderInfo: {
        paddingVertical: 12
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
    boxShiperInfo: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
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
        marginRight: 10
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
    handleStyle: {
        width: 80,
        height: 4,
        backgroundColor: '#F6F4F4',
        borderRadius: 7.5
    },
    rootStyle: {
        top: 'auto',
    },
    overlayStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
    }
})