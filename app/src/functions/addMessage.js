/**
 * Adds a message to the ChatPanel.
 * 
 * author : 
 *  Mason Marker
 *  Harris Chaudhry
 */

// React
import React from 'react'

// components
import Message from '../components/Message'



// Adds a message to the ChatPanel
export default function addMessage(message) {
    
    // create a new message
    const newMessage = <Message date={message.date} from={message.from} message={message.message} />

    // add the message to the chat
    document.getElementById("chat").appendChild(newMessage)
}