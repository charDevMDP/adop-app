import { useNavigation } from '@react-navigation/native'
import { Image } from '@rneui/base'
import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Platform, TouchableOpacity, TouchableHighlight, ActivityIndicator } from 'react-native'
import { screen } from '../../../utils'
import Header from './Header'
import { styles } from './Post.styles'

export function Post(props) {
    const { post } = props

    const nav = useNavigation();

    const goToPostDetails = (post) => {
        console.log('entra')
        nav.navigate(screen.pets.pet, { id: post.id })
    }


    const { type, title, description, images, createAt, userCreate } = post;

    const [cantFavorites, setCantFavorites] = useState(-1)


    /* Cantidad de favoritos para este post
    useEffect(() => {
        if (favorites && pet && cantFavorites === -1) {
            if (favorites.length > 0) {
                let favs = favorites.filter(fav => fav.idPet === pet.item.id)
                setCantFavorites(favs.length)
            }
        }
    }, [favorites])
    */

    let titleFinal = "";
    let descriptionFinal = "";

    let createPost = new Date(createAt.seconds * 1000);

    const today = createPost.getDate();
    const month = createPost.getMonth() + 1;
    const year = createPost.getFullYear();

    var Fecha = today + "/" + month + "/" + year;

    var todayCurrent = new Date().getDate();
    var monthCurrent = new Date().getMonth() + 1; //Current Month
    var yearCurrent = new Date().getFullYear(); //Current Year

    if (todayCurrent == today) {
        if (monthCurrent == month) {
            if (yearCurrent == year) {
                Fecha = "Hoy";
            }
        }
    }

    title.length > 32
        ? (titleFinal = title.substr(0, 32) + " ...")
        : (titleFinal = title);

    description.length > 46
        ? (descriptionFinal = description.substr(0, 46) + " ...")
        : (descriptionFinal = description);



    return (
        <TouchableHighlight underlayColor='rgba(73,182,77,1,0.9)' onPress={() => goToPostDetails(post)}>

            <View style={styles.viewMascota}>

                {/* ENCABEZADO 
                <Header userCreate={userCreate} type={type} />
*/}
                {/* IMAGEN */}
                <View style={styles.viewMascotaImage}>
                    <Image
                        resizeMode="cover"
                        source={
                            images
                                ? { uri: images[0] }
                                : require("../../../../assets/imgs/no-disponible-min.png")
                        }
                        style={styles.imageMascota}
                        PlaceholderContent={<ActivityIndicator color="#f88a00" />}
                    />
                </View>

                {/* FOOTER
                <Footer cantFavorites={cantFavorites} titleFinal={titleFinal} descriptionFinal={descriptionFinal} Fecha={Fecha} />
 */}
            </View>

        </TouchableHighlight>
    )
}


