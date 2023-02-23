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

// import all messages
import messages from '../messages/messages'

// Adds a message to the ChatPanel
export default function addMessage(date, from, message) {

    // add message to messages
    messages.push({
        date: date,
        from: from,
        message: message
    })

    // update element with id "chat"
    // using innerHTML does not work
    // because it does not re-render the component
    // so we use the forceUpdate() method
    // to re-render the component
    document.getElementById("chat").forceUpdate()
}