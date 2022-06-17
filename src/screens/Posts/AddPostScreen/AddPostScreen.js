import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { InfoForm, UploadImagesForm, AddOptions } from '../../../components/Posts/AddPost'
import { initialValues, validationSchema } from './AddPostScreen.data';
import { Button } from '@rneui/base'
import { v4 as uuid } from 'uuid'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getDownloadURL, getStorage, uploadBytes, ref, uploadBytesResumable } from 'firebase/storage';
import { styles } from './AddPostScreen.styles'
import { LoadingModal } from '../../../components/shared';
import { db } from '../../../utils/'
import { doc, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message'
import { getAuth } from 'firebase/auth';
import { Modal } from '../../../components/shared/Modal'
import { globalStyles } from '../../../utils'

export function AddPostScreen() {

    const nav = useNavigation();
    const [uploadingImgs, setUploadingImgs] = useState(null)
    const [uploadingPost, setUploadingPost] = useState(null)
    const [textLoading, setTextLoading] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [urls, setUrls] = useState([])
    const [user, setUser] = useState(null)

    const [typePost, setTypePost] = useState('')


    useEffect(() => {
        const currentUser = getAuth().currentUser
        setUser(currentUser);
    }, [])

    useEffect(() => {
        uploadingImgs ? setTextLoading('Subiendo Imagenes') : setTextLoading('Subiendo Post')
    }, [uploadingImgs])

    useEffect(() => {
        console.log('aca');
        if (urls) {
            console.log(urls.length)
            console.log('URLS', urls)
            if (urls.length !== 0) {
                if (urls.length === formik.values.images.length) {
                    uploadPost()
                }
            }
        }

    }, [urls])


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            setIsLoading(true)
            try {
                uploadImageStorage()
            } catch (error) {
                console.log(error)
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Error al subir post',
                    text2: 'Ocurrio un error al intenter subir post'
                })
                nav.goBack();
            }
        }
    });


    const uploadImageStorage = async () => {

        setUploadingImgs(true)
        const imagesBlob = [...urls]

        let imgs = [...formik.values.images]

        const i = await Promise.all(
            imgs.map(async img => {
                const response = await fetch(img)
                const blob = await response.blob()

                const storage = getStorage();
                const storageRef = ref(storage, `mascotasimgs/${uuid()}`)

                await uploadBytes(storageRef, blob).then(snap => {
                    getDownloadURL(snap.ref).then(result => {
                        console.log('RESULT')
                        imagesBlob.push(result)
                        setUrls([...imagesBlob])
                    })
                });
            })
        );
    };

    const uploadPost = async () => {

        setUploadingImgs(false);
        setUploadingPost(true);

        const newData = formik.values;
        newData.id = uuid();
        newData.createAt = Date();
        newData.images = [...urls]
        newData.useCreate = user.email

        const mydb = doc(db, 'petsNews', newData.id);
        await setDoc(mydb, newData);

        setIsLoading(false)
        setUploadingPost(false)

        nav.goBack();
    }

    const typePostHeader = (typepost) => {


        switch (typepost) {
            case 'adop':
                return (
                    <TouchableOpacity underlayColor={'transparent'} style={[styles.viewOption, globalStyles.btnAdop]}>
                        <Text style={{ textAlign: 'center', fontFamily: 'ComfortaaB', fontSize: 12, color: '#427865' }}>QUIERO DAR EN ADOPCIÓN</Text>
                    </TouchableOpacity>
                )
                break;
            case 'trans':
                return (
                    <TouchableOpacity underlayColor={'transparent'} style={[styles.viewOption, globalStyles.btnTrans]}>
                        <Text style={{ textAlign: 'center', fontFamily: 'ComfortaaB', fontSize: 12, color: '#374491' }}>ESTOY BUSCANDO TRÁNSITO</Text>
                    </TouchableOpacity>
                )
                break;
            case 'lost':
                return (
                    <TouchableOpacity underlayColor={'transparent'} style={[styles.viewOption, globalStyles.btnLost]}>
                        <Text style={{ textAlign: 'center', fontFamily: 'ComfortaaB', fontSize: 12, color: '#6b46a5' }}>SE ME PERDIÓ MI MASCOTA</Text>
                    </TouchableOpacity>

                )
                break;
        }
    }


    return (
        <KeyboardAwareScrollView>

            <View>{typePostHeader('lost')}</View>
            <Modal>
                <AddOptions setTypePost={setTypePost} />
            </Modal>

            <UploadImagesForm formik={formik} />

            <InfoForm formik={formik} />

            <Button
                title='Publicar'
                onPress={formik.handleSubmit}
                buttonStyle={[styles.btn, formik.isSubmitting && { backgroundColor: '#ccc' }]}
                titleStyle={{ fontFamily: 'ComfortaaM' }}
                loading={formik.isSubmitting}
            />

            <LoadingModal isVisible={isLoading} text={textLoading} />

        </KeyboardAwareScrollView>
    )
}