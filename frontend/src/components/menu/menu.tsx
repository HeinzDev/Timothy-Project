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

  const loginPage = () => {
    navigate('/login');
  };

  const buttonStyle = {
    marginTop: '80%',
  };

  const handleEditIcon = () => {
    setIconEdit(!iconEdit);
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
              <div className="icon-container" onClick={handleEditIcon}>
                <div className="hover-container">
                  <img className="icon" alt="user-icon" src={icon} />
                </div>
                <i className="fa-solid fa-pen" />
              </div>
              <h2>{name}</h2>

              <div className="user-buttons">
                <button className="action-buttons">option 1</button>
                <button className="action-buttons">option 2</button>
                <button className="action-buttons">option 3</button>
                <button className="action-buttons" onClick={handleLogout}>
                  LOGOUT
                </button>
              </div>

              <EditIcon visible={iconEdit} onClose={handleEditIcon} user={user} />
            </>
          )}
        </div>
      ) : (
        <>
          <button className="login-button" style={buttonStyle} onClick={loginPage}>
            Login
          </button>
          <button className="login-button" style={buttonStyle} onClick={() => navigate('/Sign')}>
            Sign-In
          </button>
        </>
      )}
    </>
  );
};

export default Menu;
