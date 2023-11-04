import './style.css';

interface MenuProps {
  name: string;
  icon: string;
}

const Menu = ({ name, icon }: MenuProps) => {
  return (
    <div className="menu">
      <img className="icon" alt="user-icon" src={icon} />
      <h2>{name}</h2>

      <div className="user-buttons">
        <button className="action-buttons">Não sei o que</button>
        <button className="action-buttons">Não sei o que lá</button>
        <button className="action-buttons">Não sei</button>
        <button className="action-buttons">Não</button>
      </div>
    </div>
  );
};

export default Menu;
