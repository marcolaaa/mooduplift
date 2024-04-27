import axios from 'axios';
import { useState, useEffect } from 'react';
import { API_KEY } from '@env';
const apiKey = API_KEY;

const QuoteFetch = () => {

    const [quotes, setQuotes] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'POST',
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={apiKey}`,
        headers: {
            'Content-Type': 'application/json'
        },
        contents: [
            {
                'parts': [
                    {
                        'text': 'Give me ten quotes to improve my mood'
                    }
                ]
            }
        ],
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
    };

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.request(options);
            setQuotes(response.data.contents[0].parts[0].text);
            setIsLoading(false);
            console.log('Gemini API response: ', response.data);
        } catch (error) {
            setError(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const refectch = () => {
        fetchData();
    }

    return { quotes, isLoading, error, refectch };
}

export default QuoteFetch;