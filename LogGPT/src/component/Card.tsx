import React from 'react';
import './Card.css';
import { IoStarHalf } from "react-icons/io5";

interface CardProps {
  title: string;
  content: string[];
  imageUrl: string;
  chosenLogLine: string;
  type: number;
}

const Card: React.FC<CardProps> = ({ title, content, imageUrl, chosenLogLine, type }) => {
  let cardTitle = title;
  let cardType = '';
  let titleColor = '';
  let typeColor = '';

  switch (type) {
    case 1:
      cardTitle = 'Error';
      cardType = 'Critical';
      titleColor = '#ff0049';
      typeColor = '#ff0049';
      break;
    case 2:
      cardTitle = 'Warning';
      cardType = 'Moderate';
      titleColor = 'orange';
      typeColor = 'orange';
      break;
    case 3:
      cardTitle = 'Login';
      cardType = 'Low';
      titleColor = '#00ff70';
      typeColor = '#00ff70';
      break;
    default:
      cardTitle = title;
      cardType = 'Unknown';
      titleColor = 'black';
      typeColor = 'black';
  }

  return (
    <div className="card" style={{height:"470px"}}>
      <div className="card-content">
        <div className='cardTopHeader'>
          <h2 className="card-title" style={{ color: titleColor, textTransform:"uppercase" }}>{cardTitle}</h2>
          <div style={{fontSize:"15px", fontFamily:"inter", marginTop:"12px", color:"wheat", fontWeight:'600'}}>
            TYPE: <span style={{ color: typeColor , textTransform:"uppercase"}}>{cardType}</span>
          </div>
        </div>
        <div className='chatGptParentDiv'>
          <div className='chosenLogLine'>
              {content.map((log, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>{log}</div>
              ))}
            </div>
          <div className='staticTitleAi'> 
            <IoStarHalf className="rotating-icon" />
            <div>AI Generated</div>
          </div>
          <div className="gptExplanation">
            {chosenLogLine}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
