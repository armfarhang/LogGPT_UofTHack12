import ChatHud from "../component/ChatHud";
import InfoHud from "../component/InfoHud";
import "./HomePage.css";
import React, {useState} from "react";

const HomePage: React.FC = () => {
  const [story, setStory] = useState<string>('Once upon a time, there was a kingdom where technology and magic coexisted. The kingdom\'s AI assistant was tasked with helping citizens solve their problems.');

  return (
    <div className="home_page_main">
      <ChatHud story={story} />
      <InfoHud story={story} setStory={setStory} />
    </div>
  );
};

export default HomePage;
