import React from 'react'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PostsScreen } from "../screens/Posts/PostsScreen";
import { AddPostScreen } from '../screens/Posts/AddPostScreen'
import { screen } from '../utils'
import { PostDetailsScreen } from '../screens/Posts/PostDetailsScreen';

const Stack = createNativeStackNavigator();

export function PostsStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={screen.pets.pets}
                component={PostsScreen}
                options={{ title: 'Mascotas' }}
            />
            <Stack.Screen
                name={screen.pets.addPost}
                component={AddPostScreen}
                options={{ title: 'Nuevo Publicacion' }}
            />
            <Stack.Screen
                name={screen.pets.pet}
                component={PostDetailsScreen}
                options={{ title: '' }}
            />
        </Stack.Navigator>
    )
}