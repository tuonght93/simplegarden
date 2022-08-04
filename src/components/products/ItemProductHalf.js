import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { formatNumber } from '../../services/Helper'


const ItemProductHalf = React.memo(({ navigation, item }) => {

    return (
        <View style={styles.content}>
            <Image style={styles.poster} source={{ uri: item.thumbnail }} />
            <View style={styles.boxContent}>
                <Text style={styles.txtName} numberOfLines={2}>{item.name}</Text>
                <View>
                    {/* <View style={styles.boxCount}>
                        <Image style={styles.icBag} source={require('../../assets/ic_bag.png')} />
                        <Text style={styles.txtCount}>{item.total_ordered || 0}</Text>
                        <View style={styles.hr} />
                        <Image style={styles.icHeart} source={require('../../assets/ic_heart.png')} />
                        <Text style={styles.txtCount}>{item.count_like || 0}</Text>
                    </View> */}
                    <View style={styles.boxPrice}>
                        <Text style={styles.txtPrice} numberOfLines={1}>{formatNumber(item.price)}</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Product', { product: item })}>
                            <Image style={styles.icPlus} source={require('../../assets/ic_plus_circle.png')} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
})

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#FFFFFF',
        width: '48%',
        borderRadius: 6,
        marginBottom: 20
    },
    poster: {
        width: '100%',
        aspectRatio: 1,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        marginBottom: 15,
        backgroundColor: '#bdbdbd'
    },
    boxContent: {
        paddingHorizontal: 12,
        justifyContent: 'space-between',
        flex: 1
    },
    txtName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2A3B56',
        marginBottom: 12,
    },
    boxCount: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6
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
})

export default ItemProductHalf