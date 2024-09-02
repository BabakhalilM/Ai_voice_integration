
import axios from 'axios';

// const apiKey = "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";
// const apiKey='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';
const apiKey='AIzaSyAbMZKfZSTYoNUR6FCb1NZXvJYYEuc7ruY';
export const getLLMResponse = async (input) => {
    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    };
    
    const data = {
        model: 'gpt-3.5-turbo', // Use the appropriate model
        messages: [{ role: 'user', content: input }],
        max_tokens: 150,
    };

    try {
        const response = await axios.post(url, data, { headers });
        return response.data.choices[0].message.content;
    } catch (error) {
        console.error("Error fetching LLM response", error);
        throw error;
    }
};
