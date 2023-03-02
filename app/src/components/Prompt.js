/**
 * Input to the bot.
 *
 * author :
 *  Mason Marker
 */

// React
import React, { useState, useEffect } from "react";

// for updating messages
import { useMessages } from "../messages/messages";

// Chakra components
import { Button, Textarea, Text, HStack, useColorMode } from "@chakra-ui/react";

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

// Prompt component
// should update messages array
// message props : date
//               : from
//               : message
//               : messageID
// when the enter key is pressed (without shift being held)
// or when the submit button is pressed should the request go through
const Prompt = ({ messages, stateAddMessage, stateAddBotMessage }) => {

  // get color mode
  const { colorMode } = useColorMode();

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
    return "This is a very long response. ".repeat(100);
  }

  // add message to messages
  async function addMessage(date, from, prompt) {

    //  request to /ask on port 5000
    // const response = await fetch("http://localhost:5000", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json"
    //   },
    //   body: JSON.stringify({
    //     prompt: prompt
    //   })
    // });

    // get response
    // const data = await response.json();

    // if prompt exists, add it to messages
    if (prompt.length > 0) {

      // add message to messages
      stateAddMessage(
        {
          date: date,
          from: from,
          message: prompt,
        },
      );



      // clear prompt
      document.getElementsByClassName("area")[0].value = "";

      // reset character limit
      document.getElementById("charlimit").innerHTML = "0/" + maxChars;

      // reset character limit color
      document.getElementById("charlimit").style.color =
        colorMode === "light" ? "black" : "white";


      // add bot's response to messages
      stateAddBotMessage(
        {
          date: new Date().toLocaleTimeString(),
          from: "bot",
          // message: await fetch("http://localhost:5000", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json"
          //   },
          //   body: JSON.stringify({
          //     prompt: prompt
          //   })
          // }).then(response => response.json()).then(data => data.data.trim())
          message: await testBotResponse()
        }
      )
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
          <ArrowForwardIcon />
        </Button>
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
