/**
 * Information Panel:
 * 
 * Used for obtaining more detailed information on the most recent
 * response from OpenAI.
 * 
 * Can be expanded and retracted.
 *
 * Should contain components / options to narrow
 * down the information received.
 * 
 * authors : 
 *  Mason Marker
 *  Harris Chaudhry
 */


// Chakra components
// import {
//     useColorMode
// } from "@chakra-ui/react"

// styled components
import styled from 'styled-components'

// styled InfoPanel
// same length as prompt, placed at the top center of the
// screen
const InfoPanelStyled = styled.div`
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 85%;
    margin-top: 1rem;
    zindex: 1;
    

    /* below width 1000px, shorten width */
    @media (max-width: 950px) {
        width: 70%;
    }

    /* below width 486px, shorten width */
    @media (max-width: 486px) {
        width: 60%;
    }

`


// Information Panel
const InfoPanel = () => {

    

    return (
        <InfoPanelStyled>
           

        </InfoPanelStyled>
    )
}

export default InfoPanel