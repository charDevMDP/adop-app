import React, { useState, useEffect, useRef } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity, Dimensions, Platform } from 'react-native'
import * as Location from 'expo-location';
import Toast from 'react-native-toast-message'
import MapView from "react-native-maps"
import { styles } from './UploadImagesForm.styles'
import { Button, Divider, Icon, Image } from '@rneui/base';
import * as ImagePicker from "expo-image-picker"
import { Camera } from 'expo-camera';
import { v4 as uuid } from "uuid"
import { map, filter } from 'lodash'
import { getDownloadURL, getStorage, uploadBytes, ref } from 'firebase/storage';
import { Modal } from '../../../shared';


export function UploadImagesForm(props) {
    const { formik } = props

    const [showModalDelete, SetshowModalDelete] = useState(false)
    const [showModalCam, SetshowModalCam] = useState(false)
    const [imgPetSelect, setImgPetSelect] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // expo-camera
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [acceptPermissionsCam, setAcceptPermissionsCam] = useState(null)
    const [acceptPermissionsMedia, setAcceptPermissionsMedia] = useState(null)

    const [imagesSelected, setImagesSelected] = useState([])

    const camRef = useRef()

    useEffect(() => {
        if (formik.values.images.length > 0) {
            setImagesSelected(formik.values.images)
        }
    }, [formik])

    useEffect(() => {
        (async () => {
            const camPerm = await Camera.requestCameraPermissionsAsync();
            const mediaPerm = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setAcceptPermissionsCam(camPerm.status === 'granted');
            setAcceptPermissionsMedia(mediaPerm.status === 'granted')
        })();
    }, []);

    const imageSelect = async () => {
        if (Platform.OS !== 'web') {
            console.log('STATUS: ', acceptPermissionsMedia)
            if (!acceptPermissionsMedia) {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Rechazaste los permisos a la camara',
                    text2: 'Vas a tener que ir a los ajustes de tu telefono'
                })
            } else {
                let result = await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    aspect: [4, 3]
                });
                if (result.cancelled) {
                    Toast.show({
                        type: 'info',
                        position: 'bottom',
                        text1: 'Saliste',
                        text2: 'Cerraste la galeria de imagenes'
                    })
                } else {
                    //setIsLoading(true);
                    //uploadImage(result.uri)
                    formik.setFieldValue('images', [...formik.values.images, result.uri])
                }
            }
        }

    };

    useEffect(() => {
        (!acceptPermissionsCam && showModalCam === true) &&
            (
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Sin permisos',
                    text2: 'Rechazaste los permisos a la cámara, vas a tener que ir a los ajustes de tu teléfono.',
                    onHide: () => SetshowModalCam(false)
                })
            )
    }, [showModalCam])


    /* NO ESTA ANDANDO EL TakePictureAsync
        const takePhoto = async () => {
            SetshowModalCam(false)
            setIsLoading(true)
    
            if (!acceptPermissionsCam) {
                Toast.show({
                    type: 'info',
                    position: 'bottom',
                    text1: 'Sin permisos',
                    text2: 'Rechazaste los permisos a la cámara, vas a tener que ir a los ajustes de tu teléfono.'
                })
            } else {
                console.log('1')
                if (camRef) {
                    console.log('2')
                    let result;
                    const options = { quality: 0.5, skipProcessing: true }
    
                    result = await camRef.current.takePictureAsync(options)
                    console.log('3')
                    console.log(result)
    
                    if (result) {
                        setIsLoading(false)
                        formik.setFieldValue('images', [...formik.values.images, result.uri])
                    }
                }
            }
        };
    */

    const uploadImage = async uri => {
        const response = await fetch(uri);
        const blob = await response.blob();

        const storage = getStorage();
        const storageRef = ref(storage, `mascotasimgs/${uuid()}`)

        uploadBytes(storageRef, blob).then(snap => {
            uploadPhotoPet(snap.metadata.fullPath)
        });
    };

    const uploadPhotoPet = async imgPath => {
        const storage = getStorage();
        const imgRef = ref(storage, imgPath);

        const imgURL = await getDownloadURL(imgRef);

        formik.setFieldValue('images', [...formik.values.images, imgURL])

        setIsLoading(false)
    }


    const removeImage = () => {

        setImagesSelected(filter(formik.values.images, (imgURL => imgURL !== imgPetSelect)))
        SetshowModalDelete(false)

    }


    return (
        <>
            <View style={styles.viewImages}>
                {imagesSelected.length < 5 && (
                    <TouchableOpacity style={styles.containerIcon} onPress={imageSelect} >
                        <Icon name="image-plus" type="material-community" color="#7a7a7a" size={25} />
                        {/*
                            <Divider style={{ backgroundColor: 'grey', marginHorizontal: 20, marginVertical: 5, height: 1.5, width: "80%" }} />
                            <Icon type="material-community" name="camera" color="#7a7a7a" onPress={() => { SetshowModalCam(true) }} />
                         */}
                    </TouchableOpacity>
                )}

                {map(imagesSelected, (imagePet) => (
                    <View style={{ borderRadius: 10, overflow: 'hidden' }} key={imagePet}>
                        <TouchableOpacity onPress={() => { setImgPetSelect(imagePet); SetshowModalDelete(true) }} key={imagePet}>
                            <Image
                                key={imagePet}
                                style={styles.miniatureStyle}
                                source={{ uri: imagePet }}
                                PlaceholderContent={<ActivityIndicator color="#FF8E00" />}
                            />
                        </TouchableOpacity>
                    </View>
                ))}



                {showModalDelete && (
                    <Modal open={showModalDelete} close={SetshowModalDelete}>
                        <View>
                            <Text style={{ textAlign: 'center', fontFamily: 'ComfortaaM', marginBottom: 20, marginTop: 10 }}>¿Queres eliminar la imagen de la lista?</Text>
                            <View style={{ marginBottom: 10 }}>
                                <Button
                                    title="No, mantener"
                                    buttonStyle={styles.btn}
                                    titleStyle={{ fontFamily: 'ComfortaaM' }}
                                    onPress={() => SetshowModalDelete(false)}
                                />
                                <Button
                                    title="Sí, quitar"
                                    buttonStyle={styles.btn}
                                    titleStyle={{ fontFamily: 'ComfortaaM' }}
                                    onPress={() => removeImage()}
                                />
                            </View>
                        </View>
                    </Modal>

                )}

                {(showModalCam && acceptPermissionsCam) && (
                    <Modal open={showModalCam} close={SetshowModalCam}>
                        <Camera style={styles.camera} type={type} ref={ref => camRef.current = ref}>
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => {
                                        setType(
                                            type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back
                                        );
                                    }}>
                                    <Icon type="ionicon" name="camera-reverse-outline" color="#fff" />
                                </TouchableOpacity>
                            </View>
                        </Camera>
                        <View style={{ marginVertical: 10, paddingTop: 10 }}>
                            <Button
                                title='Tomar foto'
                                buttonStyle={styles.btn}
                                titleStyle={{ fontFamily: 'ComfortaaM' }}
                                onPress={() => takePhoto()}
                            />
                        </View>
                    </Modal>
                )}

            </View>
            <Text style={styles.error}>{formik.errors.images}</Text>
            <Divider style={{ marginHorizontal: 20 }} />
        </>
    )
}