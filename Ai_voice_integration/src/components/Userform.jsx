import React, { useContext } from 'react';
import { Button, VStack, Input, Avatar, Stack } from '@chakra-ui/react';
import { Apicontext } from './apicontext';

const UserForm = ({ onSubmit }) => {
    const { name, setName, selectedAvatar, setSelectedAvatar, topic, setTopic, avatars } = useContext(Apicontext);

    const handleSubmit = () => {
        if (name && selectedAvatar && topic) {
            onSubmit({ name, avatar: selectedAvatar, topic });
        } else {
            alert("Please fill out all fields.");
        }
    };
    return (
        <VStack spacing={4} p={4} borderWidth={1} borderRadius="md">
            <Input
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Stack direction="row" spacing={4}>
                {Object.keys(avatars).map((key) => (
                    <Avatar
                        key={key}
                        name={key}
                        src={avatars[key]}
                        cursor="pointer"
                        border={selectedAvatar === key ? "3px solid green" : "none"}
                        onClick={() => setSelectedAvatar(key)}
                    />
                ))}
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
