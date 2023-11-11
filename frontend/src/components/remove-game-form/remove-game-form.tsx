import React from 'react';
import axios from 'axios';
import { useToaster } from '../../Context/ToasterContext';

interface GameFormProps {
  visible: boolean;
  onClose: () => void;
  reloadGames: () => void;
}

const RemoveGameForm: React.FC<GameFormProps> = ({ visible, onClose, reloadGames }) => {
  const showToaster = useToaster();
  const sendGames = async () => {
    try {
      const nameInput = document.getElementById('name') as HTMLInputElement | null;

      if (nameInput) {
        const name = nameInput.value;

        const response = await axios.get('https://timothy-project.onrender.com/api/games');
        const games = response.data;

        console.log(response.data);

        const gameToDelete = games.find((game: any) => game.name === name);

        //deleting all comments
        if (gameToDelete) {
          const commentsResponse = await axios.get(
            `https://timothy-project.onrender.com/api/games/${gameToDelete._id}/comments`
          );
          const comments = commentsResponse.data;

          for (const comment of comments) {
            await axios.delete(
              `https://timothy-project.onrender.com/api/games/${gameToDelete._id}/comments/${comment._id}`
            );
          }

          await axios.delete(`https://timothy-project.onrender.com/api/games/${gameToDelete._id}`);
          nameInput.value = '';
          onClose();
          reloadGames();
        } else {
          showToaster('Game not found');
          onClose();
        }
      }
    } catch (error) {
      showToaster('Failed to find/delete game.');
      onClose();
    }
  };

  return (
    <div className={`game-form ${visible ? 'show' : ''}`}>
      <div className="form-content">
        <div className="close-button" onClick={onClose}>
          <i className="fa-solid fa-x"></i>
        </div>
        <label>Game Name(Complete)</label>
        <input id="name" type="text" />

        <button className="submit" onClick={sendGames}>
          Deletar!
        </button>
      </div>
    </div>
  );
};

export default RemoveGameForm;
