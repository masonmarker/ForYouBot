/**
 * Input to the bot.
 *
 * author :
 *  Mason Marker
 */

// React
import { useState, useRef } from "react";

// Chakra components
import {
  Button,
  Textarea,
  Text, 
  HStack,
  Spinner,
  Checkbox,
  useColorMode,
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
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "text-davinci-003",
      prompt: chatLog,
      max_tokens: 1000,
      temperature: 0.5,
    }),
  })
    .then((response) => response.json())
    .then((data) => data.data.trim());
}

// gets a string representation of the user's chat log
function getUserChatLog(userMessages, botMessages, constraints, prompt) {

  // separator between message exchanges
  // const sep = "\n--next--\n";

  // string representation of the chat log context
  var chatLog = ""

  // add each message exchange to the chat log
  for (let i = 0; i < userMessages.length; i++) {
    chatLog += "user:" + userMessages[i].message + "\n";
    chatLog += "ChatGPT:" + botMessages[i].message + "\n";
    // if (i < userMessages.length - 1) {
    //   chatLog += sep;
    // }
  }

  // if there are messages in the chat log, add the context footer
  if (userMessages.length > 0) {
    chatLog += `
user: ${prompt}
ChatGPT: ???

fill in ChatGPT's ??? given the following constraints:`
  } else {
    chatLog += `
${prompt}
respond given the following constraints:`;
  }

  // add each elements from the constraints array to the chat log
  chatLog += "\n";
  for (let i = 0; i < constraints.length; i++) {
    chatLog += constraints[i] + "\n";
  }

  console.log(chatLog);
  return chatLog;
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
  setWaiting,

  constraints,
  setConstraints
}) => {
  // get color mode
  const { colorMode } = useColorMode();

  // is testing
  const [testing, setTesting] = useState(true);

  // ref for charlimit
  const charLimitRef = useRef(null);

  // ref for submit button
  const submitRef = useRef(null);

  // ref for input area
  const areaRef = useRef(null);

  // handle enter press
  // should not execute if shift is also being held
  function handleEnterPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitRef.current.click();
    }
  }

  // wait 1 second then return the bot's response
  async function testBotResponse() {
    await new Promise((resolve) => setTimeout(resolve, 750));

    // return a large bot response to test scrolling
    return "This is a test bot response.";
  }

  // tests a bot's response
  async function testResponse() {
    await new Promise((resolve) => setTimeout(resolve, 750));
    return "This is a test title.";
  }
  // add message to messages
  async function addMessage(date, from, prompt) {
    // if prompt exists, add it to messages
    if (prompt.length > 0) {
      // add message to messages
      await stateAddMessage({
        date: date,
        from: from,
        message: prompt,
      });
      // area
      const area = areaRef.current;

      // clear prompt
      area.value = "";

      // reset character limit ref
      charLimitRef.current.innerHTML = `0/${maxChars}`;

      // reset character limit color
      charLimitRef.current.style.color =
        colorMode === "light" ? "black" : "white";

      // disable prompt
      area.disabled = true;

      // disable submit button
      submitRef.current.disabled = true;

      // set waiting to true
      setWaiting(true);

      // get chat log
      const chatLog = getUserChatLog(userMessages, botMessages, constraints, prompt);

      // add bot response to messages
      await stateAddBotMessage({
        date: new Date().toLocaleTimeString(),
        from: "bot",
        message: testing ?
          await testBotResponse()
          :
          await ask(chatLog),
      });

      // set waiting to false
      setWaiting(false);

      // enable prompt
      areaRef.current.disabled = false;

      // enable submit button
      submitRef.current.disabled = false;

      // check if the user has sent a single message
      // in this conversation,
      // if so, set the name to "test name"
      // set the first conversations name to that name
      // current conversation is at index 0
      if (userMessages.length === 0) {
        setGenerating(true);
        var newConversations = conversations;
        console.log("adding title");

        if (testing) {
          newConversations[0].name = await testResponse();
        } else {

          // retrieve title suggestion from api
          var response = await ask(`
          create a title for the below context in one sentence, 8 words or less, and
          do not answer the question:
          ${chatLog}
          `);

          // remove surrounding quotations, if they exist
          if ((response[0] === '"' && response[response.length - 1] === '"') ||
            (response[0] === "'" && response[response.length - 1] === "'") ||
            (response[0] === "`" && response[response.length - 1] === "`") ||
            (response[0] === "“" && response[response.length - 1] === "”") ||
            (response[0] === "‘" && response[response.length - 1] === "’")) {
            response = response.substring(1, response.length - 1);
          }

          newConversations[0].name = response
        }
        setConversations(newConversations);
        setGenerating(false);
      }
    }
  }

  return (
    <PromptStyled>
      <HStack className="inp">
        <Textarea
          ref={areaRef}
          colorScheme="purple"
          className="area"
          placeholder="Write a complex prompt..."
          maxLength={maxChars}
          onKeyPress={handleEnterPress}
          onChange={(e) => {
            const len = e.target.value.length;

            // character limit component
            const comp = charLimitRef.current;

            // set the character limit
            comp.innerHTML = len + `/${maxChars}`;


            // if the length is greater than the max
            if (len >= maxChars) {
              comp.style.color = "red";
            } else if (comp.style.color === "red") {
              comp.style.color = colorMode === "light" ? "black" : "white";
            } else {
              comp.style.color = colorMode === "light" ? "black" : "white";
            }
          }}
        />
        <Button
          ref={submitRef}
          onClick={() => {
            addMessage(
              new Date().toLocaleTimeString(),
              "user",
              areaRef.current.value
            );
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
        ref={charLimitRef}
        className="limtext"
      >
        0/{maxChars}
      </Text>
    </PromptStyled>
  );
};

export default Prompt;
export { getUserChatLog, ask };
