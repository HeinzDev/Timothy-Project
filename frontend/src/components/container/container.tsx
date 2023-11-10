import './style.css';
import { Games } from '../games/games';
import Menu from '../menu/menu';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';

interface ContainerProps {
  mainWidth: string;
  menuWidth: string;
  borderSize: string;
  isLogged: boolean;
}

interface User {
  name: string;
  username: string;
  icon: string;
}

function Container({ mainWidth, menuWidth, borderSize, isLogged }: ContainerProps) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loadedUser, setLoadedUser] = useState<boolean>(false);
  const { _id } = useAuth();

  const loggedInID = _id ?? '';
  const menuStyle = {
    width: menuWidth,
    transition: 'width 0.5s',
    overflow: 'hidden',
    border: borderSize,
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        };

        if (token) {
          axios
            .get(`https://timothy-project.onrender.com/api/users/${loggedInID}`, config)
            .then((response) => {
              setUser(response.data);
              setLoadedUser(false);
            })
            .catch((e) => console.log('error:' + e));
        }
      } catch (error) {
        console.error('Erro ao obter os jogos:', error);
        setLoadedUser(true);
      }
    };
    getUsers();
  }, [loggedInID]);

  return (
    <div className="container">
      <div className="main" style={{ width: mainWidth }}>
        <Games />
      </div>
      <div className="side-menu" style={menuStyle}>
        <div className="menu-content">
          <Menu name={user?.name ?? ''} icon={user?.icon ?? ''} isLoading={loadedUser} isLogged={isLogged} />
        </div>
      </div>
    </div>
  );
}

export default Container;
