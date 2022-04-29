import { useFormik } from 'formik';
import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { InfoForm, UploadImagesForm } from '../../../components/Posts/AddPost'
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
import { async } from '@firebase/util';
import { map } from 'lodash'

import firebase from '../../../utils/firebase'

export function AddPostScreen() {

    const nav = useNavigation();
    const [uploadingImgs, setUploadingImgs] = useState(null)
    const [uploadingPost, setUploadingPost] = useState(null)
    const [textLoading, setTextLoading] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [urls, setUrls] = useState([])


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

        const mydb = doc(db, 'petsNews', newData.id);
        await setDoc(mydb, newData);

        setIsLoading(false)
        setUploadingPost(false)

        nav.goBack();
    }


    return (
        <KeyboardAwareScrollView>

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