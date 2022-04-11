import React from 'react'
import { View, Text, ScrollView } from 'react-native'
import { Button, Image } from '@rneui/base'
import { styles } from './UserGuestScreen.styles'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../../utils'


export default function UserGuestScreen() {

    const nav = useNavigation();

    return (
        <ScrollView
            centerContent={true}
            contentContainerStyle={{ flexGrow: 1, justifyContent: "center", backgroundColor: "#fff" }}

        >
            <View style={styles.viewBody}>

                <Image source={require("../../../../assets/imgs/Profile-min2.png")}
                    style={styles.image}
                    resizeMode="contain"
                />
                <View style={{
                    alignItems: 'center', justifyContent: "center",
                    textAlign: "center", paddingHorizontal: 15,
                }}>
                    <Text style={styles.title}>Hola!</Text>
                    <Text style={styles.title}>Ingresá a tu perfil</Text>
                    <Text style={{ textAlign: "center", lineHeight: 25, marginBottom: 20, fontFamily: 'ComfortaaM' }}>Inicia sesión para poder hacer publicaciones, guardar favoritos, hacer comentarios y acceder a contenido extra.
                    </Text>
                    <Text style={styles.title2}>Publicar es gratis!</Text>
                </View>


                <View style={styles.viewBtn}>
                    <Button title="Ver tu perfil" buttonStyle={{ backgroundColor: '#ff8e00', borderRadius: 10 }} titleStyle={{ fontFamily: 'ComfortaaB' }} onPress={() => nav.navigate(screen.account.login)} mh={30} />
                </View>

            </View>
        </ScrollView >
    )
}