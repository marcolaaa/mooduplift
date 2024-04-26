import React from "react";
import { View, Text, Animated, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

import { Svg, Defs, RadialGradient, Stop, Rect } from "react-native-svg";

import styles from '../styles/quoteStyles.js';

export default class QuoteCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    
    _scrollY = new Animated.Value(0);

    render() {
        const { quotes } = this.props;

        return (
            <Animated.ScrollView
                scrollEventThrottle={16}
                contentContainerStyle={styles.scrollViewContainer}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: this._scrollY } } }],
                    { useNativeDriver: true }
                )}
            >
                {quotes.map((quote, i) => this._renderQuote(quote, i))}
            </Animated.ScrollView>
        );
    };

    _renderQuote = (quote, i) => {
        
        const inputRange = [
            (i - 2) * height,
            (i - 1) * height,
            i * height,
            (i + 1) * height
        ];

        const quoteOpacity = this._scrollY.interpolate({
            inputRange,
            outputRange: [1, .1, 1, .1]
        });

        return (
            <View key={i} style={[styles.container, styles.item]}>
                <Animated.View style={[
                    styles.metaContainer,
                    {
                        opacity: quoteOpacity
                    }
                ]}>
                    <Text style={[styles.font, styles.description]}>{quote.message}</Text>
                </Animated.View>
                {this._renderRadialGradient(this._generateRandomBlueColor(), inputRange)}
            </View>
        );  
    }

    _generateRandomBlueColor = () => {
        /**
         * Hue is a degree on the color wheel (from 0 to 360) - 0 (or 360) is red, 120 is green, 240 is blue. 
         * Saturation is a percentage value; 0% means a shade of gray and 100% is the full color. 
         * Lightness is also a percentage; 0% is black, 100% is white.
         */
        return `hsl(` + Math.random() * 360 + `, 100%, 80%)`;
    }

    _renderRadialGradient = (color, inputRange) => {
        const rotate = this._scrollY.interpolate({
            inputRange,
            outputRange: ['0deg', '-35deg', '0deg', '35deg'],
        })

        const translateY = this._scrollY.interpolate({
            inputRange,
            outputRange: [0, height, 0, -height],
        })

        const opacity = this._scrollY.interpolate({
            inputRange,
            outputRange: [1, .2, 1, .2],
        })
        return (
            <Animated.View style={[
                styles.svgContainer, { 
                    transform: [
                        { rotate }, 
                        { translateY },
                        { scaleX: 1.3 }
                    ], 
                    opacity 
                    }, 
                    styles.svgContainer
                ]}>
                <Svg height={height} width={width}>
                    <Defs>
                        <RadialGradient id="grad" cx="50%" cy="50%" r="60%" gradientUnits="userSpaceOnUse">
                            <Stop
                                offset="0%"
                                stopColor="#fff"
                                stopOpacity="1"
                            />
                            <Stop
                                offset="100%"
                                stopColor={color}
                                stopOpacity="1"
                            />
                        </RadialGradient>
                    </Defs>
                    <Rect 
                        x="0"
                        y="0"
                        width={width}
                        height={height}
                        fill={`url(#grad)`}
                        fillOpacity="0.9"
                    />
                </Svg>
            </Animated.View>
        );
    }
}