import axios from 'axios';
import { API_KEY } from '@env';
const apiKey = API_KEY;

const QuoteFetch = async () => {

    const options = {
        method: 'POST',
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            contents: {
                'parts': {
                    'text': 'Give me ten quotes to improve my mood'
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

    let quotes = null;

    try {
        //const response = await axios.request(options);
        //console.log('Gemini API response: ', response.data.candidates[0].content.parts[0].text);
        const response = "1. \\\"The best way to cheer yourself up is to try to cheer somebody else up.\\\" - Mark Twain\\n2. \\\"When you are grateful, fear disappears and abundance appears.\\\" - Tony Robbins\\n3. \\\"A smile is the universal language of kindness.\\\" - William Arthur Ward\\n4. \\\"Happiness is not something ready made. It comes from your own actions.\\\" - Dalai Lama\\n5. \\\"The greatest glory in living lies not in never falling, but in rising every time we fall.\\\" - Nelson Mandela\\n6. \\\"If you look at what you have in life, you'll always have more. If you look at what you don't have in life, you'll never have enough.\\\" - Oprah Winfrey\\n7. \\\"Your smile is a powerful weapon; use it wisely.\\\" - Steve Maraboli\\n8. \\\"Sometimes your joy is the source of your smile, but sometimes your smile can be the source of your joy.\\\" - Thich Nhat Hanh\\n9. \\\"Happiness is not having what you want, but wanting what you have.\\\" - Kahlil Gibran\\n10. \\\"The happiness of your life depends upon the quality of your thoughts.\\\" - Marcus Aurelius";

        const formatedResponse = response.split("\\n")
            .map(item => item.replace(/^\d+\.\s/, ''))
            .map(item => item.replace(/\\/g, ""))
            .map(item => ({ message: item }));
        quotes = formatedResponse;
    } catch (error) {
        console.log(error);
        alert("Something went wrong. Please try again.");
    }

    return quotes;
}

export default QuoteFetch;