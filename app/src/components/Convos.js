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
    Text
} from "@chakra-ui/react"








// Convos component
const Convos = ({conversations}) => {

    console.log(conversations)

    return (
        <Box>
            <Text>Conversations</Text>
            {conversations.map((convo, index) => {
                return (
                    <Text key={index}>{convo.user[0]}</Text>
                )
            })}
        </Box>
    )
}

export default Convos