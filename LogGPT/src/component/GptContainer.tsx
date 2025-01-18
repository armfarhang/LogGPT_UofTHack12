import React from "react";
import { MessageModel, MessageList, TypingIndicator, Message } from "@chatscope/chat-ui-kit-react";

interface GptContainerProps {
  messages: MessageModel[];
  typing: boolean;
}

const GptContainer: React.FC<GptContainerProps> = ({ messages, typing }) => {
  return (
    <div className="gptContainer">
      <MessageList>
        {messages.map((message, index) => (
          <Message key={index} model={message} />
        ))}
        {typing && <TypingIndicator content="ChatGPT is typing..." />}
      </MessageList>
    </div>
  );
};

export default GptContainer;