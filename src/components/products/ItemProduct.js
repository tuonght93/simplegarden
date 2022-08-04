import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';



export default function ItemProduct({ navigation, item }) {

    return (
        <View style={styles.content}>
            <View style={styles.contentLeft}>
                <Image style={styles.poster} source={{ uri: item.poster }} />
                <View style={styles.boxContent}>
                    <Text style={styles.txtName} numberOfLines={2}>{item.name}</Text>
                    <View style={styles.boxCount}>
                        <Image style={styles.icBag} source={require('../../assets/ic_bag.png')} />
                        <Text style={styles.txtCount}>{item.total_ordered}</Text>
                        <View style={styles.hr} />
                        <Image style={styles.icHeart} source={require('../../assets/ic_heart.png')} />
                        <Text style={styles.txtCount}>{item.count_like}</Text>
                    </View>
                    <Text style={styles.txtPrice} numberOfLines={1}>{item.price}</Text>
                </View>
            </View>
            <View style={styles.contentRight}>
                {
                    item.quantity > 0 &&
                    <>
                        <Image style={styles.icMinus} source={require('../../assets/ic_minus_gray.png')} />
                        <Text style={styles.txtQuantity}>{item.quantity < 10 ? '0' + item.quantity : item.quantity}</Text>
                    </>
                }
                <Image style={styles.icMinus} source={require('../../assets/ic_plus_circle.png')} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#FFFFFF',
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    poster: {
        width: 85,
        aspectRatio: 1,
        borderRadius: 6,
    },
    boxContent: {
        paddingLeft: 16,
        paddingRight: 10,
        flex: 1
    },
    txtName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2A3B56',
        marginBottom: 15,
    },
    boxCount: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    icBag: {
        width: 12,
        height: 14,
        marginRight: 3
    },
    txtCount: {
        fontSize: 12,
        color: '#8A94A3',
    },
    hr: {
        width: 1,
        height: 14,
        backgroundColor: '#D8D8D8',
        marginHorizontal: 6
    },
    icHeart: {
        width: 13,
        height: 12,
        marginRight: 3
    },
    boxPrice: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    txtPrice: {
        fontSize: 14,
        color: '#F5AC02',
        fontFamily: 'SanFranciscoDisplay-Heavy'
    },
    icPlus: {
        width: 25,
        height: 25,
        marginLeft: 10
    },
    contentLeft: {
        flexDirection: 'row',
        flex: 1
    },
    contentRight: {
        flexDirection: 'row',
        alignItems: 'center',
        minWidth: 80,
        justifyContent: 'flex-end'
    },
    icMinus: {
        width: 25,
        height: 25,
        marginLeft: 6
    },
    txtQuantity: {
        marginLeft: 6,
        fontSize: 14,
        color: '#2A3B56'
    },
})