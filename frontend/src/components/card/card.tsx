import React, { useRef } from 'react';
import './card.css';

interface CardProps {
  name: string;
  img: string;
}

const Card: React.FC<CardProps> = ({ name, img }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const card = cardRef.current;

    if (card) {
      const cardRect = card.getBoundingClientRect();

      // Calcula a posição do mouse relativa ao centro do card
      const mouseX = e.clientX - cardRect.left - cardRect.width / 2;
      const mouseY = e.clientY - cardRect.top - cardRect.height / 2;

      // Calcula a rotação com base na posição do mouse
      const rotationX = (mouseY / cardRect.height) * 40;
      const rotationY = -(mouseX / cardRect.width) * 40;

      // Aplica a rotação ao card
      card.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    }
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    const card = cardRef.current;
    if (card) {
      card.style.transform = 'rotateX(0deg) rotateY(0deg)';
    }
  };

  return (
    <div className='item'>
      {name}
      <div className="card-overlay"></div>
      <div className="card" ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
        <img src={img} alt='game-card' className='card-media' />
      </div>
    </div>
  );
};

export default Card;
