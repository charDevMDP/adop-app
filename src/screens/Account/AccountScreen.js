import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../utils'
import UserGuestScreen from './UserGuestScreen/UserGuestScreen'
import UserLoggedScreen from './UserLoggedScreen'
import { Loading } from '../../components'

export function AccountScreen() {

    const [hasLogged, setHasLogged] = useState(null)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user)
            setHasLogged(!user ? true : false)
        })
    }, [])

    if (hasLogged === null) {
        return <Loading text='Cargando' isVisible={true} />
    }

    return hasLogged ? <UserLoggedScreen /> : <UserGuestScreen />
}