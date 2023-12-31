import './style.css';
import { Games } from '../games/games';
import Menu from '../menu/menu';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';

interface ContainerProps {
  mainWidth: string;
  menuWidth: string;
  isLogged: boolean;
}

interface User {
  name: string;
  username: string;
  icon: string | null;
}

function Container({ mainWidth, menuWidth, isLogged }: ContainerProps) {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loadedUser, setLoadedUser] = useState<boolean>(false);
  const { _id } = useAuth();

  const loggedInID = _id ?? '';
  const menuStyle = {
    width: menuWidth,
    transition: 'width 0.5s',
    overflow: 'hidden',
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        axios
          .get(`https://timothy-project.onrender.com/api/users/${loggedInID}`)
          .then((response) => {
            setUser(response.data);
            setLoadedUser(false);
          })
          .catch((e) => console.log('error:' + e));
      } catch (error) {
        console.error('Error: failed to get games', error);
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
          <Menu
            name={user?.name ?? ''}
            icon={user?.icon ?? ''}
            isLoading={loadedUser}
            isLogged={isLogged}
            user={_id ?? ''}
          />
        </div>
      </div>
    </div>
  );
}

export default Container;
