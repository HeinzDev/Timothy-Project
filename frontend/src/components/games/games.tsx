import React, { useState, useEffect } from 'react';
import './games.css';
import GlobalStyles from '../../styled-components/GlobalStyles';
import Card from '../card/card';

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
        const response = await fetch('/api/games/');
        if (response.ok) {
          const data = await response.json();
          setGames(data);
        } else {
          console.error('Erro ao obter os jogos:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Erro ao obter os jogos:', error);
      } finally {
        setLoading(false);
      }
    };

    getGames();
  }, []);

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
