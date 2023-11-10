import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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
  console.log(id);

  useEffect(() => {
    const getGameData = async () => {
      try {
        const response = await axios.get<GameData>(`http://localhost:8080/api/games/${id}`);
        setGameData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getGameData();
  }, [id]);
  return <div></div>;
};

export default GamePage;
