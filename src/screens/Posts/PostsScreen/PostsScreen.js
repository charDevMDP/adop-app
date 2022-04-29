import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../../utils';

import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { styles } from './PostsScreen.styles'

export function PostsScreen() {

    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, user => {
            setCurrentUser(user)
        })

    }, [])

    const nav = useNavigation();

    const goToAddPost = () => {
        nav.navigate(screen.pets.addPost)
    }

    return (
        <View style={styles.content}>
            <Text>PetsScreen</Text>

            {currentUser && (
                <Icon reverse
                    type='material-community'
                    name='plus'
                    color='#ff8e00'
                    containerStyle={styles.btnContainer}
                    onPress={goToAddPost}
                />
            )}
        </View>
    )
}