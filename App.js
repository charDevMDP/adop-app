import React from 'react'
import { NavigationContainer, } from '@react-navigation/native';
import { AppNavigation } from './src/navigation/AppNavigation';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/comfortaa'
import { View } from 'react-native';
import Toast from 'react-native-toast-message'
import 'react-native-get-random-values'

export default function App() {

  let [fontsLoaded] = useFonts({
    ComfortaaL: require('./assets/fonts/Comfortaa/Comfortaa-Light.ttf'),
    ComfortaaR: require('./assets/fonts/Comfortaa/Comfortaa-Regular.ttf'),
    ComfortaaM: require('./assets/fonts/Comfortaa/Comfortaa-Medium.ttf'),
    ComfortaaB: require('./assets/fonts/Comfortaa/Comfortaa-Bold.ttf')
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }


  return (
    <>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
      <Toast />
    </>
  );
}

