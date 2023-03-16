/**
 * Serves as the lower background of the application
 */


// import box from chakra
import {
    Box,
    useColorMode
} from "@chakra-ui/react";


// Bg component
const Bg = () => {

    // get the color mode
    const { colorMode } = useColorMode();

    return (
        <Box
            position="fixed"
            top="0"
            left="0"
            width="100%"
            height="100%"
            zIndex="-1"
            bg={colorMode === "light" ? "gray.200" : "gray.900"}
        />
    );
};


export default Bg;