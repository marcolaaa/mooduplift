import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import SplashScreen from './components/SplashScreen';
import { useFonts } from 'expo-font';

export default function App() {
    let [fontsLoaded] = useFonts({
        "Satisfy-Regular": require('./assets/fonts/Satisfy-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <SafeAreaProvider>
            <SplashScreen></SplashScreen>
        </SafeAreaProvider>
    );
}