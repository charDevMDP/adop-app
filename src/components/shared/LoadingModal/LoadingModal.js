import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Overlay, Text } from '@rneui/themed';
import { styles } from './LoadingModal.styles'
//import { Text } from '@rneui/base';

//import Text from "../utils/Text"

export function LoadingModal(props) {
    const { isVisible, text } = props

    return (
        <Overlay isVisible={isVisible} overlayStyle={styles.overlay} fullScreen >
            <View style={styles.view} >
                <ActivityIndicator size="large" color="#Ff8a00" />
                {text && <Text style={styles.text}>{text}</Text>}
            </View>
        </Overlay>
    )
}

LoadingModal.defaultProps = {
    isVisible: false
}
