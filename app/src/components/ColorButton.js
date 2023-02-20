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





// ColorButton component
const ColorButton = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    return (
        <Button onClick={toggleColorMode}>
            Toggle {colorMode === "light" ? "Dark" : "Light"}
        </Button>
    )
}

export default ColorButton