import React, { useRef } from 'react';
import './style.css';
import GlobalStyles from '../../styled-components/GlobalStyles';

GlobalStyles;
interface CardProps {
  name: string;
  image: string;
}

const GamePageCard: React.FC<CardProps> = ({ name, image }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <GlobalStyles />
      <div className="game-dash">
        <h2 className="exo-font">{name}</h2>
        <div className="game-content">
          <div className="card-wrapper">
            <div className="card" ref={cardRef}>
              <img src={image} className="card-media" />
            </div>
          </div>
          <div className="cardData">
            {' '}
            [Game Info]
            <h3>{}</h3>
          </div>
        </div>
        <div className="comments"></div>
      </div>
    </>
  );
};

export default GamePageCard;
