import './style.css';
import { Games } from '../games/games';
import Menu from '../menu/menu';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface ContainerProps {
  mainWidth: string;
  menuWidth: string;
  borderSize: string;
}

interface User {
  name: string;
  username: string;
  icon: string;
}

function Container({ mainWidth, menuWidth, borderSize }: ContainerProps) {
  const loggedInID = '6545b42ff11a4570f6e83281'; // change user: 6545c98e1fd42d741a201a43
  const [user, setUser] = useState<User | undefined>(undefined);
  const menuStyle = {
    width: menuWidth,
    transition: 'width 0.5s',
    overflow: 'hidden',
    border: borderSize,
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get<User>(`https://timothy-project.vercel.app/users/${loggedInID}`);
        setUser(response.data);
      } catch (error) {
        console.error('Erro ao obter os usuários', error);
      }
    };

    getUser();
  }, []);

  return (
    <div className="container">
      <div className="main" style={{ width: mainWidth }}>
        <Games />
      </div>
      <div className="side-menu" style={menuStyle}>
        <div className="menu-content">{!!user && <Menu name={user.name} icon={user.icon} />}</div>
      </div>
    </div>
  );
}

export default Container;
