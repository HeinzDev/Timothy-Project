import React from 'react'
import './card.css';

interface CardProps {
    name:string,
    img:string
}

//Reactfc significa react funcional component
const Card: React.FC<CardProps> = ({name,img}) => {
  return (
    <div className='item' key={name}>
    {name}
        <div className="card">
            <img src={img} alt='game-card' className='card-media'/>
        </div>
    </div>
  )
}

export default Card