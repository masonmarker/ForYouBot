/**
 * Adds a message to the ChatPanel.
 * 
 * author : 
 *  Mason Marker
 *  Harris Chaudhry
 */

// components
import Message from '../components/Message'




export default function addMessage(message) {
    // get current date
    const date = new Date().toLocaleTimeString()

    // create new message
    const newMessage = <Message date={date} from="user" message={message} />

    console.log(document.getElementById("chat"))

    // add message to chat
    document.getElementById("chat").appendChild(newMessage)
}