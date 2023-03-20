/**
 * ChatPanel: Displays the chat history of the current thread.
 *
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */

// React
import React, { useEffect, useRef } from "react";

// components
import Title from "./Title";
import Message from "./Message";

// Chakra components
import {
  useColorMode,
  Box,
  Spinner,
  Fade,
  Text,
  VStack,
  HStack,
  ScaleFade,

  // grid components
  Grid,
  GridItem,
} from "@chakra-ui/react";

// Chakra icons
import { ViewIcon, SettingsIcon, PlusSquareIcon } from "@chakra-ui/icons";

// styled components
import styled from "styled-components";

// common
import { colors } from "../common/common";

// styled ChatPanel
// should exist in the center of the screen
// vertically and horizontally
// include all props
const ChatPanelStyled = styled.div`
  width: 100vw;
  height: 72vh;
  background-color: ${(props) => props.backgroundColor};

  .chat {
    height: 90%;
    width: 100%;
    overflow-y: scroll;
  }

  .init-title {
    font-size: 4rem;
    font-weight: 600;
    margin-top: 3rem;
  }

  .item {
    border: 3px solid ${(props) => props.borderColor};
    background-color: ${(props) => props.backgroundColor};
    border-radius: 10px;
    padding: 1rem;
    font-size: 1rem;
  }

  .grid {
  }

  /* when width of screen is below 887 pixels,
        make template columns 1 and rows 3*/
  @media (max-width: 887px) {
    .grid {
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    }
    .init-title {
      margin-top: 0;
      font-size: 2rem;
    }
    .item {
      font-size: 0.8rem;
      padding: 0.5rem;
    }
  }
`;

// ChatPanel component
// should re-render each time a message is pushed to messages
const ChatPanel = ({ app }) => {
  // grab current color mode
  const { colorMode } = useColorMode();

  // ref for scrolling to bottom
  const bottomRef = useRef();

  // scroll to bottom
  useEffect(() => {
    bottomRef.current.scrollIntoView();
  }, [app.userMessages, app.botMessages, app.waiting]);

  // return,
  return (
    <ChatPanelStyled
      backgroundColor={
        colorMode === "light" ? colors.lightGray : colors.darkGray
      }
    >

      {/* Chat History */}

      {app.userMessages.length > 0 ? (
        <Box className="chat">
          <div id="chat">
            {app.userMessages.map((message, index) => {
              return (
                <div key={`chat-div-${index}`}>
                  <Message
                    messageIndex={index}
                    app={app}
                    key={`user-${index}`}
                    message={message.message}
                    from={message.from}
                    date={message.date}
                  />
                  {app.botMessages[index] && (
                    <Message
                      messageIndex={index}
                      app={app}
                      key={`bot-${index}`}
                      message={app.botMessages[index].message}
                      from="bot"
                      date={app.botMessages[index].date}
                    />
                  )}
                </div>
              );
            })}
            {app.waiting && (
              <ScaleFade in={app.waiting}>
                <HStack ml={75} mt={5} mb={5} gap={6}>
                  <Spinner thickness="4px" colorScheme={app.settings.accent} />
                </HStack>
              </ScaleFade>
            )}
            <div ref={bottomRef} />
          </div>
        </Box>
      ) : (
        <ScaleFade in={1}>
          <VStack ref={bottomRef}>
            <Text className="init-title">ForYouBot</Text>

            {/* Welcome message, 3 columns and 1 row */}
            <Grid
              className="grid"
              templateColumns="repeat(3, 1fr)"
              templateRows="repeat(1, 1fr)"
              gap={4}
              width="70%"
            >
              <GridItem colSpan={1} className="item">
                <VStack>
                  <ViewIcon boxSize="2rem" />
                  <Text>Welcome to ____</Text>
                </VStack>
              </GridItem>
              <GridItem colSpan={1} className="item">
                <VStack>
                  <SettingsIcon boxSize="2rem" />
                  <Text>
                    ____ is a highly customizable, creative chat bot for
                    everyday tasks.
                  </Text>
                </VStack>
              </GridItem>
              <GridItem colSpan={1} className="item">
                <VStack>
                  <PlusSquareIcon boxSize="2rem" />
                  <Text>
                    To get started, select a conversation from the title above
                    or ask a question in the text area below.
                  </Text>
                </VStack>
              </GridItem>
            </Grid>
          </VStack>
        </ScaleFade>
      )}
    </ChatPanelStyled>
  );
};

export default ChatPanel;
