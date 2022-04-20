import { Input, Icon, CheckBox } from "@rneui/base";
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { styles } from './RegisterForm.styles'
import * as Linking from 'expo-linking';
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './RegisterForm.data'
import { Button } from "@rneui/base";


export function RegisterForm() {


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: (formValue) => console.log('form', formValue)
    });

    const [hidePassword, setHidePassword] = useState(true)
    const [hidePasswordRepeat, setHidePasswordRepeat] = useState(true)

    const [disabledForm, setDisabledForm] = useState(false)
    const [accept, setAccept] = useState(false)

    const openWeb = () => {
        Linking.openURL("https://www.adopweb.com.ar/terms")
    }



    return (
        <View style={styles.content}>

            <Input
                placeholder="Ingresa nombre usuario "
                containerStyle={styles.inputForm}
                //onChange={e => setUserName(e.nativeEvent.text)}
                onChangeText={text => formik.setFieldValue('userName', text)}
                maxLength={10}
                style={styles.textInput}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="account"
                        iconStyle={styles.iconRight}
                    />
                }
                errorMessage={formik.errors.userName}
                errorStyle={{ fontFamily: 'ComfortaaB' }}
            />

            <Input
                placeholder="Ingresa tu correo "
                containerStyle={styles.inputForm}
                onChangeText={text => formik.setFieldValue('email', text)}
                style={styles.textInput}
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.iconRight}
                    />
                }
                errorMessage={formik.errors.email}
                errorStyle={{ fontFamily: 'ComfortaaB' }}
            />

            <Input
                placeholder="Ingresa una contraseña"
                password={true}
                secureTextEntry={hidePassword}
                containerStyle={styles.inputForm}
                onChangeText={text => formik.setFieldValue('password', text)}
                style={styles.textInput}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={hidePassword ? "eye-outline" : "eye-off-outline"}
                        iconStyle={styles.iconRight}
                        onPress={() => setHidePassword(!hidePassword)}
                    />
                }
                errorMessage={formik.errors.password}
                errorStyle={{ fontFamily: 'ComfortaaB' }}
            />
            <Input
                placeholder="Repita la contraseña"
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


            <CheckBox
                //title='Acepto los terminos y condiciones de uso'
                title={<Text style={{ fontFamily: 'ComfortaaL', fontSize: 10 }}>Acepto los terminos y condiciones de uso</Text>}
                checked={accept}
                checkedColor='#ff8e00'
                containerStyle={{ marginBottom: 10, marginTop: 10, marginHorizontal: 15, backgroundColor: 'none' }}
                onPress={() => setAccept(!accept)}

            />

            <View style={{ alignItems: "center" }}>
                <TouchableOpacity onPress={openWeb}>
                    <Text style={{ color: '#ff8e00', fontFamily: 'ComfortaaM' }}>Ver terminos y condiciones</Text>
                </TouchableOpacity>
            </View>

            <Button
                title='Registrarse'
                onPress={formik.handleSubmit}
                buttonStyle={styles.btn}
                titleStyle={{ fontFamily: 'ComfortaaM' }}
            />

        </View>
    )
}
