/**
 * Title component at the bottom of the screen.
 * if no conversation has been loaded, it will display
 * the most recent conversation initiated.
 * 
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */

// Chakra components
import {
    useColorMode,
    Text
} from "@chakra-ui/react"

// styled components
import styled from 'styled-components'

// common
import { colors } from '../common/common'


// styled Title
// centered horizontally
const TitleStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 10%;
    width: 100%;
    background-color: ${props => props.backgroundColor};
    border-radius: 1rem 1rem 0 0;
`

// Title component
const Title = () => {

    // grab current color mode
    const { colorMode } = useColorMode()

    return (
        <TitleStyled backgroundColor={colorMode === "light" ? colors.purple : colors.lightPurple}>
            <Text color="white">Conversation</Text>
        </TitleStyled>
    )
}

export default Title