import { useState } from 'react';
import './style.css';

interface MenuProps {
  name: string;
  icon: string;
  isLoading: boolean;
}

const Menu = ({ name, icon, isLoading }: MenuProps) => {
  const [iconLoading, setIconLoading] = useState(isLoading);
  return (
    <div className="menu">
      {isLoading ? (
        <>
          <img className="loading-icon" alt="" />
          <h2>...</h2>
        </>
      ) : (
        <>
          <img className="icon" alt="user-icon" src={icon} />
          <h2>{name}</h2>

          <div className="user-buttons">
            <button className="action-buttons">option 1</button>
            <button className="action-buttons">option 2</button>
            <button className="action-buttons">option 3</button>
            <button className="action-buttons">option 4</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;
