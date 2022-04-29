import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Icon } from "@rneui/base";
import { screen } from '../utils'

// Stacks
import { FavoritesStack } from "./FavoritesStack";
import { SearchStack } from "./SearchStack";
import { AccountStack } from "./AccountStack";
import { PostsStack } from './PostsStack';

const Tab = createBottomTabNavigator();

export function AppNavigation() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarActiveTintColor: '#ff8e00',
                tabBarInactiveTintColor: '#ccc',
                tabBarStyle: { paddingBottom: 5 },
                tabBarLabelStyle: { fontFamily: 'ComfortaaM' },
                tabBarIcon: ({ color, size }) => screenOptions(route, color, size),

            })}
        >
            <Tab.Screen
                name={screen.pets.tab}
                component={PostsStack}
                options={{ title: "Mascotas" }}
            />
            <Tab.Screen
                name={screen.search.tab}
                component={SearchStack}
                options={{ title: "Buscar" }}
            />
            <Tab.Screen
                name={screen.favorites.tab}
                component={FavoritesStack}
                options={{ title: "Favoritos" }}
            />
            <Tab.Screen
                name={screen.account.tab}
                component={AccountStack}
                options={{ title: "Mi Cuenta" }}
            />
        </Tab.Navigator>
    )
}

function screenOptions(route, color, size) {
    let iconName;

    if (route.name === screen.pets.tab) {
        iconName = 'paw';
    }
    if (route.name === screen.favorites.tab) {
        iconName = 'heart'
    }
    if (route.name === screen.search.tab) {
        iconName = 'magnify'
    }
    if (route.name === screen.account.tab) {
        iconName = 'account'
    }

    return (
        <Icon type="material-community" name={iconName} color={color} size={size} />
    );
}