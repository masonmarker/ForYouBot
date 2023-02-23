/**
 * Input to the bot.
 * 
 * author :
 *  Mason Marker
 */

// functions
import addMessage from '../functions/addMessage'

// Chakra components
import {
    Button,
    Textarea,
    Text,
    HStack,
    useColorMode
} from "@chakra-ui/react"

// Chakra icons
import { ArrowForwardIcon } from '@chakra-ui/icons'

// styled components
import styled from 'styled-components'

// max characters permitted in a single prompt
const maxChars = 2000

// styled Prompt
const PromptStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
         
    .limtext {
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        margin-bottom: 3rem;
    }

    .area {
        z-index: 2;
        height: 15vh;
    }

`

// ChatPanel component:
/**
 * ChatPanel: Displays the chat history of the current thread.
 * 
 * authors : 
 *  Mason Marker
 *  Harris Chaudhry
 */

// // components
// import Title from './Title'
// import Message from './Message'

// // Chakra components
// import {
//     useColorMode,
//     Text,
//     Box
// } from "@chakra-ui/react"

// // styled components
// import styled from 'styled-components'

// // common 
// import { colors } from '../common/common'

// // importing all messages
// import messages from '../messages/messages'

// // styled ChatPanel
// // should exist in the center of the screen
// // vertically and horizontally
// // include all props
// const ChatPanelStyled = styled.div`
//     width: 100vw;
//     height: 72vh;
//     background-color: ${props => props.backgroundColor};

//     .chat {
//         height: 90%;
//         width: 100%;
//         overflow-y: scroll;
//     }
// `

// // ChatPanel component
// // should re-render each time a message is pushed to messages
// const ChatPanel = () => {

//     // grab current color mode
//     const { colorMode } = useColorMode()

//     // current time
//     const now = new Date().toLocaleTimeString()

//     // add message to messages
//     const addMessage = (message) => {
//         messages.push({
//             date: now,
//             from: "user",
//             message: message
//         })
//     }

//     return (
//         <ChatPanelStyled backgroundColor={colorMode === "light" ? colors.lightGray : colors.darkGray}>
//             <Title />

//             {/* Chat History */}
//             <Box className="chat">
//                 <div id="chat">
//                     {messages.map((message, i) => {
//                         return (
//                             <Message
//                                 key={i}
//                                 date={message.date}
//                                 from={message.from}
//                                 message={message.message}
//                             />
//                         )
//                     })}
//                 </div>
//             </Box>


//         </ChatPanelStyled>
//     )
// }

// export default ChatPanel





// Prompt component
const Prompt = () => {

    // get color mode
    const { colorMode } = useColorMode()

    

    return (
        <PromptStyled>
            <HStack className="inp">
                <Textarea colorScheme="purple"
                    className="area"
                    placeholder="Write a complex prompt..."
                    maxLength={maxChars}
                    onChange={(e) => {
                        const len = e.target.value.length
                        document.getElementById("charlimit").innerHTML = len + `/${maxChars}`
                        {

                            // character limit component
                            const comp = document.getElementById("charlimit")

                            if (len >= maxChars) {
                                comp.style.color = "red"
                            }
                            // if the color is red and the length is less than the max
                            else if (comp.style.color === "red") {
                                comp.style.color = colorMode === "light" ? "black" : "white"
                            }
                        }
                    }}
                />
                <Button id="submit" onClick={() => {
                    const prompt = document.getElementsByClassName("area")[0].value
                    if (prompt.length > 0) {
                        addMessage(new Date().toLocaleTimeString(), "user", prompt)
                        document.getElementsByClassName("area")[0].value = ""
                        document.getElementById("charlimit").innerHTML = "0/" + maxChars
                    }
                }}>

                    <ArrowForwardIcon />
                </Button>
            </HStack>

            <Text
                color={colorMode === "light" ? "black" : "white"}
                id="charlimit"
                className="limtext"
            >0/{maxChars}</Text>
        </PromptStyled>
    )
}


export default Prompt