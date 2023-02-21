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
import {
    Box,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Text,
    HStack
} from "@chakra-ui/react"

// Chakra icons
import {
    InfoIcon,
    ChatIcon,
} from '@chakra-ui/icons'


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
            <Accordion allowToggle>

                <AccordionItem>
                    <AccordionButton>
                        <HStack>
                            <ChatIcon />
                            <Text>Conversations</Text>
                        </HStack>

                    </AccordionButton>
                </AccordionItem>

                <AccordionItem>
                    <AccordionButton>
                        <HStack>
                            <InfoIcon />
                            <Text>Narrow recent response</Text>
                        </HStack>
                    </AccordionButton>
                    <AccordionPanel pb={4}>
                        <Box>
                            <Text>
                                Narrow down the most recent response:
                                __RESPONSE__
                            </Text>
                        </Box>
                    </AccordionPanel>
                </AccordionItem>


            </Accordion>
        </InfoPanelStyled>
    )
}

export default InfoPanel