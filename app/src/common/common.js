/**
 * Common styling information.
 * 
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */


// colors
export const colors = {
    gray: "gray.300",
    lightGray: "#E2E8F0",
    darkGray: "#171923",
    purple: "#805AD5",
    lightPurple: "#9f7aea",
    lighterPurple: "#d6bcfa",
    panelColor: (colorMode) => {
        return colorMode === "light" ? "gray.100" : "gray.800"
    }
}

// Chakra default font
const chakra = `-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"`

// fonts
export const fonts = {
    main: chakra,
    message: "monospace",
    all: [
        chakra,
        "Arial, sans-serif",
        "san serif",
        "serif",
        "monospace",
        "cursive",
        "fantasy",
    ]
}

export const css = {
    "transition": "0.17s ease-out"
}


