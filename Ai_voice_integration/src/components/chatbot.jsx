// import { GoogleGenerativeAI } from "@google/generative-ai";
// import React, { useState, useEffect, useRef } from 'react';
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
// import { Button, Box, Text, Spinner, VStack, HStack } from '@chakra-ui/react';
// import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaStop } from 'react-icons/fa';

// const Chatbot = () => {
//     const [response, setResponse] = useState("");
//     const [isGenerating, setIsGenerating] = useState(false);
//     const [userMessage, setUserMessage] = useState("");
//     const [chatHistory, setChatHistory] = useState([]); // Store chat history
//     const [speakingText, setSpeakingText] = useState(""); // Track currently spoken text
//     const [isSpeaking, setIsSpeaking] = useState(false); // Track if currently speaking

//     const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();
//     const timeoutRef = useRef(null); // Reference to the timeout

//     useEffect(() => {
//         console.log("Listening:", listening);
//         console.log("Transcript:", transcript);

//         if (listening && transcript) {
//             clearTimeout(timeoutRef.current);
//         }

//         if (!listening && transcript) {
//             console.log("User stopped speaking, starting timeout...");
//             timeoutRef.current = setTimeout(() => {
//                 handleLLMResponse(transcript); 
//             }, 1000); 
//         }

//         return () => clearTimeout(timeoutRef.current); 
//     }, [transcript, listening]);

//     const API_KEY = 'AIzaSyAbMZKfZSTYoNUR6FCb1NZXvJYYEuc7ruY';

//     const responceai = async (input) => {
//         setUserMessage("");
//         try {
//             console.log("input", input);
            
//             const genAI = new GoogleGenerativeAI(API_KEY);
//             const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
//             console.log(model);
//             const prompt =  input ;
//             console.log("prompt", prompt);

//             const result = await model.generateContent(prompt);
//             console.log("result", result);
//             const textResponse = await result.response.text();
//             console.log("Text Response:", textResponse);
//             return textResponse;
//         } catch (err) {
//             console.log("Error from AI response:", err);
//             throw err;
//         }
//     };

//     const handleLLMResponse = async (input) => {
//         setIsGenerating(true);
//         setSpeakingText("");
//         console.log("Handling input:", input);
//         try {
//             const llmResponse = await responceai(input);
//             setResponse(llmResponse);
//             console.log("LLM Response:", llmResponse);
//             setChatHistory([...chatHistory, { user: input, bot: llmResponse }]); // Add to chat history
//             speakResponse(llmResponse); // Automatically read out the response
//         } catch (error) {
//             if (error.response && error.response.status === 429) {
//                 setResponse("You have reached the request limit. Please wait a moment and try again.");
//             } else {
//                 console.error("Error handling LLM response", error);
//                 setResponse("Sorry, something went wrong. Please try again.");
//             }
//         } finally {
//             setIsGenerating(false);
//         }
//     };

//     const speakResponse = (text) => {
//         const utterance = new SpeechSynthesisUtterance(text);
//         utterance.onstart = () => {
//             setSpeakingText(text);
//             setIsSpeaking(true);
//         };
//         utterance.onend = () => {
//             setSpeakingText("");
//             setIsSpeaking(false);
//         };
//         window.speechSynthesis.speak(utterance);
//     };

//     const stopSpeaking = () => {
//         window.speechSynthesis.cancel();
//         setSpeakingText("");
//         setIsSpeaking(false);
//     };

//     const handleListenToggle = () => {
//         if (listening) {
//             SpeechRecognition.stopListening();
//             setUserMessage(transcript);
//             clearTimeout(timeoutRef.current); // Stop the timeout when listening is stopped
//         } else {
//             resetTranscript();
//             SpeechRecognition.startListening({ continuous: true });
//         }
//     };

//     const displayResponse = isGenerating ? 'Generating response...' : response;

//     if (!browserSupportsSpeechRecognition) {
//         return <Text>Your browser does not support speech recognition.</Text>;
//     }

//     return (
//         <Box className="chatbot-container" p={4} borderWidth={1} borderRadius="md">
//             <VStack spacing={4}>
//                 {chatHistory.map((chat, index) => (
//                     <Box key={index} borderWidth={1} borderRadius="md" p={2} width="100%">
//                         <Text><strong>You:</strong> {chat.user}</Text>
//                         <HStack>
//                             <Text><strong>Bot:</strong> {chat.bot}</Text>
//                         </HStack>
//                         <Button size="sm" onClick={() => speakResponse(chat.bot)} leftIcon={<FaVolumeUp />} colorScheme="blue">
//                             Speak
//                         </Button>
//                     </Box>
//                 ))}
//                 {isSpeaking && (
//                     <Box mb={4}>
//                         <Text><strong>Speaking:</strong> {speakingText}</Text>
//                         <Button onClick={stopSpeaking} leftIcon={<FaStop />} colorScheme="red" variant="solid">
//                             Stop
//                         </Button>
//                     </Box>
//                 )}

