import { useState } from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';
import EditIcon from '../edit-icon/edit-icon';

interface MenuProps {
  name: string;
  icon: string;
  isLoading: boolean;
  isLogged: boolean;
  user: string;
}

const Menu = ({ name, icon, isLoading, isLogged, user }: MenuProps) => {
  const [iconLoading, setIconLoading] = useState(isLoading);
  const [iconEdit, setIconEdit] = useState<boolean>(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleProfile = () => {
    alert(`${user}`);
    navigate(`/Profile/${user}`);
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
              <div className="icon-container" onClick={() => setIconEdit(!iconEdit)}>
                <div className="hover-container">
                  <img className="icon" alt="user-icon" src={icon} />
                </div>
                <i className="fa-solid fa-pen" />
              </div>
              <h2>{name}</h2>

              <div className="user-buttons">
                <button className="action-buttons" onClick={handleProfile}>
                  PROFILE
                </button>
                <button className="action-buttons" onClick={() => logout()}>
                  LOGOUT
                </button>
              </div>

              <EditIcon visible={iconEdit} onClose={() => setIconEdit(!iconEdit)} user={user} />
            </>
          )}
        </div>
      ) : (
        <div className="menu-button-content">
          <button className="login-button exo-font" onClick={() => navigate('/login')}>
            Login
          </button>
          <button className="login-button exo-font" onClick={() => navigate('/Sign')}>
            Sign-In
          </button>
        </div>
      )}
    </>
  );
};

export default Menu;
