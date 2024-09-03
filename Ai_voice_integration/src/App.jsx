
import { useContext, useState } from 'react';
import Chatbot from './components/chatbot';
import UserForm from './components/Userform';
import { Avatar, Box, HStack, Text, VStack, Flex, Heading } from '@chakra-ui/react';
import { Apicontext } from './components/apicontext';

const App = () => {
    const [userDetails, setUserDetails] = useState(null);
    const { selectedAvatar, avatars } = useContext(Apicontext);
    
    const handleFormSubmit = (details) => {
        setUserDetails(details);
    };

    return (
        <Box p={4} minH="100vh" bg="gray.100">
            {!userDetails ? (
                <UserForm onSubmit={handleFormSubmit} />
            ) : (
                <Flex direction="column">
                    <Flex 
                        justify="space-between" 
                        align="center" 
                        bg="white" 
                        p={4} 
                        borderRadius="md" 
                        boxShadow="md" 
                        mb={4}
                        position="fixed"
                        top={0}
                        left={0}
                        right={0}
                        zIndex={10}
                    >
                        <Heading as="h1" size="lg">VocaVerse</Heading>
                        <HStack spacing={4}>
                            <Avatar
                                boxSize="50px"
                                src={avatars[selectedAvatar]}
                                alt="Avatar"
                            />
                            <VStack align="start" >
                                <Text fontSize="lg">Hello, {userDetails.name}!</Text>
                                <Text fontSize="md">Topic: {userDetails.topic}</Text>
                            </VStack>
                        </HStack>
                    </Flex>
                    <Box mt="100px">
                        <Chatbot />
                    </Box>
                </Flex>
            )}
        </Box>
    );
};

export default App;
