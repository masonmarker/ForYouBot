/**
 * Conversations panel, grants the ability to switch between conversations
 * 
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */

// Chakra components
import {
    Box,
    Button,
    Text
} from "@chakra-ui/react"

// styled components
import styled from 'styled-components'

// individual conversation styled
const ConvoStyled = styled.div`

`




// Convos component
const Convos = ({ conversations }) => {

    // conversations format:
    // conversations[0].user[0] = {date: from: message:}

    return (
        <Box>
            <Text>Conversations</Text>
            {conversations[0]['user'].length !== 0 ? conversations.map((convo, index) => {
                return (
                    <Box key={`convo-${index}`}>
                        <Text>{conversations[0].name}</Text>
                        <Text>{convo.user[0].message}</Text>
                    </Box>

                )
            }) :
                <Text>No conversations</Text>
            }
        </Box>
    )
}

export default Convos