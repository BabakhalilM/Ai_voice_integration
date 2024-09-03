
import React, { createContext, useState } from "react";
export const Apicontext = createContext();

export const ApicontextProvider = ({ children }) => {
    const [name, setName] = useState('');
    const [selectedAvatar, setSelectedAvatar] = useState('');
    const [topic, setTopic] = useState('');
    const avatars = {
        avatar1: 'https://bit.ly/dan-abramov',
        avatar2: 'https://bit.ly/tioluwani-kolawole',
        avatar3: 'https://bit.ly/kent-c-dodds',
        ryanFlorence: 'https://bit.ly/ryan-florence',
        prosperOtemuyiwa: 'https://bit.ly/prosper-baba',
        christianNwamba: 'https://bit.ly/code-beast',
        segunAdebayo: 'https://bit.ly/sage-adebayo',
    };

    return (
        <Apicontext.Provider value={{
            name,setName
            ,selectedAvatar,setSelectedAvatar
            ,topic,setTopic,
            avatars
        }} >
            {children}
        </Apicontext.Provider>
    )
}