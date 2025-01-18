import "./ChatHud.css";
import Typewriter from "typewriter-effect";
import logo from "../assets/logGptLogo.png";
import { getChatGPTResponse } from "../chatGPT/ChatGPTService"; // Adjust the import path
import { motion } from "framer-motion";
import Person2Icon from "@mui/icons-material/Person2";
import { IoAddOutline } from "react-icons/io5";
import TabComp from "./TabComp";

import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
  MessageModel,
} from "@chatscope/chat-ui-kit-react";
import {useState } from "react";

interface ChatHudProps {
  story: string; // Receive story from parent
}

interface TabData {
  id: number;
  messages: MessageModel[];
  typing: boolean;
}

const ChatHud: React.FC<ChatHudProps> = ({ story }) => {
  const [tabs, setTabs] = useState<TabData[]>([{ id: 1, messages: [], typing: false }]); // Ensure at least one tab
  const [selectedTab, setSelectedTab] = useState<number>(1); // Select the first tab by default
  const [chatGptTyping, setChatGptTyping] = useState(false);
  const [chatGptAiMessageList, setChatGptAiMessageList] = useState<MessageModel[]>([]);

  const addTab = () => {
    const newTabId = tabs.length ? Math.max(...tabs.map((tab) => tab.id)) + 1 : 1;
    setTabs([...tabs, { id: newTabId, messages: [], typing: false }]);
    setSelectedTab(newTabId); // Select the new tab
    setChatGptAiMessageList([]); // Clear the message list for the new tab
  };

  const deleteTab = (tabId: number) => {
    if (tabs.length === 1) return; // Prevent deleting the last tab
    console.log("Deleting tab with tabId:", tabId);
    setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId));
    if (selectedTab === tabId) {
      const newSelectedTab = tabs.find((tab) => tab.id !== tabId)?.id || 1;
      setSelectedTab(newSelectedTab); // Select another tab
      const selectedTabData = tabs.find((tab) => tab.id === newSelectedTab);
      if (selectedTabData) {
        setChatGptAiMessageList(selectedTabData.messages); // Load the messages for the selected tab
        setChatGptTyping(selectedTabData.typing); // Set the typing indicator for the selected tab
      }
    }
  };

  const selectTab = (tabId: number) => {
    setSelectedTab(tabId);
    const selectedTabData = tabs.find((tab) => tab.id === tabId);
    if (selectedTabData) {
      setChatGptAiMessageList(selectedTabData.messages); // Load the messages for the selected tab
      setChatGptTyping(selectedTabData.typing); // Set the typing indicator for the selected tab
    }
  };

  const handleSendMesageToGPT = async (message: string) => {
    if (selectedTab === null) return;

    const newMessage: MessageModel = {
      message: message,
      sender: "user",
      direction: "outgoing",
      position: "single",
    };

    const newMessages = [...chatGptAiMessageList, newMessage];
    setChatGptAiMessageList(newMessages);
    setChatGptTyping(true);

    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === selectedTab
          ? { ...tab, messages: newMessages, typing: true }
          : tab
      )
    );

    const response = await getChatGPTResponse(message, story);

    const responseMessage: MessageModel = {
      message: response,
      sender: "assistant",
      direction: "incoming",
      position: "single",
    };

    const updatedMessages = [...newMessages, responseMessage];
    setChatGptAiMessageList(updatedMessages);
    setChatGptTyping(false);

    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === selectedTab
          ? { ...tab, messages: updatedMessages, typing: false }
          : tab
      )
    );
  };

  return (
    <div className="chat_hud_main">
      <div className="glowing-oval"></div>
      <div className="chat_hud_main_top_header">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "10px",
            width: "100%",
            marginTop: "00px",
          }}
        >
          <img className="log_gpt_log" src={logo} alt="" />
          <div
            style={{ fontFamily: "inter", fontSize: "30px", color: "white" }}
          >
            LogGPT
          </div>

          <div className="tabDiv">
            <div className="tabUnderline"></div>
            {tabs.map((tab) => {
              console.log("Rendering TabComp with tabId:", tab.id);
              return (
                <TabComp
                  key={tab.id}
                  tabId={tab.id}
                  onDelete={() => deleteTab(tab.id)}
                  onSelect={() => selectTab(tab.id)}
                  isSelected={selectedTab === tab.id}
                />
              );
            })}
            <button className="addTab BTN1" onClick={addTab}>
              <IoAddOutline size={20} />
            </button>
          </div>

          <div className="profileIcon BTN1">
            <Person2Icon />
          </div>
        </div>
      </div>
      <motion.div
        className="introduction_chat"
        initial={{ opacity: 1 }} // Start fully visible
        animate={{ opacity: chatGptAiMessageList.length === 0 ? 1 : 0 }} // Fade out when condition is false
        transition={{ duration: 0.5 }} // Duration of the fade effect
      >
        <div className="intoruction_chat">
          <Typewriter
            onInit={(typewriter) => {
              typewriter
                .typeString("What can I help you with?")
                .callFunction(() => {
                  console.log("String typed out!");
                })
                .pauseFor(500) // Shorter pause for quicker transition
                .callFunction(() => {
                  console.log("All strings were deleted");
                })
                .start();
            }}
            options={{
              delay: 25, // Reduce delay between typing characters (lower value = faster)
            }}
          />
        </div>
      </motion.div>
      <div className="gptContinaer">
        <MainContainer className="chat-main-container">
          <ChatContainer>
            <MessageList
              typingIndicator={
                chatGptTyping ? <TypingIndicator content="Logging" /> : null
              }
            >
              {chatGptAiMessageList.map((message, index) => (
                <Message key={index} model={message} />
              ))}
            </MessageList>
            <MessageInput
              placeholder="Type message here"
              onSend={handleSendMesageToGPT}
            />
          </ChatContainer>
        </MainContainer>
      </div>
    </div>
  );
};

export default ChatHud;
