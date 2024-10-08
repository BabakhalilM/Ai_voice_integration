import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState, useEffect, useRef, useContext } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button, Box, Text, Spinner, VStack, HStack, Avatar } from '@chakra-ui/react';
import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaStop } from 'react-icons/fa';
import { Apicontext } from "./apicontext";
import Ex_prompts from "./Ex_prompts";

const Chatbot = () => {
    const { name, selectedAvatar, avatars, topic } = useContext(Apicontext);
    const [response, setResponse] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [userMessage, setUserMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [speakingText, setSpeakingText] = useState("");
    const [isSpeaking, setIsSpeaking] = useState(false);

    const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const timeoutRef = useRef(null);

    const handlePromptSelect = (prompt) => {
        handleLLMResponse(prompt);
    };

    useEffect(() => {
        if (!listening && transcript) {
            timeoutRef.current = setTimeout(() => {
                handleLLMResponse(transcript);
            }, 1000);
        }

        return () => clearTimeout(timeoutRef.current);
    }, [transcript, listening]);

    const responceai = async (input) => {
        setUserMessage("");
        try {
            const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = `
                Please generate a clear and concise response based on ${topic}. 
                Ensure that the response is free of any special characters (*, #, $, etc.) and avoid unnecessary technical jargon. 
                The tone should be friendly and informative. Here is the input: ${input}
            `;

            const result = await model.generateContent(prompt);
            const textResponse = result.response.text();
            return textResponse;
        } catch (err) {
            console.log("Error from AI response:", err);
            throw err;
        }
    };

    const handleLLMResponse = async (input) => {
        setIsGenerating(true);
        setSpeakingText("");
        try {
            const llmResponse = await responceai(input);
            setResponse(llmResponse);
            setChatHistory([...chatHistory, { user: input, bot: llmResponse }]);
            speakResponse(llmResponse);
        } catch (error) {
            if (error.response && error.response.status === 429) {
                setResponse("You have reached the request limit. Please wait a moment and try again.");
            } else {
                console.error("Error handling LLM response", error);
                setResponse("Sorry, something went wrong. Please try again.");
            }
        } finally {
            setIsGenerating(false);
        }
    };

    const speakResponse = (text) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onstart = () => {
            setSpeakingText(text);
            setIsSpeaking(true);
        };
        utterance.onend = () => {
            setSpeakingText("");
            setIsSpeaking(false);
        };
        window.speechSynthesis.speak(utterance);
    };

    const stopSpeaking = () => {
        window.speechSynthesis.cancel();
        setSpeakingText("");
        setIsSpeaking(false);
    };

    const handleCancelGeneration = () => {
        stopSpeaking();
        SpeechRecognition.stopListening();
        resetTranscript(); 
        setUserMessage("");
        setIsGenerating(false);
    };

    const handleListenToggle = () => {
        if (listening) {
            SpeechRecognition.stopListening();
            setUserMessage(transcript);
        } else {
            resetTranscript();
            SpeechRecognition.startListening({ continuous: true });
        }
    };

    const handleClearPrompt = () => {
        resetTranscript(); 
        setUserMessage(""); 
        SpeechRecognition.stopListening(); 
    };

    if (!browserSupportsSpeechRecognition) {
        return <Text>Your browser does not support speech recognition.</Text>;
    }

    return (
        <>
            <Box className="chatbot-container" p={4} borderWidth={1} borderRadius="md" position="relative" minHeight="400px">
                {chatHistory.length === 0 && <Ex_prompts onSelectPrompt={handlePromptSelect} />}
                <VStack spacing={4} mb="60px">
                    {chatHistory.map((chat, index) => (
                        <Box key={index} borderWidth={1} borderRadius="md" p={4} width="100%" mb={4} bg="gray.100">
                            <Box
                                className="chat-display"
                                p={4}
                                borderWidth={1}
                                borderRadius="md"
                                boxShadow="md"
                                bg="gray.50"
                                maxW="100%"
                            >
                                <HStack spacing={4} align="start">
                                    <Avatar
                                        boxSize="50px"
                                        src={avatars[selectedAvatar]}
                                        alt="Avatar"
                                    />
                                    <VStack align="start" spacing={1}>
                                        <Text fontWeight="bold" fontSize="lg">
                                            {name}
                                        </Text>
                                        <Text fontSize="md" color="gray.700">
                                            {chat.user}
                                        </Text>
                                    </VStack>
                                </HStack>
                            </Box>
                            <HStack ml={2} mt={2} spacing={4} align="start">
                                <Avatar
                                    name="Robot"
                                    boxSize="50px"
                                    src="https://th.bing.com/th/id/OIP.kcYqbY0u4odCSmD_jUI9NgHaHa?rs=1&pid=ImgDetMain"
                                    alt="Robot Avatar"
                                    borderWidth={2}
                                    borderColor="blue.500"
                                />
                                <VStack  align="start" spacing={2}>
                                    <Text  fontWeight="bold" fontSize="lg" color="blue.800">
                                        AI
                                    </Text>
                                    <Text fontSize="md" color="gray.700">
                                        {chat.bot}
                                    </Text>
                                </VStack>
                            </HStack>
                            <Button
                                mt={2}
                                size="sm"
                                onClick={() => speakResponse(chat.bot)}
                                leftIcon={<FaVolumeUp />}
                                colorScheme="blue"
                            >
                                Read This
                            </Button>
                        </Box>
                    ))}

                    {isSpeaking && (
                        <Box mb={4}>
                            <Text><strong>Speaking:</strong> {speakingText}</Text>
                            <Button onClick={stopSpeaking} leftIcon={<FaStop />} colorScheme="red" variant="solid">
                                Stop
                            </Button>
                        </Box>
                    )}

                    {listening && (
                        <Box
                            className="chat-display"
                            mb={4}
                            p={4}
                            borderWidth={1}
                            borderRadius="md"
                            boxShadow="md"
                            bg="gray.50"
                            maxW="md"
                            mx="auto"
                        >
                            <HStack spacing={4} align="center">
                                <Avatar
                                    boxSize="50px"
                                    src={avatars[selectedAvatar]}
                                    alt="Avatar"
                                />
                                <VStack align="start" spacing={1}>
                                    <Text fontWeight="bold" fontSize="lg">
                                        {name}
                                    </Text>
                                    <Text fontSize="md" color="gray.700">
                                        {userMessage || transcript}
                                    </Text>
                                </VStack>
                            </HStack>
                        </Box>
                    )}

                    {isGenerating && (
                        <Box mb={4}>
                            <Spinner size="sm" /> <Text>Generating Response...</Text>
                        </Box>
                    )}
                </VStack>
            </Box>

            <Box
                mt={8}
                paddingTop={6}
                display="flex"
                flexDirection={{ base: "column", sm: "row" }}
                gap={4}
                minHeight={12}
                // border={"1px solid red"}
                
                position="fixed"
                bottom={0}
                left={4}
                width="calc(100% - 32px)"
                zIndex="1000"
                bg={"white"}
            >
                <Button
                    onClick={handleListenToggle}
                    leftIcon={listening ? <FaMicrophoneSlash /> : <FaMicrophone />}
                    colorScheme="teal"
                    variant="solid"
                    padding={{ base: "5px", sm: "0px" }}
                    flex="1"
                >
                    {listening ? "Generate Responce" : "Start Listening"}
                </Button>

                <Button
                    onClick={handleClearPrompt}
                    colorScheme="teal"
                    variant="solid"
                    flex="1"
                    padding={{ base: "5px", sm: "0px" }}
                    isDisabled={!listening}
                >
                    Clear Prompt
                </Button>

                <Button
                    onClick={handleCancelGeneration}
                    colorScheme="red"
                    variant="solid"
                    flex="1"
                    padding={{ base: "5px", sm: "0px" }}
                    isDisabled={!listening}
                >
                    Cancel Generation
                </Button>
            </Box>
        </>
    );
};

export default Chatbot;
