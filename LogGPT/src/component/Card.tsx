import React from 'react';
import './Card.css';

interface CardProps {
  title: string;
  content: string;
  imageUrl: string;
  chosenLogLine: string;
  type: number;
}

const Card: React.FC<CardProps> = ({ title, content, imageUrl, chosenLogLine, type }) => {
  return (
    <div className="card">
      <div className="card-content">
        <div className='cardTopHeader'>
            <h2 className="card-title">{title}</h2>
            <div style={{fontSize:"10px", fontFamily:"inter", marginTop:"12px"}}>TYPE {type}</div>
        </div>
        <div className='chatGptParentDiv'>
            <div className='chosenLogLine'>{chosenLogLine}</div>
            <div className="gptExplanation">{content}</div>

        </div>
      </div>
    </div>
  );
};

export default Card;
