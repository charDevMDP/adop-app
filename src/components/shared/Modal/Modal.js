import { Overlay } from '@rneui/themed'
import React from 'react'
import { View, Text } from 'react-native'
import { styles } from './Modal.styles'

export function Modal(props) {
    const { open, close, children } = props

    return (
        <Overlay
            isVisible={open}
            overlayStyle={styles.overlayStyle}
            fullScreen
            onBackdropPress={close}
        >
            {children}
        </Overlay>
    )

}