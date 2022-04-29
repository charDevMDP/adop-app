import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import * as Location from 'expo-location';
import { Modal } from '../../../shared';
import Toast from 'react-native-toast-message'
import MapView from "react-native-maps"
import { styles } from './MapForm.styles'
import { Button } from '@rneui/base';


export function MapForm(props) {

    const { show, close, formik } = props
    const [location, setLocation] = useState(null)
    const [statusMap, setStatusMaps] = useState("")
    const [errorMsg, setErrorMsg] = useState(null);
    const [retry, setRetry] = useState(false)


    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();

            console.log('S', status)
            if (status !== 'granted') {
                console.log("ENTRAA")
                setErrorMsg('Sin permisos');
                Toast.show({
                    type: 'info',
                    position: 'bottom',
                    text1: "No permitiste acceder a tu localización por ende no se podrá mostrar tu zona, ve a  los ajustes de tu dispositivo para cambiar esta opción luego"
                })
                return;
            } else {
                try {
                    const loc = await Location.getCurrentPositionAsync({});
                    setLocation({
                        latitude: loc.coords.latitude,
                        longitude: loc.coords.longitude,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001
                    })
                } catch (error) {
                    setErrorMsg('Ubicacion desactivada')
                    Toast.show({
                        type: 'info',
                        position: 'bottom',
                        text1: 'Ubicacion desactivada',
                        text2: "No pudimos encontrar su posición. Asegúrese tu ubicación esté activada"
                    })
                }
            }



        })();
    }, [retry])



    const ViewMap = () => {
        if (errorMsg === 'Sin permisos') {
            return (
                <View style={{ alignContent: "center", marginHorizontal: 25, alignItems: "center", marginVertical: 15 }}>
                    <Text style={{ textAlign: "center", fontFamily: 'ComfortaaB' }}> No permitiste acceder</Text>
                    <Text style={{ textAlign: "center", fontFamily: 'ComfortaaB' }}> a tu localización</Text>
                    <Text style={{ textAlign: "center", fontFamily: 'ComfortaaB' }}> revisa los ajustes de tu celular</Text>
                </View>
            )
        }
        if (errorMsg === 'Ubicacion desactivada') {
            return (
                <View style={{ alignContent: "center", marginHorizontal: 25, alignItems: "center", marginVertical: 15 }}>
                    <Text style={{ textAlign: "center", fontFamily: 'ComfortaaB' }}> Ubicación desactivada</Text>
                    <Text style={{ textAlign: "center", fontFamily: 'ComfortaaB' }}> No pudimos encontrar tu ubicación</Text>
                    <Text style={{ textAlign: "center", fontFamily: 'ComfortaaB' }}> Asegúrese tu ubicación esté activada</Text>
                    <View style={styles.viewBtn}>
                        <Button
                            title="Reintentar"
                            buttonStyle={{ backgroundColor: '#ff8e00', borderRadius: 10 }}
                            titleStyle={{ fontFamily: 'ComfortaaB' }}
                            onPress={() => setRetry(!retry)} />
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={styles.viewLoading} >
                    <ActivityIndicator size="large" color="#Ff8a00" />
                    <Text style={{ fontFamily: 'ComfortaaM' }}>Cargando Mapa.. </Text>
                </View>
            )
        }
    }

    const saveLocation = () => {
        formik.setFieldValue('location', location)
        close()
    }

    return (
        <Modal show={show} close={close}>
            <View>
                {location ? (
                    <View>
                        <MapView style={styles.mapStyle}
                            initialRegion={location}
                            showsUserLocation={true}
                            onRegionChange={r => setLocation(r)}
                        >
                            <MapView.Marker draggable coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude
                            }} />
                        </MapView>

                        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20, marginBottom: 5 }}>
                            <View style={{ width: "50%", marginRight: 5 }}>
                                <Button
                                    title="Guardar"
                                    buttonStyle={{ backgroundColor: '#ff8e00', borderRadius: 10 }}
                                    titleStyle={{ fontFamily: 'ComfortaaB' }}
                                    onPress={saveLocation} />
                            </View>
                            <View style={{ width: "50%", marginLeft: 5 }}>
                                <Button
                                    title="Cancelar"
                                    buttonStyle={{ backgroundColor: 'red', borderRadius: 10 }}
                                    titleStyle={{ fontFamily: 'ComfortaaB' }}
                                    onPress={close} />
                            </View>
                        </View>
                    </View>
                ) : (<ViewMap />)
                }
            </View>
        </Modal>
    );

}