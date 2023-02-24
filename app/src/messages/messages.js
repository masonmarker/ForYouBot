/**
 * Logged messages.
 * 
 * authors : 
 *  Mason Marker
 *  Harris Chaudhry
 */


// React
import { useState, useEffect } from 'react'

// useMessages hook for altering the messages array
function useMessages() {
    // state for messages
    const [messages, setMessages] = useState([
        {
            date: "2021-05-01T00:00:00.000Z",
            from: "user",
            message: "Hello World"
        },
        {
            date: "2021-05-01T00:00:00.000Z",
            from: "bot",
            message: "Hello! This is a response from the bot!"
        }
    ]);

    // function for adding a new message to the messages array
    const addMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    // return the state and the function for adding messages
    return [messages, addMessage];
}

export { useMessages };