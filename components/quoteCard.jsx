import React from "react";
import { View, Text, Animated, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

import { Svg } from "react-native-svg";
const { Defs, RadialGradient, Stop, Rect } = Svg;

import styles from '../styles/quoteStyles.js';

export default class QuoteCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { quotes } = this.props;
        _scrollY = new Animated.Value(0);

        return (
            <View style={styles.container}>
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
            </View>
        );
    }

    _renderQuote = (quote, i) => {

        return (
            <View key={i} style={[styles.container, styles.item]}>
                <View style={styles.metaContainer}>
                    <Text style={[styles.font, styles.description]}>{quote.message}</Text>
                </View>
            </View>
        )  
    }
}