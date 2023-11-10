import { useState, useEffect } from 'react';
import './style.css';
import GlobalStyles from '../../styled-components/GlobalStyles';
import Card from '../card/card';
import axios from 'axios';
import ButtonMenu from '../button-menu/button-menu';
import { Link } from 'react-router-dom';

interface GameData {
  _id: number;
  name: string;
  image: string;
}
export const Games = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [games, setGames] = useState<GameData[]>([]);

  const getGames = async () => {
    try {
      const response = await axios.get<GameData[]>(`https://timothy-project.onrender.com/api/games`);
      setGames(response.data);
    } catch (error) {
      setLoading(true);
      console.log('Error: Failed to get games from the api');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getGames();
  }, []);

  return (
    <div className="main-container">
      <GlobalStyles />
      <p className="exo-font">games</p>
      <div className="games-container">
        {loading ? (
          <>
            <div className="loading-card">{}</div>
            <div className="loading-card">{}</div>
            <div className="loading-card">{}</div>
            <div className="loading-card">{}</div>
          </>
        ) : (
          games.map(({ name, image, _id }) => {
            return (
              <Link to={`/Game/${_id}`} key={_id}>
                <Card name={name} image={image} />
              </Link>
            );
          })
        )}
      </div>

      <ButtonMenu reloadGames={getGames} />
    </div>
  );
};
