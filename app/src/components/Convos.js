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








// Convos component
const Convos = ({ conversations }) => {

    // conversations format:
    // conversations[0]['user'][0] = {date: from: message:}

    return (
        <Box>
            <Text>Conversations</Text>
            {conversations[0]['user'].length != 0 ? conversations.map((convo, index) => {
                return (
                    <Button key={index}>
                        <Text>{convo['user'][0]['from']}</Text>
                        <Text>{convo['user'][0]['message']}</Text>
                        <Text>{convo['user'][0]['date']}</Text>
                    </Button>
                )
            }) :
                <Text>No conversations</Text>
            }
        </Box>
    )
}

export default Convos