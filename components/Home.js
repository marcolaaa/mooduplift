import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Animated, Text, View } from 'react-native';
import { useFonts } from 'expo-font';

import QuoteCard from './quoteCard';
import QuoteFetch from '../hook/QuoteFetch';

const TEST_LIST = [
    {
        message: "The only way to do great work is to love what you do. - Steve Jobs"
    },
    {
        message: "Every day may not be good, but there is something good in every day. - Unknown"
    },
    {
        message: "Believe you can and you're halfway there. - Theodore Roosevelt"
    },
    {
        message: "In the midst of winter, I found there was, within me, an invincible summer. - Albert Camus"
    },
    {
        message: "Happiness is not by chance, but by choice. - Jim Rohn"
    },
    {
        message: "The greatest glory in living lies not in never falling, but in rising every time we fall. - Nelson Mandela"
    },
    {
        message: "You are never too old to set another goal or to dream a new dream. - C.S. Lewis"
    },
    {
        message: "The best way to predict the future is to create it. - Abraham Lincoln"
    }
];


export default function Home() {

    let [fontsLoaded] = useFonts({
        "Satisfy-Regular": require('../assets/fonts/Satisfy-Regular.ttf'),
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <QuoteCard quotes={TEST_LIST} />
    );
}