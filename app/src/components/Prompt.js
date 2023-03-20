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
const maxChars = 5000;

// constraints separator
const constraintSeparator = "##RESPONSE CONSTRAINTS##";
// --------------------------------------- //

// styled Prompt
const PromptStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
  width: 100%;

  .inp {
    outline: 3px solid red;
    position: absolute;
    bottom: 0;
    left: 0;
  }

  .limtext {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    margin-bottom: 3rem;
  }

  /* slight box shadow */
  .area {
    z-index: 2;
    height: 15vh;
  }
`;

// asks the OpenAI API for a response
// based on a specific model
async function ask(chatLog, app) {
  const response = fetch("http://localhost:3080", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },

    body: JSON.stringify({
      model: app.models[app.model].name,
      prompt: chatLog,

      // 4096 for davinci
      // 2048 for curie
      // 2048 for ada
      // 2048 for babbage
      temperature: app.temperature / 100,
      // top p\
      top_p: app.topP / 100,
      max_tokens: 1000,
    }),
  }).then((response) => response.json());
  return response;
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
// example exchange:
// user: "hello"
// bot: "hi"
//
// representation should contain the first exchange, and the exchange prior
// to the last exchange
function getUserChatLog(userMessages, botMessages, constraints, prompt, app) {
  // string representation of the chat log context
  var chatLog = "";

  // create an empty set for integers
  var set = [];

  // add 0 to the set
  set.push(0);
  
  if (userMessages.length > 0) {
    // add the most recent exchange to the set
    for (var i = 1; i < app.prevMessageCount + 1; i++) {
      const toAdd = Math.max(userMessages.length - i, 0);
      if (!set.includes(toAdd)) {
        set.push(toAdd);
      }
    }

    // add indices from the importantIndices state in app
    for (var i of app.conversations[0].importantIndices) {
      set.push(i);
    }


    // // add the second most recent exchange to the set
    // set.add(Math.max(userMessages.length - 2, 0));

    // based on the indices in the set,
    // add exchanges to the chat log
    for (var i of set) {
      // add user message
      chatLog += "user:\n" + userMessages[i].message + "\n";

      // add bot message
      chatLog += "you:\n" + botMessages[i].message + "\n";
    }

    // add most recent user prompt
    chatLog += "user:\n" + prompt + "\n";
    chatLog += "you:\n???\n\n";
  } else {
    chatLog = prompt;
  }

  // add constraints, if any
  if (constraints.length > 0) {
    chatLog += "\n" + constraintSeparator + "\n";
    for (var constraint of constraints) {
      chatLog += constraint + "\n";
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

  // handle enter press
  // should not execute if shift is also being held
  function handleEnterPress(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      app.refs.submitRef.current.click();
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
  function updateInfo(usage) {
    // compute tokens for user prompt and bot response
    const userTokens = usage.prompt_tokens;
    const botTokens = usage.completion_tokens;

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
      const area = app.refs.areaRef.current;

      // clear prompt
      area.value = "";

      // reset character limit ref
      app.refs.charLimitRef.current.innerHTML = `0/${maxChars}`;

      // // reset character limit color
      // app.refs.charLimitRef.current.style.color =
      //   colorMode === "light" ? "black" : "white";

      // disable prompt
      area.disabled = true;

      // disable submit button
      app.refs.submitRef.current.disabled = true;

      // set waiting to true
      app.setWaiting(true);

      // get chat log
      const chatLog = getUserChatLog(
        app.userMessages,
        app.botMessages,
        app.constraints,
        prompt,
        app
      );

      // if testing
      if (testing) {
        const botResponse = await testBotResponse();
        // add bot response to messages
        await app.stateAddBotMessage({
          date: new Date().toLocaleTimeString(),
          from: "bot",
          message: botResponse,
        });
        // set waiting to false
        app.setWaiting(false);
        updateInfo({
          prompt_tokens: await tokensForString(chatLog, app.model),
          completion_tokens: await tokensForString(botResponse, app.model),
        });

        // if not testing
      } else {
        // make sure the chatLog can fit in the request,
        // in other words, make sure the tokens For the String chatLog
        // is less that the current model's max tokens
        // const tokens = await tokensForString(chatLog, app.model);
        // console.log(tokens);
        // if (tokens * 2 > app.models[app.model].maxRequest) {
        //   setGenerating
        //   return alert(
        //     `Your prompt is too long. Please shorten it to ${
        //       app.models[app.model].maxRequest
        //     } tokens or less.`
        //   );
        // }
        var response = "error caught";
        try {
          response = await ask(chatLog, app);
        } catch (e) {
          console.log("error caught" + e);
        }
        const botResponse = response.data.trim();
        const usage = response.usage;
        // add bot response to messages
        await app.stateAddBotMessage({
          date: new Date().toLocaleTimeString(),
          from: "bot",
          message: botResponse,
        });
        // set waiting to false
        app.setWaiting(false);
        updateInfo(usage);
      }

      // enable prompt
      app.refs.areaRef.current.disabled = false;

      // enable submit button
      app.refs.submitRef.current.disabled = false;

      // refocus on the input area
      app.refs.areaRef.current.focus();
    }
  }

  return (
    <PromptStyled>
      <HStack className="inp">
        <Textarea
          id="areaRef"
          ref={app.refs.areaRef}
          resize="none"
          colorScheme={app.settings.accent}
          className="area"
          boxShadow={
            colorMode === "light"
              ? "0px 0px 10px 0px rgba(0, 0, 0, 0.5)"
              : "0px 0px 10px 0px rgba(255, 255, 255, 0.5)"
          }
          backgroundColor={colorMode === "light" ? "gray.100" : "gray.800"}
          placeholder="Write a complex prompt..."
          maxLength={maxChars}
          onKeyDown={handleEnterPress}
          onChange={(e) => {
            const len = e.target.value.length;

            // character limit component
            const comp = app.refs.charLimitRef.current;

            // set the character limit
            comp.innerHTML = len + `/${maxChars}`;
          }}
        />
        <Button
          id="submitRef"
          ref={app.refs.submitRef}
          onClick={() => {
            addMessage(
              new Date().toLocaleTimeString(),
              "user",
              app.refs.areaRef.current.value
            );
          }}
        >
          {app.waiting ? <Spinner /> : <ArrowForwardIcon />}
        </Button>
        {/* testing checkbox */}
        <Checkbox
          colorScheme={app.settings.accent}
          defaultChecked
          onChange={(e) => {
            setTesting(e.target.checked);
          }}
        >
          Testing?
        </Checkbox>
      </HStack>

      <Text ref={app.refs.charLimitRef} className="limtext">
        0/{maxChars}
      </Text>
    </PromptStyled>
  );
};

export default Prompt;
export { getUserChatLog, ask, tokensForString };
