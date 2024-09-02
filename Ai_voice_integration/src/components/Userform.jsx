import React, { useContext, useState } from 'react';
import {
    Button, Box, Text, VStack, HStack, Input, Avatar, Stack, Image
} from '@chakra-ui/react';
import { Apicontext } from './apicontext';

const UserForm = ({ onSubmit }) => {
    const { name,setName
        ,selectedAvatar,setSelectedAvatar
        ,topic,setTopic,
        handleSubmit} =useContext(Apicontext);

    return (
        <VStack spacing={4} p={4} borderWidth={1} borderRadius="md">
            <Text fontSize="xl">Enter your details</Text>
            <Input
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <Text>Select an avatar</Text>
            <Stack direction="row" spacing={4}>
                <Avatar
                    name="Avatar 1"
                    src="https://bit.ly/dan-abramov"
                    cursor="pointer"
                    border={selectedAvatar === 'avatar1' ? "2px solid teal" : "none"}
                    onClick={() => setSelectedAvatar('avatar1')}
                />
                <Avatar
                    name="Avatar 2"
                    src="https://bit.ly/tioluwani-kolawole"
                    cursor="pointer"
                    border={selectedAvatar === 'avatar2' ? "2px solid teal" : "none"}
                    onClick={() => setSelectedAvatar('avatar2')}
                />
                <Avatar
                    name="Avatar 3"
                    src="https://bit.ly/kent-c-dodds"
                    cursor="pointer"
                    border={selectedAvatar === 'avatar3' ? "2px solid teal" : "none"}
                    onClick={() => setSelectedAvatar('avatar3')}
                />
            </Stack>

            <Input
                placeholder="Enter the topic you're interested in"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
            />
            <Button colorScheme="teal" onClick={handleSubmit}>
                Start Chatting
            </Button>
        </VStack>
    );
};

export default UserForm;