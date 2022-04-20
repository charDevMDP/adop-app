import { Divider, Image } from '@rneui/base'
import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { LoginForm } from '../../../components/auth/LoginForm'
import { styles } from './LoginScreen.styles'

export function LoginScreen() {

    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../../../assets/imgs/logoTextoHome.png")}
                containerStyle={styles.containerLogo}
                style={styles.logo}
                placeholderStyle={{ color: '#ff8e00' }}
            />
            <View style={styles.contentform}>
                <LoginForm />
            </View>

        </KeyboardAwareScrollView>
    )
}