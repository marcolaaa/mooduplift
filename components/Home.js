import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';

import QuoteCard from './quoteCard';
import QuoteFetch from '../hook/QuoteFetch';

export default function Home() {

    const [isLoading, setIsLoading] = React.useState(true);
    const [quotes, setQuotes] = React.useState(null);

    _getQuotes = async () => {
        try {
            const retrievedQuotes = await AsyncStorage.getItem('@quotes');
            if(retrievedQuotes === null) {
                const data = await QuoteFetch();
                // get first 5 quotes
                const firstFiveQuotes = data.slice(0, 5);
                setQuotes(firstFiveQuotes); 
                // store last 5 quotes
                const lastFiveQuotes = data.slice(-5);
                await AsyncStorage.setItem(
                    '@quotes',
                    JSON.stringify(lastFiveQuotes)
                );
            } else {
                await AsyncStorage.removeItem('@quotes');
                setQuotes(JSON.parse(retrievedQuotes));
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    React.useEffect(() => {
        _getQuotes();
    }, []);

    if (isLoading) {
        return null;
    }

    return (
        <QuoteCard quotes={quotes} />
    );
}