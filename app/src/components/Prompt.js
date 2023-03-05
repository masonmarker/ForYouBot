/**
 * Input to the bot.
 *
 * author :
 *  Mason Marker
 */

// React
import React, { useState } from "react";


// Chakra components
import {
  Button,
  Textarea,
  Text,
  HStack,
  Spinner,
  Checkbox,
  useColorMode
} from "@chakra-ui/react";

// Chakra icons
import { ArrowForwardIcon } from "@chakra-ui/icons";

// styled components
import styled from "styled-components";

// max characters permitted in a single prompt
const maxChars = 2000;

// styled Prompt
const PromptStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;

  .limtext {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    margin-bottom: 3rem;
  }

  .area {
    z-index: 2;
    height: 15vh;
  }
`;


async function ask(chatLog) {
  return await fetch("http://localhost:5000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: chatLog,
      max_tokens: 100,
      temperature: 0.7
    })
  }).then(response => response.json()).then(data => data.data.trim())
}


// gets a string representation of the user's chat log
function getUserChatLog(userMessages, prompt) {
  const sep = "\n--next--\n"
  var chatLog = ""
  for (let i = 0; i < userMessages.length; i++) {
    chatLog += userMessages[i].message + sep
  }
  chatLog += prompt + sep
  console.log(chatLog)
  return chatLog
}

// Prompt component
// should update messages array
// message props : date
//               : from
//               : message
//               : messageID
// when the enter key is pressed (without shift being held)
// or when the submit button is pressed should the request go through
const Prompt = ({
  userMessages,
  botMessages,
  stateAddMessage,
  stateAddBotMessage,
  conversations,
  setConversations,
  generating,
  setGenerating,
  waiting,
  setWaiting
}) => {

  // get color mode
  const { colorMode } = useColorMode();

  // is testing
  const [testing, setTesting] = useState(true);

  // handle enter press
  // should not execute if shift is also being held
  function handleEnterPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      document.getElementById("submit").click();
    }
  }

  // wait 1 second then return the bot's response
  async function testBotResponse() {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // return a large bot response to test scrolling
    return "This is a test bot response."
  }

  // tests a bot's response
  async function testResponse() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return "This is a test response."
  }
  // add message to messages
  async function addMessage(date, from, prompt) {

    // if prompt exists, add it to messages
    if (prompt.length > 0) {

      // add message to messages
      await stateAddMessage(
        {
          date: date,
          from: from,
          message: prompt,
        },
      );
      // area
      const area = document.getElementsByClassName("area")[0];

      // clear prompt
      area.value = "";

      // reset character limit
      document.getElementById("charlimit").innerHTML = "0/" + maxChars;

      // reset character limit color
      document.getElementById("charlimit").style.color =
        colorMode === "light" ? "black" : "white";

      // disable prompt
      area.disabled = true;

      // disable submit button
      document.getElementById("submit").disabled = true;

      // set waiting to true
      setWaiting(true);

      // get chat log
      const chatLog = getUserChatLog(userMessages, prompt)

      // add bot response to messages
      await stateAddBotMessage(
        {
          date: new Date().toLocaleTimeString(),
          from: "bot",
          message: testing ?
            await testBotResponse()
            :
            await ask(chatLog),
        }
      )

      // set waiting to false
      setWaiting(false);

      // enable prompt
      document.getElementsByClassName("area")[0].disabled = false;

      // enable submit button
      document.getElementById("submit").disabled = false;

      // check if the user has sent a single message
      // in this conversation,
      // if so, set the name to "test name"
      // set the first conversations name to that name
      // current conversation is at index 0
      if (userMessages.length === 0) {
        setGenerating(true);
        var newConversations = conversations;
        console.log('adding title')
        newConversations[0].name = testing ?
          await testResponse()
          :
          await ask(`
        summarize the below context in 8 words or less:
        ${chatLog}
        `);
        setConversations(newConversations); 
        setGenerating(false);
      }
    }
  }

  return (
    <PromptStyled>
      <HStack className="inp">
        <Textarea
          colorScheme="purple"
          className="area"
          placeholder="Write a complex prompt..."
          maxLength={maxChars}
          onKeyPress={handleEnterPress}
          onChange={(e) => {
            const len = e.target.value.length;
            document.getElementById("charlimit").innerHTML =
              len + `/${maxChars}`;

            // character limit component
            const comp = document.getElementById("charlimit");

            // if the length is greater than the max
            if (len >= maxChars) {
              comp.style.color = "red";
            }

            // if the color is red and the length is less than the max
            else if (comp.style.color === "red") {
              comp.style.color = colorMode === "light" ? "black" : "white";
            } else {
              comp.style.color = colorMode === "light" ? "black" : "white";
            }
          }}
        />
        <Button
          id="submit"
          onClick={() => {
            addMessage(
              new Date().toLocaleTimeString(),
              "user",
              document.getElementsByClassName("area")[0].value);
          }}
        >
          {waiting ? <Spinner /> : <ArrowForwardIcon />}
        </Button>
        {/* testing checkbox */}
        <Checkbox
          colorScheme="purple"
          defaultChecked
          onChange={(e) => {
            setTesting(e.target.checked);
          }}
        >
          Testing?
        </Checkbox>
      </HStack>

      <Text
        color={colorMode === "light" ? "black" : "white"}
        id="charlimit"
        className="limtext"
      >
        0/{maxChars}
      </Text>
    </PromptStyled>
  );
};

export default Prompt;
export { getUserChatLog, ask }