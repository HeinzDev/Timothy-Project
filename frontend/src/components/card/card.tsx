import React, { useRef } from 'react';
import './style.css';

interface CardProps {
  name: string;
  image: string;
  comments: number;
}

const Card: React.FC<CardProps> = ({ name, image, comments }) => {
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
      <div className="title-row">{name}</div>
      <div className="card-row">
        <div className="card" ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
          <img src={image} className="card-media" />
        </div>
      </div>
      <div className="icons-row">{comments > 0 && <i className="fa-solid fa-message"></i>}</div>
    </div>
  );
};

export default Card;
