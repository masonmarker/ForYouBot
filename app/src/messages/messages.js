/**
 * Logged messages.
 * 
 * authors : 
 *  Mason Marker
 *  Harris Chaudhry
 */


// React
import { useState } from 'react'

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
    return { 
        userMessages, 
        stateAddMessage, 
        stateAddBotMessage, 
        botMessages, 
        setUserMessages,
        setBotMessages
    }
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

// creates an empty conversation
// info field contains fields regarding 
// token information and expense information
// based on the functions in pricing.js
function emptyConversation(userMessages, botMessages) {
    return {
        name: 'New Conversation',
        wasRenamed: false,
        user: userMessages,
        bot: botMessages,

        // token usage / expenses so far
        info: {
            userTokens: 0,
            botTokens: 0,
            userExpenses: 0,
            botExpenses: 0,
        }
    }
}

export { useMessages, useConversation, emptyConversation };