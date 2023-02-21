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
// top left corner
const ColorButtonStyled = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    margin: 1rem;
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