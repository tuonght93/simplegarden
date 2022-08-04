import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

export default function Splash({ navigation }) {

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#1B4731" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1B4731',
        flex: 1,
    },
})