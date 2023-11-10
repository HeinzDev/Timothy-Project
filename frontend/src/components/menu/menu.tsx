import { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

interface MenuProps {
  name: string;
  icon: string;
  isLoading: boolean;
  isLogged: boolean;
}

const Menu = ({ name, icon, isLoading, isLogged }: MenuProps) => {
  const [iconLoading, setIconLoading] = useState(isLoading);
  const buttonStyle = {
    marginTop: '80%',
  };
  const navigate = useNavigate();
  const { logout } = useAuth();

  const loginPage = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
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
                <button className="action-buttons" onClick={handleLogout}>
                  LOGOUT
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <button className="login-button" style={buttonStyle} onClick={loginPage}>
          Login
        </button>
      )}
    </>
  );
};

export default Menu;
