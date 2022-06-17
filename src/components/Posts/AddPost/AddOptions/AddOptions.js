import React from 'react'
import { View, StyleSheet, TouchableHighlight, TouchableOpacity, Text } from 'react-native'
import { Divider } from '@rneui/base';
import { globalStyles } from '../../../../utils'
import { styles } from './AddOptions.styles'


export function AddOptions(props) {

    const { nav } = props

    const goToScreen = (screen, type) => {
        //nav.navigate(screen, { type })
    }

    return (
        <View style={styles.containerView}>
            <Text style={{ color: '#ff8e00', fontFamily: 'ComfortaaB', fontSize: 18 }}>¿Que queres publicar?</Text>
            <Divider style={styles.divider} />
            <View>
                <TouchableOpacity underlayColor={'transparent'} style={[styles.viewOption, globalStyles.btnAdop]} onPress={() => goToScreen("AddPost", 'adop')}>
                    <Text color={'#427865'} sizeText={15} weight="ComfortaaBold" style={{ textAlign: 'center' }}>QUIERO DAR EN ADOPCIÓN</Text>
                </TouchableOpacity>
                <TouchableOpacity underlayColor={'transparent'} style={[styles.viewOption, globalStyles.btnTrans]}>
                    <Text color={'#374491'} sizeText={15} weight="ComfortaaBold" style={{ textAlign: 'center' }}>ESTOY BUSCANDO TRÁNSITO</Text>
                </TouchableOpacity>
                <TouchableOpacity underlayColor={'transparent'} style={[styles.viewOption, globalStyles.btnLost]}>
                    <Text color={'#6b46a5'} sizeText={15} weight="ComfortaaBold" style={{ textAlign: 'center' }}>SE ME PERDIÓ MI MASCOTA</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

