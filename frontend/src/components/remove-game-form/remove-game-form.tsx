import React, { useEffect, useState } from 'react';
import './style.css';
import { useToaster } from '../../Context/ToasterContext';
import GlobalStyles from '../../styled-components/GlobalStyles';
import axios from 'axios';

interface CurrentGameProps {
  visible: boolean;
  onClose: () => void;
  reloadGames: () => void;
}

interface Games {
  name: string;
  image: string;
  _id: string;
}

const RemoveGameForm: React.FC<CurrentGameProps> = ({ visible, onClose, reloadGames }: CurrentGameProps) => {
  const [games, setGames] = useState<Games[]>([]);
  const [selectedGame, setSelectedGame] = useState<Games>({ name: '', image: '', _id: '' });
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const showToaster = useToaster();

  const getGames = async () => {
    try {
      const response = await axios.get<Games[]>(`https://timothy-project.onrender.com/api/games`);
      setGames(response.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    getGames();
  }, []); // Corrigi a chamada useEffect

  const handleSelect = (gameId: string, name: string, image: string) => {
    console.log("gameid:"+gameId);
    const index = selectedGames.indexOf(gameId);
    if (index === -1) {
      setSelectedGames([gameId]);
      setSelectedGame({ name, image, _id: gameId });
    } else {
      setSelectedGames([]);
      setSelectedGame({ name: '', image: '', _id: '' });
    }
  };

  const handleButton = async () => {
    try {
      if (selectedGame.name && selectedGame.image) {
        await axios.delete(`https://timothy-project.onrender.com/api/games/${selectedGame._id}`);
        showToaster('Current Game updated successfully!');
        reloadGames();
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
      <div className="delete-games-form-wrapper">
        <i className="fa-solid fa-close close" onClick={onClose}></i>
        {games?.map(({ name, image, _id }) => (
          <div
            key={_id}
            className={`game-item ${selectedGames.includes(_id) ? 'delete-select' : ''}`}
            onClick={() => handleSelect(_id, name, image)}
          >
            <img src={image} alt="" />
            <p className="exo-font">{name}</p>
          </div>
        ))}
      </div>
      <button className="delete-game-button" onClick={handleButton}>
          Delete!
      </button>
    </div>
  );
};

export default RemoveGameForm;
