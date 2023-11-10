import './style.css';
import axios from 'axios';

interface GameFormProps {
  visible: boolean;
  onClose: () => void;
  reloadGames: () => void;
}

const RemoveGameForm = ({ visible, onClose, reloadGames }: GameFormProps) => {
  const sendGames = async () => {
    try {
      const nameInput = document.getElementById('name') as HTMLInputElement | null;

      if (nameInput) {
        const name = nameInput.value;

        const response = await axios.get('https://timothy-project.onrender.com/api/games');
        const games = response.data;

        console.log(response.data);

        const gameToDelete = games.find((game: any) => game.name == name);

        if (gameToDelete) {
          await axios.delete(`https://timothy-project.onrender.com/api/games/${gameToDelete._id}`);
          nameInput.value = '';
          onClose();
          reloadGames();
        } else {
          alert('Game not found');
          onClose();
        }
      }
    } catch (error) {
      alert('Failed to find/delete game.');
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
