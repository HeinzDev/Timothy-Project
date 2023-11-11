import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import GamePageCard from '../components/game-page-card/game-page-card';
import { useAuth } from '../Context/AuthContext';

interface GameData {
  _id: string;
  name: string;
  image: string;
  start: number;
  comments: number;
}

const GamePage = () => {
  const { id } = useParams<{ id: string }>();
  const [gameData, setGameData] = useState<GameData>();
  const { _id } = useAuth();

  const white = {
    color: 'white',
  };

  useEffect(() => {
    const getGameData = async () => {
      try {
        const response = await axios.get<GameData>(`https://timothy-project.onrender.com/api/games/${id}`);
        setGameData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getGameData();
  }, []);
  return (
    <div style={white} className="game-page-container">
      <GamePageCard
        loggedUser={_id ? _id : ''}
        name={gameData ? gameData.name : ''}
        image={gameData ? gameData.image : ''}
        gameId={id ? id : ''}
      />
    </div>
  );
};

export default GamePage;
