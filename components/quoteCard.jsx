import React from "react";
import { View, Text, ScrollView, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

import { Svg } from "react-native-svg";
const { Defs, RadialGradient, Stop, Rect } = Svg;

export default class QuoteCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { quotes } = this.props;

        return (
            <ScrollView>
                {quotes.map((quote, i) => this._renderQuote(quote, i))}
            </ScrollView>
        );
    }

    _renderQuote = (quote, i) => {

        return (<View key={i}><Text>{quote.message}</Text></View>)  
    }
}