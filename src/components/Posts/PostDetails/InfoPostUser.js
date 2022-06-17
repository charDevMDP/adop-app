import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import { Avatar, Image, Icon, } from '@rneui/base'
import * as Location from 'expo-location';

import Map from './Map';
//import * as Linking from 'expo-linking';

const widthScreen = Dimensions.get("window").width;


export function InfoPostUser(props) {
    console.log(props)
    const { createAt, userCreate, location, title, address, loginWithFacebook = true, linkProfile = 'www.adopweb.com.ar' } = props

    const [statusMap, setStatusMaps] = useState("")
    const [doneMsgLocation, setDoneMsgLocation] = useState(false)

    useEffect(() => {
        if (!doneMsgLocation && statusMap === "") {
            (async () => {
                let { status } = await Location.requestForegroundPermissionsAsync();
                setStatusMaps(status)
                console.log(status)

                if (status !== 'granted') {
                    console.log('location no active')
                    //toastRef.current.show("Tu localización no este activada, por esto no podrás ver si pusieron la ubicación de la mascota, para eso tendrás que activala y volver a internarlo.", 8000)
                    setDoneMsgLocation(true)
                }
            })();
        }
    }, [statusMap])


    let createPost = new Date(createAt.seconds * 1000);

    // FECHA
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

    var avatarUserMascota = userCreate.photoURL;

    if (userCreate.providerId === "facebook.com") {
        avatarUserMascota = userCreate.photoURL + "/picture?height=500";
    }

    const openWeb = () => {
        /*
        if (linkProfile !== null) {
            console.log(linkProfile)
            let linkNew = reemplazarCadena("https://www.facebook.com/app_scoped_user_id/", "fb://profile?id=", linkProfile)
            Linking.openURL(linkNew)
                .then(() => { console.log("ok linkFacebook") })
                .catch(() => { Linking.openURL(linkProfile); console.log("error linkFacebook") })
        } else {
            console.log("link es null")
        }
        */
    }

    const reemplazarCadena = (cadenaVieja, cadenaNueva, cadenaCompleta) => {
        // Reemplaza cadenaVieja por cadenaNueva en cadenaCompleta
        for (var i = 0; i < cadenaCompleta.length; i++) {
            if (cadenaCompleta.substring(i, i + cadenaVieja.length) == cadenaVieja) {
                cadenaCompleta = cadenaCompleta.substring(0, i) + cadenaNueva + cadenaCompleta.substring(i + cadenaVieja.length, cadenaCompleta.length);
            }
        }
        return cadenaCompleta;
    }

    // check
    const viewMap = () => {
        if (statusMap === "granted" && location !== undefined) {

            return (
                <View style={{ borderRadius: 10, borderColor: '#ccc', borderWidth: 0.5 }}>
                    <Map location={location} height={120} />
                </View>
            )
        } else {
            console.log('nop')
            if (location === null || location === undefined) {
                return (<View style={{ borderBottomEndRadius: 20, alignItems: "center" }}>
                    <Image
                        source={require("../../../../assets/imgs/notLocation-min2.png")}
                        style={styles.viewNotMap}
                    />
                </View>)
            } else {
                return (<View style={{ borderBottomEndRadius: 20, alignItems: "center" }}>
                    <Image
                        source={require("../../../../assets/imgs/notPermissions-min2.png")}
                        style={styles.viewNotMap}
                    />
                </View>)
            }

        }
    }

    const listInfo = [
        { text: address, iconName: "map-marker", iconType: "material-community", action: null }
    ]


    return (
        <View style={{}}>

            <View>
                <Text color="#ff8e00" sizeText={12} style={{ textAlign: 'left', marginLeft: 20 }}>Publicado el {Fecha} por: </Text>
            </View>

            <View style={styles.viewInfo} >
                <View style={styles.viewUserInfo}>
                    <View style={{ justifyContent: "center" }} >
                        <Avatar rounded size="medium"
                            source={avatarUserMascota ? { uri: avatarUserMascota } : require('../../../../assets/icons/avatarAdop.png')}
                            containerStyle={styles.userInfoAvatar}
                        />
                    </View>
                    <View style={{ justifyContent: "center", paddingLeft: 10, paddingRight: 20, }}>
                        <Text color="#fff" sizeText={13}>{userCreate.displayName}</Text>
                        <Text sizeText={11} color="#fff" weight="ComfortaaMedium">{userCreate.email}</Text>
                    </View>
                    {loginWithFacebook ? (
                        <View style={{ justifyContent: "center" }}>
                            <Icon name="facebook"
                                type="father"
                                color={"blue"}
                                size={25}
                                onPress={openWeb}
                                underlayColor="transparent"
                            />
                        </View>
                    ) : (
                        <View style={{ justifyContent: "center", width: 30 }}>
                        </View>
                    )}
                </View>
            </View>

            <Text style={{ marginTop: 15, marginLeft: 20 }} sizeText={12} color="#Ff8a00">Ubicación:</Text>
            <View style={{ marginHorizontal: 15, marginVertical: 10, borderRadius: 20 }}>
                {viewMap()}
                <View style={styles.containerList} >
                    <Icon name='map-marker' type='material-community' color="#ff8e00" size={15} />
                    {address
                        ? <Text sizeText={15} style={{ marginLeft: 10 }}>{address}</Text>
                        : <Text sizeText={12} color="#686868" style={{ marginLeft: 10 }}>No dio datos adicionales de la dirreción</Text>
                    }
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleExtraMascota: {
        textAlign: "center",
        marginBottom: 10
    },
    viewInfo: {
        marginTop: 10,
        justifyContent: "center",
        alignItems: 'center',
        //backgroundColor: "rgba(255, 142, 0, 0.5)",
        backgroundColor: '#ccc',
        borderRadius: 15,
        marginHorizontal: 20,
    },
    viewUserInfo: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 15,
        //backgroundColor: "green",
        width: widthScreen - 60,
        paddingHorizontal: 10,

    },
    userInfoAvatar: {
        borderRadius: 50,
        backgroundColor: '#fff'
    },
    containerList: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        //borderBottomColor: "#d8d8d8",
        //borderBottomWidth: 1,
        paddingVertical: 2,
        marginTop: 5,
    },
    viewNotMap: {
        height: 120,
        width: widthScreen - 40,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    }
})
