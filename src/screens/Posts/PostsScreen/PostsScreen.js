import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { screen, db } from '../../../utils';
import { collection, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { styles } from './PostsScreen.styles'
import { LoadingModal } from '../../../components/shared'
import { ListPosts } from '../../../components/Posts/ListPosts';

export function PostsScreen() {

    const [currentUser, setCurrentUser] = useState(null)
    const [posts, setPosts] = useState(null)

    useEffect(() => {
        const auth = getAuth()
        onAuthStateChanged(auth, user => {
            setCurrentUser(user)
        })
    }, [])

    useEffect(() => {

        // TODO: despues cambiar a 5/10 dependiendo
        const q = query(collection(db, 'petsNews'), orderBy('createAt', 'desc'), limit(5))

        onSnapshot(q, (snap) => {
            setPosts(snap.docs)
        })

    }, [])


    const nav = useNavigation();

    const goToAddPost = () => {
        nav.navigate(screen.pets.addPost)
    }

    return (
        <View style={styles.content}>
            {!posts ? (
                <LoadingModal isVisible text='Cargando Mascotas' />
            ) : (
                <ListPosts posts={posts} />
            )}

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