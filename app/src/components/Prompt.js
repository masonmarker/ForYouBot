/**
 * Input to the bot.
 * 
 * author :
 *  Mason Marker
 */


// Chakra components
import {
    Button,
    Input,
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

    .limtext {
        position: fixed;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 80%;
        margin-bottom: 3rem;
    }
`

// Prompt component
const Prompt = () => {

    // get color mode
    const { colorMode } = useColorMode()

    return (
        <PromptStyled>
            <HStack className="inp">
                <Input colorScheme="purple"
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
                <Button id="submit">
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