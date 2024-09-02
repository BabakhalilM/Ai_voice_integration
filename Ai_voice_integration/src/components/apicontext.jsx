
import React, { createContext, useState } from "react";
export const Apicontext = createContext();

export const ApicontextProvider = ({ children }) => {
    const [name, setName] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const [topic, setTopic] = useState('');

    const handleSubmit = () => {
        if (name && selectedAvatar && topic) {
            onSubmit({ name, avatar: selectedAvatar, topic });
        } else {
            alert("Please fill out all fields.");
        }
    };

    return (
        <Apicontext.Provider value={{
            name,setName
            ,selectedAvatar,setSelectedAvatar
            ,topic,setTopic,
            handleSubmit
        }} >
            {children}
        </Apicontext.Provider>
    )
}