/**
 * Creates a toast with the theme of the current app.
 *
 * author :
 *  Mason Marker
 */

// Chakra components
import { Button, HStack, Text, useColorMode } from "@chakra-ui/react";

// Chakra icons
import { CheckCircleIcon } from "@chakra-ui/icons";

// gets a themed toast for rendering with the toast hook
// within the individual function needing the toast rendered
const Toast = ({ app, text }) => {
  // color mode
  const { colorMode } = useColorMode();

  return (
    <Button
      color="white"
      p={3}
      colorScheme={app.settings.accent}
      borderRadius="md"
      cursor="default"
    >
      <HStack gap={1.2}>
        <CheckCircleIcon color={colorMode === "light" ? "white" : "black"}/>
        <Text 
            fontFamily={app.settings.font}
            color={colorMode === "light" ? "white" : "black"}
        >
          {text}
        </Text>
      </HStack>
    </Button>
  );
};

export default Toast;
