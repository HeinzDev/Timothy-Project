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
  const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento
  const [games, setGames] = useState<GameData[]>([]);

  useEffect(() => {
    const getGames = async () => {
      try {
        const response = await axios.get<GameData[]>('http://127.0.0.1:8080/games');
        console.log(response.data);
        setGames(response.data);
        console.log('GAME' + games);
      } catch (error) {
        console.error('Erro ao obter os jogos', error);
      }
    };

    getGames(); // Chame a função para obter os jogos quando o componente montar.
    setLoading(false);
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
