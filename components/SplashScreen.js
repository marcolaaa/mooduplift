import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Logo from '../assets/logo.png'

import QuoteCard from './quoteCard';
import useFetch from '../hook/useFetch';

export default function SplashScreen() {
    // SafeArea value...
    const edges = useSafeAreaInsets();
    // Animated values...
    const startAnimation = useRef(new Animated.Value(0)).current;
    // Scaling down the logo...
    const scaleLogo = useRef(new Animated.Value(1)).current;
    // Offset Animation...
    const moveLogo = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    // Animating Content...
    const contentTransition = useRef(new Animated.Value(Dimensions.get('window').height)).current;

    const { quotes, isLoading, error } = useFetch();

    useEffect(() => {
        if (!isLoading) {
            //Starting Animation after 50 ms...
            setTimeout(() => {

                // Parallel animations...
                Animated.parallel([
                    Animated.timing(
                        startAnimation, {
                        // For same height on non safe area devices... 
                        toValue: -Dimensions.get('window').height * 0.5 + (edges.top + 65),
                        useNativeDriver: true
                    }),
                    Animated.timing(
                        scaleLogo, {
                        // Scaling to .35... 
                        toValue: .65,
                        useNativeDriver: true
                    }),
                    Animated.timing(
                        moveLogo, {
                        // Moving to right most... 
                        toValue: {
                            x: (Dimensions.get('window').width / 2) - 65,
                            y: 0
                        },
                        useNativeDriver: true
                    }),
                    Animated.timing(
                        contentTransition,
                        {
                            toValue: 0,
                            useNativeDriver: true
                        }
                    )
                ]).start();

            }, 50);
        }
    }, [isLoading])

    // Going to move up...
    return (
        <View style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            alignItems: 'center',
            justifyContent: 'center',
        }}>

            <StatusBar hidden />

            <Animated.View style={{
                flex: 1,
                zIndex: 1,
                width: 0,
                height: 0,
                alignItems: 'center',
                justifyContent: 'center',
                transform: [
                    { translateY: startAnimation }
                ]
            }}>


                <Animated.Image source={Logo} style={{
                    width: 140,
                    height: 140,
                    marginBottom: 20,
                    transform: [
                        { translateX: moveLogo.x },
                        { translateY: moveLogo.y },
                        { scale: scaleLogo }
                    ]
                }}></Animated.Image>

            </Animated.View>

            <Animated.View style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 0,
                transform: [
                    { translateY: contentTransition }
                ]
            }}>
                <QuoteCard quotes={quotes} />
            </Animated.View>

        </View>
    );
}