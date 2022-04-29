import { Input, Button } from '@rneui/themed'
import React from 'react'
import { View, Text } from 'react-native'
import { styles } from '../Changes.styles'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './ChangeName.data'
import { getAuth, updateProfile } from 'firebase/auth'
import Toast from 'react-native-toast-message'

export function ChangeName(props) {

    const { onClose, onReload } = props

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const { userName } = formValue;
                const currentUser = getAuth().currentUser
                await updateProfile(currentUser, { displayName: userName })
                onReload();
                onClose();
            } catch (error) {
                console.log('E change name ', error)
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Error al cambiar la nombre'
                })
            }
        }
    });


    return (
        <View style={styles.view}>
            <Input
                containerStyle={styles.input}
                style={{ fontFamily: 'ComfortaaM', fontSize: 15 }}
                placeholder="Nombre"
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2"
                }}
                onChangeText={text => formik.setFieldValue('userName', text)}
                maxLength={10}
                errorMessage={formik.errors.userName}
                errorStyle={{ fontFamily: 'ComfortaaB' }}
            />
            <View style={{ width: '80%', marginTop: 5 }}>
                <Button
                    title='Cambiar nombre'
                    onPress={formik.handleSubmit}
                    buttonStyle={[styles.btn, formik.isSubmitting && { backgroundColor: '#ccc' }]}
                    titleStyle={{ fontFamily: 'ComfortaaM' }}
                    loading={formik.isSubmitting}
                />
            </View>


        </View>
    )
}