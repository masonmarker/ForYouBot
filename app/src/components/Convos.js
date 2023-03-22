/**
 * Conversations panel, grants the ability to switch between conversations
 *
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */

// React
import React, { useState, useRef } from "react";

// ask() for asking the current model
import { ask, getUserChatLog } from "./Prompt";

// Message component
import Message from "./Message";

// Toast
import Toast from "./Toast";

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
  useToast,
} from "@chakra-ui/react";

// Check icon
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";

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

  .prev-message {
    border: 1px solid black;
    padding: 0.5rem;
    border-radius: 5px;
  }
`;

// Convos component
const Convos = ({ app, onClose1 }) => {
  // are you sure state (conversation removal)
  const [areYouSure, setAreYouSure] = useState(false);

  // renaming index state
  const [renameIndex, setRenameIndex] = useState(null);

  //modal state use disclosure
  const { isOpen, onClose } = useDisclosure();

  // states for displaying more of each individual conversation
  const [moreConversation, setMoreConversation] = useState(-1);

  // input value state
  const [inputValue, setInputValue] = useState(""); // input value state

  // enter button reference
  const enterButtonRef = useRef(); // button ref

  // rename input reference
  const renameRef = useRef(null);

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      enterButtonRef.current.click();
    }
  }

  // removeAreYouSure useDisclosure modal
  //const { isOpen: onOpenRemoveAreYouSure, onClose: onCloseRemoveAreYouSure } = useDisclosure();

  // Chakra toast
  const toast = useToast();

  // handle renaming a conversation
  function handleRename(e) {
    // set the name of the conversation to the input value
    const newConversations = app.conversations;
    newConversations[renameIndex].name = renameRef.current.value;
    app.setConversations(newConversations);
    setRenameIndex(-1);
  }

  // removes a conversation
  function handleRemove(index, convo) {
    // remove the conversation from the conversations array
    const newConversations = app.conversations;
    newConversations.splice(index, 1);

    // reset the current conversation to the user's messages
    app.setUserMessages(app.conversations[0].user);
    app.setBotMessages(app.conversations[0].bot);
    app.setConversations(newConversations);

    onClose1();
  }

  // state for a removing conversations index
  const [removeIndex, setRemoveIndex] = useState(-1);

  // state for previewing a conversation
  const [previewIndex, setPreviewIndex] = useState(-1);

  // conversations format:
  // conversations[0].user[0] = {date: from: message:}

  return (
    <Box>
      {app.conversations[0] ? (
        app.conversations?.map((convo, index) => (
          <ScaleFade in={1} key={`convo-${index}`}>
            <ConvoStyled key={`convo-${index}`}>
              <HStack>
                <Button colorScheme={app.settings.accent} size="xs" cursor="default">{index + 1}</Button>
                <Text className="title">{convo.name}</Text>

              </HStack>
              {index === 0 && (
                <Button
                  colorScheme={app.settings.accent}
                  size="xs"
                  cursor="default"
                >
                  Currently Open
                </Button>
              )}
              <HStack fontFamily={app.settings.font}>
                {/* Sets this conversation to the current conversation */}
                <Button
                  onClick={() => {
                    // switch the current conversation to the selected conversation
                    app.setUserMessages(app.conversations[index].user);
                    app.setBotMessages(app.conversations[index].bot);

                    var conversationsCopy = app.conversations;

                    // move the selected conversation to the top of the array
                    conversationsCopy.splice(index, 1);
                    conversationsCopy.unshift(convo);

                    // set the conversations array to the new array
                    app.setConversations(conversationsCopy);

                    // close the model
                    onClose1();

                    // shorten text
                    const title = app.shortenText("Opened conversation: ", app.conversations[0].name, 20);

                    // show toast that we opened the conversation
                    // with this name
                    if (index !== 0) {
                      app.showToast(title, 2000)
                    }
                  }}
                >
                  Open
                </Button>

                {/* Rename this conversation */}
                <Button
                  onClick={() => {
                    // set the rename index to this conversation
                    setRenameIndex(renameIndex === index ? -1 : index);
                  }}
                >
                  {renameIndex === index ? "Cancel" : "Rename"}
                </Button>

                {/* Preview this conversation */}
                <Button
                  onClick={() => {
                    // set the preview index to this conversation
                    setPreviewIndex(previewIndex === index ? -1 : index);
                  }}

                >{previewIndex === index ? "Close" : "Preview"}</Button>

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
                      // set remove index
                      setRemoveIndex(renameIndex === index ? -1 : index);
                    }}
                  >
                    Remove
                  </Button>

                  // <Modal isOpen={onOpenRemoveAreYouSure} onClose={onCloseRemoveAreYouSure}>

                  // </Modal>
                )}
              </HStack>

              {/* Render are you sure boxes */}
              {removeIndex === index && (
                <ScaleFade in={1}>
                  <HStack>
                    <Button
                      onClick={() => {

                        // remove the conversation
                        handleRemove(index, convo);

                        // shortened text
                        const title = app.shortenText("Removed conversation: ", convo.name, 20);

                        // show toast
                        app.showToast(title, 2000)
                      }}
                    >
                      <CheckIcon />
                    </Button>
                    <Button
                      onClick={() => {
                        setRemoveIndex(-1);
                      }}
                    >
                      <CloseIcon />
                    </Button>
                  </HStack>
                </ScaleFade>
              )}

              {/* Render renaming components for this conversation only
                            if areYouSure */}
              {renameIndex === index && (
                <ScaleFade in={1}>
                  <HStack>
                    <Input
                      ref={renameRef}
                      defaultValue={app.conversations[renameIndex].name}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleRename();
                        }
                      }}
                    />
                    <Button onClick={handleRename}>
                      <CheckIcon />
                    </Button>
                  </HStack>
                </ScaleFade>
              )}
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
                      {app.conversations[
                        moreConversation
                      ].info.userExpenses.toFixed(6)}
                    </Text>
                    <Divider />
                    <Text>
                      Bot Tokens:{" "}
                      {app.conversations[moreConversation].info.botTokens}
                    </Text>
                    <Text>
                      Bot Expenses: $
                      {app.conversations[
                        moreConversation
                      ].info.botExpenses.toFixed(6)}
                    </Text>
                    <Divider />
                    <Text>
                      Total Tokens:{" "}
                      {app.conversations[moreConversation].info.userTokens +
                        app.conversations[moreConversation].info.botTokens}
                    </Text>
                    <Text>
                      Total Expenses: $
                      {(
                        app.conversations[moreConversation].info.userExpenses +
                        app.conversations[moreConversation].info.botExpenses
                      ).toFixed(6)}
                    </Text>
                    <Divider />
                  </VStack>
                </ScaleFade>
              )}
              {/* Preview of 
               conversation */}
              {previewIndex === index && (
                <ScaleFade in={1}>
                  <HStack>
                    {app.conversations[previewIndex].bot.map((botMessage, i) => {
                      return (
                        <Box
                          key={`preview-${i}`}
                        >
                          <HStack className="prev-message">
                            {app.settings.icons.userIcon}
                            <Text>{app.conversations[previewIndex].user[i].message}</Text>
                          </HStack>
                          <HStack className="prev-message">
                            {app.settings.icons.botIcon}
                            <Text>{botMessage.message}</Text>
                          </HStack>
                        </Box>
                      );
                    })}
                  </HStack>
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

export default Convos;