//                 {listening && (
//                     <Box className="chat-display" mb={4}>
//                         <Text><strong>You:</strong> {userMessage || transcript}</Text>
//                     </Box>
//                 )}

//                 {isGenerating && (
//                     <Box mb={4}>
//                         <Spinner size="sm" /> <Text>Generating response...</Text>
//                     </Box>
//                 )}

//                 <Button 
//                     onClick={handleListenToggle}
//                     leftIcon={listening ? <FaMicrophoneSlash /> : <FaMicrophone />}
//                     colorScheme="teal"
//                     variant="solid"
//                     position="absolute"
//                     bottom="20px"
//                     width="calc(100% - 32px)"
//                     left="16px"
//                 >
//                     {listening ? "Stop Listening" : "Start Listening"}
//                 </Button>
//             </VStack>
//         </Box>
//     );
// };

// export default Chatbot;
import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState, useEffect, useRef } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button, Box, Text, Spinner, VStack, HStack } from '@chakra-ui/react';
import { FaMicrophone, FaMicrophoneSlash, FaVolumeUp, FaStop } from 'react-icons/fa';

const Chatbot = () => {
    const [response, setResponse] = useState("");
    const [isGenerating, setIsGenerating] = useState(false);
    const [userMessage, setUserMessage] = useState("");
    const [chatHistory, setChatHistory] = useState([]); 
    const [speakingText, setSpeakingText] = useState("");
    const [isSpeaking, setIsSpeaking] = useState(false);

    const { transcript, resetTranscript, listening, browserSupportsSpeechRecognition } = useSpeechRecognition();
    const timeoutRef = useRef(null); 

    useEffect(() => {
        if (listening && transcript) {
            clearTimeout(timeoutRef.current);
        }

        if (!listening && transcript) {
            timeoutRef.current = setTimeout(() => {
                handleLLMResponse(transcript); 
            }, 1000); 
        }

        return () => clearTimeout(timeoutRef.current); 
    }, [transcript, listening]);

    const API_KEY = 'AIzaSyAbMZKfZSTYoNUR6FCb1NZXvJYYEuc7ruY';

    const responceai = async (input) => {
        setUserMessage("");
        try {
            const genAI = new GoogleGenerativeAI(API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
            const prompt = input;

            const result = await model.generateContent(prompt);
            const textResponse = await result.response.text();
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

    const handleListenToggle = () => {
        if (listening) {
            SpeechRecognition.stopListening();
            setUserMessage(transcript);
            clearTimeout(timeoutRef.current);
        } else {
            resetTranscript();
            SpeechRecognition.startListening({ continuous: true });
        }
    };

    if (!browserSupportsSpeechRecognition) {
        return <Text>Your browser does not support speech recognition.</Text>;
    }

    return (
        <>
        <Box className="chatbot-container" p={4} borderWidth={1} borderRadius="md" position="relative" minHeight="400px">
            <VStack spacing={4} mb="60px"> {/* Add bottom margin for space above button */}
                {chatHistory.map((chat, index) => (
                    <Box key={index} borderWidth={1} borderRadius="md" p={2} width="100%">
                        <Text><strong>You:</strong> {chat.user}</Text>
                        <HStack>
                            <Text><strong>Bot:</strong> {chat.bot}</Text>
                        </HStack>
                        <Button size="sm" onClick={() => speakResponse(chat.bot)} leftIcon={<FaVolumeUp />} colorScheme="blue">
                            Speak
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
                    <Box className="chat-display" mb={4}>
                        <Text><strong>You:</strong> {userMessage || transcript}</Text>
                    </Box>
                )}

                {isGenerating && (
                    <Box mb={4}>
                        <Spinner size="sm" /> <Text>Generating response...</Text>
                    </Box>
                )}
            </VStack>
            
        </Box>
        {/* Fixed position for the button */}
        <Box mt={8} >
        <Button 
        // border={"solid red"}
                onClick={handleListenToggle}
                leftIcon={listening ? <FaMicrophoneSlash /> : <FaMicrophone />}
                colorScheme="teal"
                variant="solid"
                position="fixed"  
                bottom="0px"
                width="calc(100% - 32px)"
                left="16px"
                zIndex="1000"             >
                {listening ? "Stop Listening" : "Start Listening"}
            </Button>
        </Box>
        </>
    );
};

export default Chatbot;
