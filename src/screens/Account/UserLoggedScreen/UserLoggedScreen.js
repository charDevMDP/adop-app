import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { InfoUser } from '../../../components/Account'
import { styles } from './UserLoggedScreen.styles'
import { Button } from '@rneui/base'
import { getAuth, signOut } from 'firebase/auth'
import { LoadingModal } from '../../../components'
import { AccountOptions } from '../../../components/Account/AccountOptions'

export default function UserLoggedScreen() {

    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('');
    const [_, setReload] = useState(false)

    const onReload = () => setReload(prevState => !prevState)

    const logout = async () => {
        const auth = getAuth();
        await signOut(auth);
    }

    return (
        <View>
            <InfoUser setLoading={setLoading} setLoadingText={setLoadingText} />
            <AccountOptions onReload={onReload} />
            <Button title='Salir' buttonStyle={styles.btn} onPress={logout} />
            <LoadingModal isVisible={loading} text={loadingText} />
        </View>
    )
}