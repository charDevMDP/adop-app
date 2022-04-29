import { Input, Button, Icon } from '@rneui/themed'
import React, { useState } from 'react'
import { View, Text } from 'react-native'
import { styles } from '../Changes.styles'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './ChangePass.data'
import { getAuth, updatePassword, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import Toast from 'react-native-toast-message'

export function ChangePass(props) {

    const { onClose } = props

    const [hidePasswordOld, setHidePasswordOld] = useState(true)
    const [hidePassword, setHidePassword] = useState(true)
    const [hidePasswordRepeat, setHidePasswordRepeat] = useState(true)

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const currentUser = getAuth().currentUser
                const credentials = EmailAuthProvider.credential(currentUser.email, formValue.passwordCurrent);
                reauthenticateWithCredential(currentUser, credentials);

                await updatePassword(currentUser, formValue.passwordNew)

                onClose();
            } catch (error) {
                console.log('E change pass ', error)
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    text1: 'Error al cambiar la contraseña'
                })
            }
        }
    });


    return (
        <View style={styles.view}>
            <Input
                placeholder="Ingresa una contraseña actual"
                password={true}
                secureTextEntry={hidePasswordOld}
                containerStyle={styles.inputForm}
                onChangeText={text => formik.setFieldValue('passwordCurrent', text)}
                style={styles.textInput}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={hidePasswordOld ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setHidePasswordOld(!hidePasswordOld)}
                    />
                }
                errorMessage={formik.errors.passwordCurrent}
                errorStyle={{ fontFamily: 'ComfortaaB' }}
            />
            <Input
                placeholder="Ingresa una contraseña nueva"
                password={true}
                secureTextEntry={hidePassword}
                containerStyle={styles.inputForm}
                onChangeText={text => formik.setFieldValue('passwordNew', text)}
                style={styles.textInput}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={hidePassword ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setHidePassword(!hidePassword)}
                    />
                }
                errorMessage={formik.errors.passwordNew}
                errorStyle={{ fontFamily: 'ComfortaaB' }}
            />
            <Input
                placeholder="Repita la contraseña nueva"
                password={true}
                secureTextEntry={hidePasswordRepeat}
                containerStyle={styles.inputForm}
                onChangeText={text => formik.setFieldValue('repeatPass', text)}
                style={styles.textInput}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={hidePasswordRepeat ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setHidePasswordRepeat(!hidePasswordRepeat)}
                    />
                }
                errorMessage={formik.errors.repeatPass}
                errorStyle={{ fontFamily: 'ComfortaaB' }}
            />
            <View style={{ width: '80%', marginTop: 5 }}>
                <Button
                    title='Cambiar contraseña'
                    onPress={formik.handleSubmit}
                    buttonStyle={[styles.btn, formik.isSubmitting && { backgroundColor: '#ccc' }]}
                    titleStyle={{ fontFamily: 'ComfortaaM' }}
                    loading={formik.isSubmitting}
                />
            </View>


        </View>
    )
}