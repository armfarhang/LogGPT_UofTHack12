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
import { useEffect, useState } from "react";

interface ChatHudProps {
	story: string; // Receive story from parent
}

const ChatHud: React.FC<ChatHudProps> = ({ story }) => {
	const [tabs, setTabs] = useState<number[]>([]); // State to keep track of tab IDs

	const addTab = () => {
		setTabs((prevTabs) => [...prevTabs, prevTabs.length + 1]); // Add a new tab
	};

	const [chatGptTyping, setChatGptTyping] = useState(false);
	const [chatGptAiMessageList, setChatGptAiMessageList] = useState<
		MessageModel[]
	>([]);

	const handleSendMesageToGPT = async (message: string) => {
		// Create a new user message object
		const newMessage: MessageModel = {
			message: message,
			sender: "user",
			direction: "outgoing", // Example value, adjust as needed
			position: "single", // Example value, adjust as needed
		};

		// Add the user's message to the message list
		const newMessages = [...chatGptAiMessageList, newMessage];
		setChatGptAiMessageList(newMessages);

		// Set typing indicator
		setChatGptTyping(true);

		// Send the message to ChatGPT and get the response
		const response = await getChatGPTResponse(message, story);

		// Create a new message object for the assistant's response
		const responseMessage: MessageModel = {
			message: response,
			sender: "assistant",
			direction: "incoming", // Example value, adjust as needed
			position: "single", // Example value, adjust as needed
		};

		// Add the assistant's response to the message list
		const updatedMessages = [...newMessages, responseMessage];
		setChatGptAiMessageList(updatedMessages);

		// Remove typing indicator
		setChatGptTyping(false);
	};

	useEffect(() => {
		setChatGptTyping(true);
	}, []);

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
						{tabs.map((tabId) => (
							<TabComp key={tabId} />
						))}
						<button className="addTab BTN1" onClick={addTab}>
							<IoAddOutline size={20} />
						</button>
					</div>

					{/* <div className="startNewConvoDiv">
            <div className="startNewConvo BTN2">
              <div style={{fontSize:"20px", marginRight:"5px"}}>+</div>
              <div>Conversation</div>
            </div>
          </div> */}
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
			;
		</div>
	);
};

export default ChatHud;
