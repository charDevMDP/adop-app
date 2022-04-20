import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native"
import { Input, Icon, Button, Text, Divider } from "@rneui/base"
import { styles } from './LoginForm.styles'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './LoginForm.data'


//nuevas
import { useNavigation } from '@react-navigation/native'

export function LoginForm() {

    // TODO: ver tema de token y pushNotif

    const nav = useNavigation();

    const [hidePassword, setHidePassword] = useState(true)


    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: (formValue) => console.log('form login', formValue)
    });


    // nuevos
    const [loading, setLoading] = useState(false)


    const saveToken = async () => {
        //const update = { token: tokenUser };
        //await firebase.auth().currentUser.updateProfile(update);
    }

    /* const registerForPushNotificationsAsync = async () => {
         if (Constants.isDevice) {
             const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
             let finalStatus = existingStatus;
             if (existingStatus !== 'granted') {
                 const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
                 finalStatus = status;
             }
             if (finalStatus !== 'granted') {
                 Alert.alert('Failed to get push token for push notification!');
                 return;
             }
             let token = await Notifications.getExpoPushTokenAsync();
             setTokenUser(token)
         } else {
             Alert.alert('Must use physical device for Push Notifications');
         }
     };*/




    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Ingresa tu correo "
                containerStyle={styles.inputForm}
                onChangeText={text => formik.setFieldValue('email', text)}
                type="email"
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
                placeholder="Ingresa tu contraseña"
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

            <Button
                title="Iniciar Sesión"
                onPress={formik.handleSubmit}
                buttonStyle={styles.btn}
                titleStyle={{ fontFamily: 'ComfortaaM' }}
            />

            <RegisterAccount />

            <Divider style={styles.divider} />

            <ResetPassword />
        </View>
    )


    function RegisterAccount() {

        const navigation = useNavigation();

        return (
            <View style={{ alignItems: "center", marginTop: 25, marginBottom: 15, flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ fontFamily: 'ComfortaaM', fontSize: 14 }}>
                    ¿Aun no tenés cuenta?{" "}
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate()}>
                    <Text style={{ fontFamily: 'ComfortaaB', fontSize: 14, color: '#ff8e00' }}>Registrate</Text>
                </TouchableOpacity>
            </View>
        )
    }

    function ResetPassword(props) {

        return (
            <View style={{ alignItems: "center", marginTop: 8, marginBottom: 15, paddingTop: 20, paddingBottom: 10 }}>
                <Text style={{ fontFamily: 'ComfortaaM', fontSize: 14 }}>
                    ¿Olvidaste tu contraseña?{" "}
                </Text>
                <TouchableOpacity onPress={() => console.log('RESET')}>
                    <Text style={{ fontFamily: 'ComfortaaM', fontSize: 14, color: '#ff8e00' }} >Recupera tu cuenta</Text>
                </TouchableOpacity>
            </View>
        )
    }



}
