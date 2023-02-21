/**
 * Color theme altering button.
 * 
 * author :
 *  Mason Marker
 */


// Chakra components
import {
    Button,
    useColorMode
} from "@chakra-ui/react"

// sun and moon icons
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

// styled components
import styled from 'styled-components'

// styled ColorButton
// bottom right corner
const ColorButtonStyled = styled.div`
    position: fixed;
    bottom: 0;
    right: 0;
    margin: 1rem;
    margin-right: 13.2rem;
    
`

// ColorButton component
const ColorButton = () => {

    // accessing current color mode
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <ColorButtonStyled>
            <Button colorScheme="purple" onClick={toggleColorMode} >
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
        </ColorButtonStyled>
    )
}

export default ColorButton