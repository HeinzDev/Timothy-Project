import { useState } from 'react';
import GameForm from '../game-form/game-form';
import RemoveGameForm from '../remove-game-form/remove-game-form';
import './style.css';

interface reloadGames {
  reloadGames: () => void;
}

const ButtonMenu = ({ reloadGames }: reloadGames) => {
  const [addFormVisible, setAddFormVisible] = useState<boolean>(false);
  const [removeFormVisible, setRemoveFormVisible] = useState<boolean>(false);

  const toggleAddForm = () => {
    setAddFormVisible(!addFormVisible);
  };

  const toggleRemoveForm = () => {
    setRemoveFormVisible(!removeFormVisible);
  };

  return (
    <div className="button-menu">
      <button className="action-button" onClick={toggleRemoveForm}>
        <i className="fa-solid fa-trash"></i>
      </button>
      <RemoveGameForm reloadGames={reloadGames} visible={removeFormVisible} onClose={toggleRemoveForm} />
      <button className="action-button" onClick={toggleAddForm}>
        <i className="fa-solid fa-sticky-note"></i>
      </button>
      <GameForm reloadGames={reloadGames} visible={addFormVisible} onClose={toggleAddForm} />
    </div>
  );
};

export default ButtonMenu;
