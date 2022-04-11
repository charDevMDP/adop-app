import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PetsScreen } from "../screens/Pets/PetsScreen";
import { AddPost } from '../screens/Pets/AddPost'
import { screen } from '../utils'

const Stack = createNativeStackNavigator();

export function PetsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={screen.pets.pets}
                component={PetsScreen}
                options={{ title: 'Mascotas' }}
            />
            <Stack.Screen
                name={screen.pets.addPost}
                component={AddPost}
                options={{ title: 'Nuevo Publicacion' }}
            />
        </Stack.Navigator>
    )
}