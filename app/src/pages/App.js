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
import Bg from "../components/Bg";
import Toast from "../components/Toast";

// models as appmodels
import models from "../models/models";

// modes
import modes from "../modes/modes";

// icons
import { userIcons, botIcons } from "../icons/icons";

// importing empty conversation
import { emptyConversation } from "../messages/messages";

// states
import { useMessages, useConversation } from "../messages/messages";
import { useState, useRef } from "react";

// Chakra components
import { ChakraProvider, Fade, Box, useToast } from "@chakra-ui/react";

// intersection observer
import { useInView } from "react-intersection-observer";

// styled components
import styled from "styled-components";

// common
import { css, colors, fonts } from "../common/common";

// title
import Title from "../components/Title";

// styled App
const AppStyled = styled(Box)`
  overflow: hidden;

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

  document.body.style.overflow = "hidden";

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
  const [font, setFont] = useState(fonts.main);

  // New state to check what mode the app is in, will be a list of modes
  const [mode, setMode] = useState(modes[0]);

  // state to manage what langauage is being used
  const [language, setLanguage] = useState(languages[0]);

  // state to manage user icon
  const [userIcon, setUserIcon] = useState(userIcons[0]);

  // state to manage bot icon
  // default is SiRobotframework
  const [botIcon, setBotIcon] = useState(botIcons[0]);

  // set the temperature
  const [temperature, setTemperature] = useState(50);

  // set the top p
  const [topP, setTopP] = useState(50);

  // managing code detection
  const [codeDetection, setCodeDetection] = useState(true);

  // state for number of previous messages to remember for context
  const [prevMessageCount, setPrevMessageCount] = useState(1);

  // state for defining sentence size of paragraph
  const [paragraphSize, setParagraphSize] = useState(5);

  // areaRef
  const areaRef = useRef(null);

  // Chakra toast
  const toast = useToast();

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

    // re-rendering all message related components
    reRender: () => {
      setUserMessages([...userMessages]);
      setBotMessages([...botMessages]);
      setConversations([...conversations]);
    },

    // previous messages
    prevMessageCount: prevMessageCount,
    setPrevMessageCount: setPrevMessageCount,

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
      colors: colors,
      fonts: fonts,
      css: css,
      accent: colorScheme,
      setAccent: setcolorScheme,
      font: font,
      setFont: setFont,
      codeDetection: codeDetection,
      setCodeDetection: setCodeDetection,
      icons: {
        userIcons: userIcons,
        botIcons: botIcons,
        userIcon: userIcon,
        setUserIcon: setUserIcon,
        botIcon: botIcon,
        setBotIcon: setBotIcon,
      },

      // preferred paragraph size (in sentences)
      paragraphSize: paragraphSize,
      setParagraphSize: setParagraphSize,
    },

    // component references
    refs: {
      areaRef: areaRef,
      submitRef: useRef(null),
      charLimitRef: useRef(null),
      codeButtonRef: useRef(null),

      // for detecting overflow
      chatRef: useRef(null),
      chatParentRef: useRef(null),
    },

    // modes
    modes: modes,
    mode: mode,
    setMode: setMode,

    // needs removing
    languages: languages,
    language: language,
    setLanguage: setLanguage,

    // model information
    temperature: temperature,
    setTemperature: setTemperature,
    topP: topP,
    setTopP: setTopP,

    // functions
    shortenText: (prefix, editingText, limit) => {
      // editing text
      var title = prefix;

      if (editingText.length > limit) {
        title += editingText.substring(0, limit) + "...";
      } else {
        title += editingText;
      }

      return title;
    },

    // function to handle Crtl-C
    handleCrtlC: (e) => {
      const currentClipboard = navigator.clipboard
        .readText()
        .then((text) => text);

      // if ctrl-v and the user has highlighted text
      // and the currently selected text is not the same as the text in the clipboard
      if (
        e.ctrlKey &&
        e.key === "c" &&
        window.getSelection().toString() &&
        window.getSelection().toString() !== currentClipboard
      ) {
        // shorten selected text
        var title = app.shortenText(
          "Text copied: ",
          window.getSelection().toString(),
          20
        );

        // show toast
        app.showToast(title, 1500);
      }
    },

    // show themed toast
    showToast: (text, duration) => {
      toast({
        render: () => <Toast text={text} app={app} />,
        duration: duration,
      });
    },
  };

  return (
    <ChakraProvider>
      <Fade in={inView} ref={ref}>
        <AppStyled fontFamily={app.settings.font} onKeyDown={app.handleCrtlC}>
          {/* Title for switching conversations */}
          <Title app={app} />
          <Prompt app={app} />
          <Chat app={app} />
          <Bg />
        </AppStyled>
      </Fade>
    </ChakraProvider>
  );
}

export default App;
