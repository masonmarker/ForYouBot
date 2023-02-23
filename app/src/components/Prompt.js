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