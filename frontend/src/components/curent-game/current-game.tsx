import { useEffect, useState } from 'react';
import './style.css';
import { useToaster } from '../../Context/ToasterContext';
import GlobalStyles from '../../styled-components/GlobalStyles';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';

interface CurrentGameProps {
  visible: boolean;
  onClose: () => void;
  games: Games[];
  reload: () => void;
}

interface Games {
  name: string;
  image: string;
  _id: string;
}

const CurrentGame = ({ visible, onClose, games, reload }: CurrentGameProps) => {
  const [selectedGame, setSelectedGame] = useState({ name: '', image: '' });
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const showToaster = useToaster();
  const { _id } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  });

  const handleSelect = (gameId: string, name: string, image: string) => {
    const index = selectedGames.indexOf(gameId);
    if (index === -1) {
      setSelectedGames([gameId]);
      setSelectedGame({ name, image });
    } else {
      setSelectedGames([]);
      setSelectedGame({ name: '', image: '' });
    }
  };

  const handleButton = async () => {
    try {
      if (selectedGame.name && selectedGame.image) {
        await axios.patch(`http://localhost:8080/api/users/${_id}`, {
          currentGame: selectedGame.name,
          currentGameCover: selectedGame.image,
        });
        showToaster('Current Game updated successfully!');
        reload();
        onClose();
      } else {
        showToaster('Please select a game before updating.');
      }
    } catch (error) {
      showToaster('Failed to update the Current Game');
      console.log(error);
    }
  };

  return (
    <div className={`current-game-form ${visible ? 'show' : ''}`}>
      <GlobalStyles />
      <div className="games-form-wrapper">
        <i className="fa-solid fa-close close" onClick={onClose}></i>
        {games?.map(({ name, image, _id }) => (
          <div
            key={_id}
            className={`game-checkbox ${selectedGames.includes(_id) ? 'game-selected' : ''}`}
            onClick={() => handleSelect(_id, name, image)}
          >
            <input type="checkbox" className="checkbox" checked={selectedGames.includes(_id)} onChange={() => {}} />
            <img src={image} alt="" />
            <p className="exo-font">{name}</p>
          </div>
        ))}
        <button className="current-game-button" onClick={handleButton}>
          Select!
        </button>
      </div>
    </div>
  );
};

export default CurrentGame;
