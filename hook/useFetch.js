import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_KEY } from '@env';
const apiKey = API_KEY;

const useFetch = () => {
    const [quotes, setQuotes] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const options = {
        method: 'POST',
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            contents: {
                'parts': {
                    'text': 'Give me ten different quotes to improve my mood'
                }
            },
            generationConfig: {
                'temperature': 0.9,
                'topK': 1,
                'topP': 1,
                'maxOutputTokens': 2048,
                'stopSequences': []
            },
            safetySettings: [
                {
                    'category': 'HARM_CATEGORY_HARASSMENT',
                    'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
                },
                {
                    'category': 'HARM_CATEGORY_HATE_SPEECH',
                    'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
                },
                {
                    'category': 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
                    'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
                },
                {
                    'category': 'HARM_CATEGORY_DANGEROUS_CONTENT',
                    'threshold': 'BLOCK_MEDIUM_AND_ABOVE'
                }
            ]
        }
    };

    const warningQuote = [
        {
            message: '\"You might want to set your phone down for a bit and focus on yourself, a hobby, or maybe dive into learning something new. It\'s good to take a break from the app and come back later.\" - MoodUplift App'
        }
    ]

    const retrieveQuotes = async () => {
        // const response = await axios.request(options);
        // const strRespone = JSON.stringify(response.data.candidates[0].content.parts[0].text, null, 2);
        // TODO remove line 63 and the comments from line 60 and 61.
        const strResponse = "1. \"The greatest glory in living lies not in never falling, but in rising every time we fall.\" - Nelson Mandela\n2. \"The future belongs to those who believe in the beauty of their dreams.\" - Eleanor Roosevelt\n3. \"Happiness is not something ready made. It comes from your own actions.\" - Dalai Lama\n4. \"When life gives you lemons, make lemonade.\" - Dale Carnegie\n5. \"The only person you are destined to become is the person you decide to be.\" - Ralph Waldo Emerson\n6. \"Don't let yesterday take up too much of today.\" - Will Rogers\n7. \"Believe you can and you're halfway there.\" - Theodore Roosevelt\n8. \"A smile is the best makeup anyone can wear.\" - Marilyn Monroe\n9. \"In three words I can sum up everything I've learned about life: it goes on.\" - Robert Frost\n10. \"The sun is a daily reminder that we too can rise again from the darkness, that we too can shine our own light.\" - S. Ajna";
        const formatedResponse = JSON.stringify(strResponse, null, 2) // TODO remove stringfy.
            .split('\\n')
            .map(item => item.replace(/\d+\.\s/, '')) // remove numbers
            .map(item => item.replace(/^"|"$/g, '')) // extra remove quotes
            .map(item => item.replace(/\\/g, '')) // extra remove backslash
            .map(item => ({ message: item }));

        return formatedResponse;
    }

    const checkLastOpenedTime = async () => {
        const lastOpenedTime = await AsyncStorage.getItem('@lastOpenedTime');
        if (lastOpenedTime !== null) {
            // Compare the last opened time with the current time
            const currentTime = new Date().getTime();
            const timeDifference = currentTime - parseInt(lastOpenedTime);
            // check if the last usage was less than 3 hour ago
            if (timeDifference < 30000) { //10800000 = 3 hours in milliseconds
                return true;
            }
            return false;
        }
        return false;
    }

    const fetchData = async () => {
        try {
            const userShouldDoSomethingElse = await checkLastOpenedTime();
            if (userShouldDoSomethingElse) {
                setQuotes(warningQuote);
            } else {
                const retrievedQuotes = await AsyncStorage.getItem('@quotes');
                if (retrievedQuotes === null) {
                    const data = await retrieveQuotes();
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
                    // remove last 5 quotes from storage
                    await AsyncStorage.removeItem('@quotes');
                    setQuotes(JSON.parse(retrievedQuotes));
                }
                // Store the current time as the last opened time
                await AsyncStorage.setItem('@lastOpenedTime', String(new Date().getTime()));
            }
        } catch (error) {
            setError(error);
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    };

    return { quotes, isLoading, error, refetch };
}

export default useFetch;