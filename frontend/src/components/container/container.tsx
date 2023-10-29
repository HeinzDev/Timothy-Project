import './style.css';
import { Games } from '../games/games';
import Menu from '../menu/menu';

interface ContainerProps {
  mainWidth: string;
  menuWidth: string;
}

function Container({ mainWidth, menuWidth }: ContainerProps) {
  const menuStyle = {
    width: menuWidth,
    transition: 'width 0.5s',
    overflow: 'hidden',
  };

  return (
    <div className="container">
      <div className="main" style={{ width: mainWidth }}>
        <Games />
      </div>
      <div className="side-menu" style={menuStyle}>
        <div className="menu-content">
          <Menu />
        </div>
      </div>
    </div>
  );
}

export default Container;
