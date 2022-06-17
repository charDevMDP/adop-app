import React, { useEffect, useState } from 'react'
import { View, Text, ScrollView, Dimensions } from 'react-native'
import { Divider, Icon } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { screen, db } from '../../../utils';
import { collection, doc, limit, onSnapshot, orderBy, query } from 'firebase/firestore'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { styles } from './PostDetailsScreen.styles'
import { LoadingModal } from '../../../components/shared'
import { ListPosts } from '../../../components/Posts/ListPosts';
import { Carousel } from '../../../components/shared/Carousel';
import { TitlePost } from '../../../components/Posts/PostDetails'
import { InfoPost, InfoPostUser } from '../../../components/Posts/PostDetails';

const { width } = Dimensions.get('window')

export function PostDetailsScreen(props) {

    const { route } = props;

    const [post, setPost] = useState('')

    useEffect(() => {
        setPost(null)
        onSnapshot(doc(db, 'petsNews', route.params.id), (doc) => {
            setPost(doc.data())
        })
    }, [route.params.id])

    if (!post) {
        return <LoadingModal text='Cargando Post' isVisible='true' />
    }


    return (

        <ScrollView style={styles.content}>
            <Carousel images={post.images} width={width} height={100} />

            {/* TITULO Y ICONO FAVORITO */}
            <View>
                <TitlePost
                    user={{ email: 'char@pruebas.com' }}
                    email={'char.pruebas.com'}
                    title={post.title}
                //isFavorite={isFavorite}
                //addFavorite={addFavorite}
                //removeFavorite={removeFavorite}
                />
            </View>

            {/* INFORMACION DE LA MASCOTA */}
            <View>

            </View>


            {/* INFORMACION DE LA PUBLICACION */}
            <View>
                <Divider style={{ backgroundColor: 'grey', marginHorizontal: 20, marginVertical: 15 }} />
                <InfoPostUser createAt={post.createAt}
                    userCreate={{ email: 'char@prueba.com', displayName: 'Ninguno', photoURL: null, providerId: 'email' }}
                    location={post.location}
                    address={post.address}
                    title={post.title}
                //loginWithFacebook={loginWithFacebook}
                //linkProfile={linkProfile}
                //toastRef={toastRef}
                />
            </View>


        </ScrollView>
    )
}