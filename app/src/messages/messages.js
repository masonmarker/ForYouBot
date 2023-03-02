/**
 * Logged messages.
 * 
 * authors : 
 *  Mason Marker
 *  Harris Chaudhry
 */


// React
import { useState, useEffect } from 'react'

const initMessages = [
    {
        date: new Date().toLocaleString(),
        from: "user",
        message: "hello!"
    },
    {
        date: new Date().toLocaleString(),
        from: "bot",
        message: "hello from bot!"
    },
]

// useMessages hook for altering the messages array
function useMessages() {
    // state for messages
    const [messages, setMessages] = useState(initMessages)

    // add message to messages
    const stateAddMessage = (newMessage, botMessage) => {
        const message_copy = [...messages]

        // remove last element
        message_copy.pop()

        // add new message
        message_copy.push(newMessage)

        setMessages([...messages, newMessage, botMessage])
    }

    const stateAddSingle = (newMessage) => {
        setMessages([...messages, newMessage])
    }

    // return
    return { messages, stateAddMessage, stateAddSingle }
}

export { useMessages };