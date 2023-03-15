/**
 * Main App component
 *
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */

// components
import Prompt from "../components/Prompt";
import Chat from "../components/Chat";

// models as appmodels
import models from "../models/models";

// modes
import modes from "../modes/modes";

// importing empty conversation
import { emptyConversation } from "../messages/messages";

// states
import { useMessages, useConversation } from "../messages/messages";
import { useState, useRef } from "react";

// Chakra components
import { ChakraProvider, Fade, Box, Button } from "@chakra-ui/react";

// intersection observer
import { useInView } from "react-intersection-observer";

// styled components
import styled from "styled-components";

// common
import { css } from "../common/common";

//title
import Title from "../components/Title";

// styled App
const AppStyled = styled(Box)`
  /* put input on the bottom center of the screen */
  .inp {
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80%;
    margin-bottom: 5rem;
  }

  * {
    transition: ${css.transition};
  }
`;

// App component
function App() {
  // fading
  const { ref, inView } = useInView({
    threshold: 0,
  });

  // messages state
  const {
    // messages
    userMessages,
    stateAddMessage,
    stateAddBotMessage,
    botMessages,
    setUserMessages,
    setBotMessages,
  } = useMessages();

  // list of languages
  const languages = ["Auto Detect"];

  // conversations state with initial messages
  const { conversations, setConversations } = useConversation([
    emptyConversation(userMessages, botMessages),
  ]);

  // state for generating
  const [generating, setGenerating] = useState(false);

  // is waiting for response
  const [waiting, setWaiting] = useState(false);

  // state for bot model, using first model in models for now
  const [model, setModel] = useState("davinci");

  // state for all models
  const [allModels, setAllModels] = useState(models);

  // state for bot response contstraints
  const [constraints, setConstraints] = useState([
    // "-don't include you:",
    // "-minimum tokens"
  ]);

  // state for app settings accent color
  const [colorScheme, setcolorScheme] = useState("purple");

  // state for app settings font
  const [font, setFont] = useState("sans-serif");

  // New state to check what mode the app is in, will be a list of modes
  const [mode, setMode] = useState(modes[0]);

  // state to manage what langauage is being used
  const [language, setLanguage] = useState(languages[0]);

  // state to manage current model temperature
  const [temperature, setTemperature] = useState(0.5);

  // app information / states to pass as props
  var app = {
    // conversations / messages
    userMessages: userMessages,
    stateAddMessage: stateAddMessage,
    stateAddBotMessage: stateAddBotMessage,
    botMessages: botMessages,
    setUserMessages: setUserMessages,
    setBotMessages: setBotMessages,
    conversations: conversations,
    setConversations: setConversations,

    // generating conversation title
    generating: generating,
    setGenerating: setGenerating,

    // waiting for bot response
    waiting: waiting,
    setWaiting: setWaiting,

    // bot information
    model: model,
    setModel: setModel,
    constraints: constraints,
    setConstraints: setConstraints,

    // models
    models: allModels,
    setModels: setAllModels,

    // app settings
    settings: {
      accent: colorScheme,
      setAccent: setcolorScheme,
      font: font,
      setFont: setFont,
    },

    // component references
    refs: {
      areaRef: useRef(null),
      submitRef: useRef(null),
      charLimitRef: useRef(null),
      codeButtonRef: useRef(null),
    },

    // modes
    modes: modes,
    mode: mode,
    setMode: setMode,

    // current model information
    temperature: 0.5,
    setTemperature: setTemperature,

    languages: languages,
    language: language,
    setLanguage: setLanguage,
  };

  return (
    <ChakraProvider>
      <Fade in={inView} ref={ref}>
        <AppStyled fontFamily={app.settings.font}>
          <Prompt app={app} />
          <Chat app={app} />
        </AppStyled>
      </Fade>
    </ChakraProvider>
  );
}

export default App;
