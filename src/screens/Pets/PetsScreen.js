import React from 'react'
import { View, Text } from 'react-native'
import { Button } from '@rneui/base'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../utils';

export function PetsScreen() {

    const nav = useNavigation();

    const goToAddPost = () => {
        nav.navigate(screen.pets.addPost)
    }

    return (
        <View>
            <Text>PetsScreen</Text>
            <Button title='Agregar post' onPress={goToAddPost} />
        </View>
    )
}