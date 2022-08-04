import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

//make a Component
const Header = (props) => {
    return (
        <View style={styles.bgHeader}>
            <View style={styles.headerLeft}>
                <TouchableOpacity style={styles.btnBack} onPress={props.leftPress || null}>
                    <Image source={props.icon || require('../assets/ic_back.png')} style={[styles.icBack, props.icBack]} />
                </TouchableOpacity>
                <Text style={styles.txtContent} numberOfLines={1}>{props.headerText}</Text>
            </View>
            <TouchableOpacity style={styles.btnRight} onPress={props.rightPress || null}>
            <Text style={styles.headerStyle}>{props.rightText}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    bgHeader: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: 53,
    },
    headerLeft: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    btnBack: {
        width: 44,
        height: 44,
        justifyContent: 'center'
    },
    icBack: {
        width: 10,
        height: 20,
    },
    txtContent: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2A3B56',
        flex: 1
    },
    btnRight: {
        paddingVertical: 10
    },
    headerStyle: {
        fontSize: 14,
        color: '#2A3B56',
    },
})

module.exports = Header;