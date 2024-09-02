import { useState } from 'react';
import Chatbot from './components/chatbot';
import UserForm from './components/Userform';
import { Box, HStack, VStack } from '@chakra-ui/react';

const App = () => {
    const [userDetails, setUserDetails] = useState(null);

    const handleFormSubmit = (details) => {
        setUserDetails(details);
    };

    return (
        <Box p={4}>
            {!userDetails ? (
                <UserForm onSubmit={handleFormSubmit} />
            ) : (
                <>
                    <HStack spacing={4} mb={4}>
                        <Avatar
                            boxSize="50px"
                            src={`https://bit.ly/dan-abramov`} // Example URL for the avatar
                            alt="Avatar"
                        />
                        <VStack align="start">
                            <Text fontSize="lg">Hello, {userDetails.name}!</Text>
                            <Text fontSize="md">You are interested in: {userDetails.topic}</Text>
                        </VStack>
                    </HStack>
                    <Chatbot />
                </>
            )}
        </Box>
    );
};

export default App;
