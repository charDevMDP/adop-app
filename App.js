import React from 'react'
import { NavigationContainer, } from '@react-navigation/native';
import { AppNavigation } from './src/navigation/AppNavigation';
import AppLoading from 'expo-app-loading';
import { useFonts } from '@expo-google-fonts/comfortaa'
import { View } from 'react-native';


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
    <View style={{ flex: 1, fontFamily: 'ComfortaaM' }}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </View>
  );
}

