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
    const stateAddMessage = (newMessage) => {
        setMessages([...messages, newMessage])
    }

    // return
    return { messages, stateAddMessage }
}

export { useMessages };