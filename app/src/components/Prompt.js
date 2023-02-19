/**
 * Input to the bot.
 * 
 * author :
 *  Mason Marker
 */


// Chakra components
import {
    Input,
    Text
} from "@chakra-ui/react"

// styled components
import styled from 'styled-components'

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

// max characters permitted in a single prompt
const maxChars = 2000

// Prompt component
const Prompt = () => {
    return (
        <PromptStyled>
            <Input colorScheme="purple"
                placeholder="Write a complex prompt..."
                className="inp"
                maxLength={maxChars}
                onChange={(e) => {
                    const len = e.target.value.length
                    document.getElementById("charlimit").innerHTML = len + `/${maxChars}`    
                    {len >= maxChars ? 
                        document.getElementById("charlimit").style.color = "maroon" : 
                        document.getElementById("charlimit").style.color = "black"
                    }
                }}
            />
            <Text 
            id="charlimit"
            className="limtext"
            >0/{maxChars}</Text>
        </PromptStyled>
    )
}


export default Prompt