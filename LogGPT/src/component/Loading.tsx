import React from "react";
import "./Loading.css";

const Loading: React.FC = () => {

  return (
    <div className="canvas"style={{zIndex:"0"}}>
      <div className="cube">
        <div className="group group--aqua">
          <div className="plane plane--aqua">
            <div className="dot dot--aqua"></div>
            <div className="dot dot--aqua"></div>
            <div className="dot dot--aqua"></div>
            <div className="dot dot--aqua"></div>
            <div className="dot dot--aqua"></div>
            <div className="dot dot--aqua"></div>
            <div className="dot dot--aqua"></div>
            <div className="dot dot--aqua"></div>
            <div className="dot dot--aqua"></div>
          </div>
        </div>
        <div className="group">
          <div className="plane plane--gold">
            <div className="dot dot--gold"></div>
            <div className="dot dot--gold"></div>
            <div className="dot dot--gold"></div>
            <div className="dot dot--gold"></div>
            <div className="dot dot--gold"></div>
            <div className="dot dot--gold"></div>
            <div className="dot dot--gold"></div>
            <div className="dot dot--gold"></div>
            <div className="dot dot--gold"></div>
          </div>
        </div>
        <div className="group group--tomato">
          <div className="plane plane--tomato">
            <div className="dot dot--tomato"></div>
            <div className="dot dot--tomato"></div>
            <div className="dot dot--tomato"></div>
            <div className="dot dot--tomato"></div>
            <div className="dot dot--tomato"></div>
            <div className="dot dot--tomato"></div>
            <div className="dot dot--tomato"></div>
            <div className="dot dot--tomato"></div>
            <div className="dot dot--tomato"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
