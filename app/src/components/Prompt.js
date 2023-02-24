/**
 * Input to the bot.
 * 
 * author :
 *  Mason Marker
 */

// React
import React, { useState, useEffect } from 'react'

// for updating messages
import { useMessages } from '../messages/messages'

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


// Prompt component
// should update messages array
// message props : date
//               : from
//               : message
//               : messageID
// when the enter key is pressed (without shift being held)
// or when the submit button is pressed should the request go through
const Prompt = () => {

    // get color mode
    const { colorMode } = useColorMode()

    // for updating messages
    const [messages, setMessages] = useMessages()

    // adds a message to the message board
    function addMessage(date, from, message) {

        // create a new message object
        const newMessage = {
            date: date,
            from: from,
            message: message,
            messageID: messages.length
        }

        // add the new message to the messages array
        setMessages((prevMessages) => [...prevMessages, newMessage])

        // clear the prompt
        document.getElementsByClassName("area")[0].value = ""
        document.getElementById("charlimit").innerHTML = `0/${maxChars}`
    }

    // handle enter press
    // should not execute if shift is also being held
    function handleEnterPress(e) {
        if (e.key === "Enter") {
            if (!e.shiftKey) {
                e.preventDefault()
                document.getElementById("submit").click()
            }
        }
    }

    return (
        <PromptStyled>
            <HStack className="inp">
                <Textarea colorScheme="purple"
                    className="area"
                    placeholder="Write a complex prompt..."
                    maxLength={maxChars}
                    onKeyPress={handleEnterPress}
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

                    // if prompt exists, add it to messages
                    if (prompt.length > 0) {

                        addMessage(new Date().toLocaleTimeString(), "user", prompt)
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