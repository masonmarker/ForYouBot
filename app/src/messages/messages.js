/**
 * Logged messages.
 * 
 * authors : 
 *  Mason Marker
 *  Harris Chaudhry
 */


// React
import { useState, useEffect } from 'react'

const initMessages = []

const initBotMessages = []

// useMessages hook for altering the messages array
function useMessages() {
    // state for messages
    const [userMessages, setUserMessages] = useState(initMessages)
    const [botMessages, setBotMessages] = useState(initBotMessages)

    // add message to messages
    const stateAddMessage = (newMessage) => {
        setUserMessages([...userMessages, newMessage])
    }

    // add bot message to messages
    const stateAddBotMessage = (newMessage) => {
        setBotMessages([...botMessages, newMessage])
    }
    // const stateAddSingle = (newMessage) => {
    //     setUserMessage([...userMessage, newMessage])
    // }

    // return
    return { userMessages, stateAddMessage, stateAddBotMessage, botMessages }
}

export { useMessages };