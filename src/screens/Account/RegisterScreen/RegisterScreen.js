import { Image } from '@rneui/base'
import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RegisterForm } from '../../../components/auth/RegisterForm/RegisterForm'
import { styles } from './RegisterScreen.styles'

export function RegisterScreen() {
    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../../../assets/imgs/logoTextoHome.png")}
                containerStyle={styles.containerLogo}
                style={styles.logo}
                placeholderStyle={{ color: '#ff8e00' }}
            />
            <View style={styles.contentform}>
                <RegisterForm />
            </View>
        </KeyboardAwareScrollView>
    )
}