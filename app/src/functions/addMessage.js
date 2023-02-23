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
export default function addMessage(date, from, message) {
    
    // print the chat panel
    document.getElementById("chat").appendChild(
        <Message date={date} from={from} message={message} />
    )
    

}