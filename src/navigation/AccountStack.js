import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AccountScreen } from '../screens/Account/AccountScreen'
import { screen } from '../utils'
import { LoginScreen } from '../screens/Account/LoginScreen/LoginScreen';
import { RegisterScreen } from '../screens/Account/RegisterScreen';


const Stack = createNativeStackNavigator();

export function AccountStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={screen.account.account}
                component={AccountScreen}
                options={{ title: 'Mi Cuenta', headerTitleStyle: { fontFamily: 'ComfortaaB', color: '#ff8e00' }, headerTitleAlign: 'center' }}
            />
            <Stack.Screen
                name={screen.account.login}
                component={LoginScreen}
                options={{ title: 'Iniciar sesion', headerTitleStyle: { fontFamily: 'ComfortaaB', color: '#ff8e00' }, headerTitleAlign: 'center' }}
            />
            <Stack.Screen
                name={screen.account.register}
                component={RegisterScreen}
                options={{ title: 'Registrarse', headerTitleStyle: { fontFamily: 'ComfortaaB', color: '#ff8e00' }, headerTitleAlign: 'center' }}
            />
        </Stack.Navigator>
    )
}