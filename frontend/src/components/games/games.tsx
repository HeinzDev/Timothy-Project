import React, { useState, useEffect } from 'react';
import './games.css';
import GlobalStyles from '../../styled-components/GlobalStyles';
import Card from '../card/card';
import axios from 'axios';

interface GameData {
  name: string;
  image: string;
}
export const Games = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [games, setGames] = useState<GameData[]>([]);

  useEffect(() => {
    const getGames = async () => {
      try {
        const response = await axios.get<GameData[]>('http://localhost:8080/games');
        setGames(response.data);
      } catch (error) {
        console.error('Erro ao obter os jogos', error);
      }
    };

    getGames();
    setLoading(false);
  }, [games]);

  return (
    <div className="main-container">
      <GlobalStyles />
      <p className="exo-font">games</p>
      <div className="games-container">
        {loading ? (
          <div className="loading-card">{}</div>
        ) : (
          games.map(({ name, image }) => {
            return <Card key={name} name={name} image={image} />;
          })
        )}
      </div>
    </div>
  );
};
