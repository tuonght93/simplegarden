import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';



export default function ItemShopHalf({ navigation, item }) {

    return (
        <TouchableOpacity style={styles.content} onPress={() => navigation.navigate('ShopDetail', { data: item })}>
            <Image style={styles.poster} source={{ uri: item.logo }} />
            <View style={styles.boxContent}>
                <Text style={styles.txtName} numberOfLines={2}>{item.title}</Text>
                <View style={styles.boxAddress}>
                    <Image style={styles.avatar} source={require('../../assets/logo_small.png')} />
                    <Text style={styles.txtAddress} numberOfLines={2}>{item.address}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    content: {
        backgroundColor: '#FFFFFF',
        width: '48%',
        borderRadius: 6,
        marginBottom: 15
    },
    poster: {
        width: '100%',
        aspectRatio: 1.5,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 6,
        marginBottom: 10,
        backgroundColor: '#bdbdbd',
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
        marginBottom: 6,
    },
    boxAddress: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12
    },
    avatar: {
        width: 25,
        height: 25,
        marginRight: 5
    },
    txtAddress: {
        flex: 1,
        fontSize: 12,
        color: '#2A3B56',
    },
})