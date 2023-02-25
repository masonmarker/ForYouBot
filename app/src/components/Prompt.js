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
const Prompt = ({messages, stateAddMessage}) => {

    // get color mode
    const { colorMode } = useColorMode()

    // handle enter press
    // should not execute if shift is also being held
    function handleEnterPress(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            document.getElementById("submit").click()
        }
    }

    // add message to messages
    function addMessage(date, from) {
        const prompt = document.getElementsByClassName("area")[0].value
      
        // if prompt exists, add it to messages
        if (prompt.length > 0) {
            console.log("adding message:", prompt)
            
            // add message to messages
            stateAddMessage([...messages, {
                date: date,
                from: from,
                message: prompt,
            }])

            // clear prompt
            document.getElementsByClassName("area")[0].value = ""

            // reset character limit
            document.getElementById("charlimit").innerHTML = "0/" + maxChars
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
                    addMessage(
                        new Date().toLocaleTimeString(), 
                        "user"
                    )
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