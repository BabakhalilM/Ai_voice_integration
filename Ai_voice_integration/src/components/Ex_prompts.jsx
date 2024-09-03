import { Heading, Text } from '@chakra-ui/react';
import React from 'react';

const Ex_prompts = ({ onSelectPrompt }) => {

    const prompts = [
        "Summarize the key points of the latest advancements in artificial intelligence, focusing on how they impact healthcare.",
        "I'm writing a blog post about the benefits of remote work. Can you provide a list of five key advantages, with a brief explanation for each?",
        "Explain the concept of blockchain technology in simple terms, suitable for someone with no technical background.",
        "Provide a comparison between React and Angular, highlighting their pros and cons for building a large-scale web application.",
        "I am preparing for a job interview for a software developer position. What are the top 5 questions I should expect, and how should I answer them?",
        "Create a 5-slide presentation outline on the topic of climate change, including key points for each slide.",
        "What are the most important factors to consider when choosing a college major, and how can I decide which is right for me?",
        "I need to write a cover letter for a marketing position. Can you provide a template that highlights my experience in social media management and content creation?",
        "List 10 creative social media post ideas for promoting a new eco-friendly product."
    ];

    const handlePromptClick = (prompt) => {
        onSelectPrompt(prompt);
    };

    return (
        <div>
            <Heading textAlign='center'>Example Prompts</Heading>
            {prompts.map((prompt, index) => (
                <Text 
                    key={index} 
                    onClick={() => handlePromptClick(prompt)}
                    cursor="pointer"
                    _hover={{ color: "blue.500" }}
                >
                    <strong>{index + 1}.</strong> {prompt}
                </Text>
            ))}
            <Text mt={4}><strong>Note: </strong>Be specific in your prompts. Define the output format you need, and provide any relevant context to help the AI generate a precise response.</Text>
        </div>
    );
}

export default Ex_prompts;
