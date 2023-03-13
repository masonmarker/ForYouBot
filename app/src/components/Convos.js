/**
 * Conversations panel, grants the ability to switch between conversations
 *
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */

// React
import React, { useState, useRef } from "react";

// Chakra components
import {
  Box,
  Button,
  Divider,
  HStack,
  VStack,
  Text,
  ScaleFade,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

// Check icon
import { CheckIcon } from "@chakra-ui/icons";

// styled components
import styled from "styled-components";

// intersection observer
import { useInView } from "react-intersection-observer";

// individual conversation styled
const ConvoStyled = styled(VStack)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 10%;
  background-color: ${(props) => props.backgroundColor};
  color: ${(props) => props.color};
  border: 1px solid ${(props) => props.color};
  border-radius: 5px;
  margin: 5px 0;
  padding: 5px;

  .title {
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0.5rem;
  }
`;

// Convos component
const Convos = ({ app }) => {
  // are you sure state (conversation removal)
  const [areYouSure, setAreYouSure] = useState(false);

  // renaming index state
  const [renameIndex, setRenameIndex] = useState(null);

  //modal state use disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  // states for displaying more of each individual conversation
  const [moreConversation, setMoreConversation] = useState(-1);

  // input value state
  const [inputValue, setInputValue] = useState(""); // input value state

  // enter button reference
  const enterButtonRef = useRef(); // button ref

  // rename input reference
  const renameInput = useRef(null);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      enterButtonRef.current.click();
    }
  }

  // conversations format:
  // conversations[0].user[0] = {date: from: message:}

  return (
    <Box>
      {app.conversations[0] ? (
        app.conversations?.map((convo, index) => (
          <ScaleFade in={1} key={`convo-${index}`}>
            <ConvoStyled key={`convo-${index}`}>
              <Text className="title">{convo.name}</Text>
              {index === 0 && (
                <Button
                  colorScheme={app.settings.accent}
                  size="xs"
                  cursor="default"
                >
                  Currently Open
                </Button>
              )}
              <HStack>
                {/* Sets this conversation to the current conversation */}
                <Button
                  onClick={() => {
                    // switch the current conversation to the selected conversation
                    const currentConversation = app.conversations[0];
                    const newConversations = app.conversations;
                    newConversations[0] = convo;
                    newConversations[index] = currentConversation;
                    app.setConversations(newConversations);
                    app.setUserMessages(convo.user);
                    app.setBotMessages(convo.bot);

                    // close the model
                    // onClose1()
                  }}
                >
                  Open
                </Button>

                {/* Rename this conversation */}
                <Button onClick={(e) => {}}> Rename</Button>

                {/* Preview this conversation */}
                <Button>Preview</Button>

                {/* Viewing information for the current conversation */}
                <Button
                  onClick={() => {
                    setMoreConversation(
                      moreConversation === index ? -1 : index
                    );
                  }}
                >
                  {moreConversation === index ? "Close" : "More"}
                </Button>

                {/* Remove the conversation */}
                {app.conversations?.length > 1 && (
                  <Button
                    onClick={() => {
                      // remove the conversation from the conversations array
                      const newConversations = app.conversations;
                      newConversations.splice(index, 1);
                      app.setConversations(newConversations);

                      // reset the current conversation to the user's messages
                      app.setUserMessages(newConversations[0].user);
                      app.setBotMessages(newConversations[0].bot);
                    }}
                  >
                    Remove
                  </Button>
                )}
              </HStack>


              {/* displaying more about the conversation requested */}
              {moreConversation === index && (
                <ScaleFade in={1}>
                  <VStack>
                    <Divider />
                    <Text>
                      User Tokens:{" "}
                      {app.conversations[moreConversation].info.userTokens}
                    </Text>
                    <Text>
                      User Expenses: $
                      {app.conversations[moreConversation].info.userExpenses}
                    </Text>
                    <Divider />
                    <Text>
                      Bot Tokens:{" "}
                      {app.conversations[moreConversation].info.botTokens}
                    </Text>
                    <Text>
                      Bot Expenses: $
                      {app.conversations[moreConversation].info.botExpenses}
                    </Text>
                    <Divider />
                  </VStack>
                </ScaleFade>
              )}
            </ConvoStyled>
          </ScaleFade>
        ))
      ) : (
        <Text>No conversations</Text>
      )}
    </Box>
  );
};

// modal for displaying more information about a conversation
const MoreModal = ({ isMoreOpen, onMoreClose, conversation, app }) => {
  return (
    <Modal isOpen={isMoreOpen} onClose={onMoreClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{conversation.name}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>{JSON.stringify(conversation.info)}</Text>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme={app.settings.accent}
            mr={3}
            onClick={onMoreClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Convos;
