import './style.css';
import { Games } from '../games/games';
import Menu from '../menu/menu';

interface ContainerProps {
  mainWidth: string;
  menuWidth: string;
  borderSize: string;
}

function Container({ mainWidth, menuWidth, borderSize }: ContainerProps) {
  const menuStyle = {
    width: menuWidth,
    transition: 'width 0.5s',
    overflow: 'hidden',
    border: borderSize,
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
