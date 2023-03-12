/**
 * Input to the bot.
 *
 * author :
 *  Mason Marker
 */

// React
import { useState, useRef } from "react";

// pricing functions
import { priceForTokens } from "../models/models";

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

// ----------- Prompt Variables ----------- //
// max characters permitted in a single prompt
const maxChars = 2000;

// constraints separator
const constraintSeparator = "##RESPONSE CONSTRAINTS##";
// --------------------------------------- //

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

// asks the OpenAI API for a response
// based on a specific model
async function ask(chatLog, model) {
  return await fetch("http://localhost:3080", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    path: "/v1/chat/completions", 

    body: JSON.stringify({
      model: model,
      prompt: chatLog,

      // 4096 for davinci
      // 2048 for curie
      // 2048 for ada
      // 2048 for babbage
      max_tokens: 1000,
      temperature: 0.5,
    }),
  })
    .then((response) => response.json())
    .then((data) => data.data.trim()); 
}

// asks the tokenizer for OpenAI's
// token count for a given prompt.
// this token count is used to calculate
// the exact price of a request
async function tokensForString(string) {
  return await fetch("http://localhost:3080/tokenizer", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      string: string,
    }),
  })
    .then((response) => response.json())
    .then((data) => data.data);
}

// gets a string representation of the user's chat log
function getUserChatLog(userMessages, botMessages, constraints, prompt) {
  // separator between message exchanges
  // const sep = "\n--next--\n";

  // string representation of the chat log context
  var chatLog = "";

  // add each message exchange to the chat log
  for (let i = 0; i < userMessages.length; i++) {
    chatLog += "user:\n" + userMessages[i].message + "\n";
    chatLog += "you:\n" + botMessages[i].message + "\n";
    // if (i < userMessages.length - 1) {
    //   chatLog += sep;
    // }
  }

  // if there are messages in the chat log, add the context footer
  if (userMessages.length > 0) {
    chatLog += `
user: 
${prompt}
you:
???

fill in your ???`;
  } else {
    chatLog += prompt;
  }

  if (constraints.length > 0) {
    chatLog += "\n\n" + constraintSeparator + "\n";
    // add each elements from the constraints array to the chat log
    for (let i = 0; i < constraints.length; i++) {
      chatLog += constraints[i] + "\n";
    }
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
const Prompt = ({ app }) => {
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

  // updates the current conversation's tokens and expenses
  async function updateInfo(userPrompt, botResponse) {
    // compute tokens for user prompt and bot response
    const userTokens = await tokensForString(userPrompt);
    const botTokens = await tokensForString(botResponse);

    // compute pricing for the tokens based on the current model
    var userExpenses = priceForTokens(userTokens, app.model);
    var botExpenses = priceForTokens(botTokens, app.model);

    // round expenses to 6 decimal places
    userExpenses = Math.round(userExpenses * 1000000) / 1000000;
    botExpenses = Math.round(botExpenses * 1000000) / 1000000;

    // increment current conversation's tokens and expenses
    var newConversations = [...app.conversations];

    // add the information
    newConversations[0].info = {
      botTokens: newConversations[0].info.botTokens + botTokens,
      botExpenses: newConversations[0].info.botExpenses + botExpenses,
      userTokens: newConversations[0].info.userTokens + userTokens,
      userExpenses: newConversations[0].info.userExpenses + userExpenses,
    };

    // set conversations
    app.setConversations(newConversations);
  }

  // add message to messages
  async function addMessage(date, from, prompt) {
    // if prompt exists, add it to messages
    if (prompt.length > 0) {
      // add message to messages
      await app.stateAddMessage({
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
      app.setWaiting(true);

      // get chat log
      const chatLog = getUserChatLog(
        app.userMessages,
        app.botMessages,
        app.constraints,
        prompt
      );

      // obtain the bot's response to the prompt
      const botResponse = testing
        ? await testBotResponse()
        : await ask(chatLog, app.models[app.model].name);

      // add bot response to messages
      await app.stateAddBotMessage({
        date: new Date().toLocaleTimeString(),
        from: "bot",
        message: botResponse,
      });

      // enable prompt
      areaRef.current.disabled = false;

      // enable submit button
      submitRef.current.disabled = false;

      // set waiting to false
      app.setWaiting(false);

      // check if the user has sent a single message
      // in this conversation,
      // if so, set the name to "test name"
      // set the first conversations name to that name
      // current conversation is at index 0
      if (app.userMessages.length === 0 && !app.conversations[0].wasRenamed) {
        app.setGenerating(true);
        var newConversations = app.conversations;
        console.log("adding title");

        // if testing
        if (testing) {
          // set the name of the conversation
          newConversations[0].name = await testResponse();

          // setting conversations again so info can be updated
          app.setConversations(newConversations);

          // update the conversations info
          await updateInfo(chatLog, newConversations[0].name);
        } else {
          var pr = `
create a title for the below context, one sentence, 8 words or less, and
do not answer the question:
${chatLog}`;

          // retrieve title suggestion from api
          var response = await ask(pr, app.models[app.model].name);

          // update info
          await updateInfo(pr, response);

          // remove surrounding quotations, if they exist
          if (
            (response[0] === '"' && response[response.length - 1] === '"') ||
            (response[0] === "'" && response[response.length - 1] === "'") ||
            (response[0] === "`" && response[response.length - 1] === "`") ||
            (response[0] === "“" && response[response.length - 1] === "”") ||
            (response[0] === "‘" && response[response.length - 1] === "’")
          ) {
            response = response.substring(1, response.length - 1);
          }

          // set conversation name to the response
          newConversations[0].name = response;
        }
        app.setConversations(newConversations);
        app.setGenerating(false);
      }

      // update info
      await updateInfo(chatLog, botResponse);

      // refocus on the input area
      areaRef.current.focus();
    }
  }

  return (
    <PromptStyled>
      <HStack className="inp">
        <Textarea
          id="areaRef"
          ref={areaRef}
          resize="none"
          colorScheme="purple"
          className="area"
          placeholder="Write a complex prompt..."
          maxLength={maxChars}
          onKeyDown={handleEnterPress}
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
          id="submitRef"
          ref={submitRef}
          onClick={() => {
            addMessage(
              new Date().toLocaleTimeString(),
              "user",
              areaRef.current.value
            );
          }}
        >
          {app.waiting ? <Spinner /> : <ArrowForwardIcon />}
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
export { getUserChatLog, ask, tokensForString };
