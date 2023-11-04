import React, { useRef } from 'react';
import './card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentAlt } from '@fortawesome/free-solid-svg-icons';

interface CardProps {
  name: string;
  image: string;
}

const Card: React.FC<CardProps> = ({ name, image }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const card = cardRef.current;

    if (card) {
      const cardRect = card.getBoundingClientRect();

      const mouseX = e.clientX - cardRect.left;
      const mouseY = e.clientY - cardRect.top;

      const rotationX = -(mouseY / cardRect.height) * 20;
      const rotationY = (mouseX / cardRect.width) * 20;

      card.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
      const shadowIntensity = (mouseX / cardRect.width) * (mouseY / cardRect.height);
      const clampedShadowIntensity = Math.min(1, Math.max(0, shadowIntensity));
      card.style.boxShadow = `10px 20px 15px 2px rgba(0, 0, 0, ${0.2 + clampedShadowIntensity * 0.3})`;
    }
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
      card.style.boxShadow = '10px 20px 15px 2px rgba(0, 0, 0, 0)';
    }
  };

  return (
    <div className="item">
      {name}
      <div className="card-overlay"></div>
      <div className="card" ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <img src={image} alt="game-card" className="card-media" />
      </div>
      <div className="icons-div">
        <FontAwesomeIcon icon={faCommentAlt} />
      </div>
    </div>
  );
};

export default Card;
