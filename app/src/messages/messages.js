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
    const [userMessages, setUserMessages] = useState([])
    const [botMessages, setBotMessages] = useState([])

    // add message to messages
    const stateAddMessage = (newMessage) => {
        setUserMessages([...userMessages, newMessage])
    }

    // add bot message to messages
    const stateAddBotMessage = (newMessage) => {
        setBotMessages([...botMessages, newMessage])
    }

    // return
    return { userMessages, stateAddMessage, stateAddBotMessage, botMessages }
}

// useConversation hook
// current conversation is at index 0
function useConversation(initial) {

    // state for messages
    const [conversations, setConversations] = useState(initial)

    // add message to messages
    const stateAddConversation = (newConversation) => {
        setConversations([...conversations, newConversation])
    }

    // return
    return { 
        conversations, 
        stateAddConversation, 
        setConversations
    }
}

export { useMessages, useConversation };