import { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';

interface MenuProps {
  name: string;
  icon: string;
  isLoading: boolean;
  isLogged: boolean;
}

const Menu = ({ name, icon, isLoading, isLogged }: MenuProps) => {
  const [iconLoading, setIconLoading] = useState(isLoading);

  const navigate = useNavigate();

  const loginPage = () => {
    navigate('/login');
  };

  return (
    <>
      {!!isLogged ? (
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
      ) : (
        <div className="menu">
          <button onClick={loginPage}>Login</button>
        </div>
      )}
    </>
  );
};

export default Menu;
