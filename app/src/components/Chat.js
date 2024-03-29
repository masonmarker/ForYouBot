/**
 * Main Chat display component
 *
 * authors :
 *  Mason Marker
 *  Harris Chaudhry
 */

// components
import ChatPanel from "./ChatPanel";
import InfoPanel from "./InfoPanel";

// styled components
import styled from "styled-components";

// styled Chat component
const ChatStyled = styled.div``;

// Chat component
const Chat = ({ app }) => {
  return (
    <ChatStyled>
      <ChatPanel app={app} />
      <InfoPanel />
    </ChatStyled>
  );
};

export default Chat;
