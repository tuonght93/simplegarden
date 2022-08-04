import React from 'react';
import { View, ActivityIndicator } from 'react-native';

export default function Loading() {
    return (
        <View style={{ flex: 1, position: 'absolute', backgroundColor: 'rgba(0,0,0,0.3)', left: 0, top: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', zIndex: 999999 }}>
            <ActivityIndicator size="large" color="#000000" style={{ bottom: 30 }} />
        </View>
    );
}
