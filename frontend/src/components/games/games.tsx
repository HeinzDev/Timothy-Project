import { useState, useEffect } from 'react';
import './style.css';
import GlobalStyles from '../../styled-components/GlobalStyles';
import Card from '../card/card';
import axios from 'axios';
import ButtonMenu from '../button-menu/button-menu';
import { Link } from 'react-router-dom';
import { useToaster } from '../../Context/ToasterContext';

interface GameData {
  _id: number;
  name: string;
  image: string;
  comments: number;
}

export const Games = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [games, setGames] = useState<GameData[]>([]);
  const showToast = useToaster();

  const getGames = async () => {
    try {
      const response = await axios.get<GameData[]>(`https://timothy-project.onrender.com/api/games`);
      setGames(response.data);
      setLoading(false);
      return true; // need this to the toaster works properly
    } catch (error) {
      console.log('Error: Failed to get games from the api');
      setLoading(false);
      return false; // operation failed
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const success = await getGames();
      setTimeout(() => {
        if (!success) {
          showToast('Failed to get the cards. Maybe you should try to access the api URL.');
        }
      }, 5000);
    };

    fetchData();
  }, [loading, showToast]);

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
          games.map(({ name, image, _id, comments }) => (
            <Link to={`/Game/${_id}`} key={_id}>
              <Card name={name} image={image} comments={comments} />
            </Link>
          ))
        )}
      </div>

      <ButtonMenu reloadGames={getGames} />
    </div>
  );
};
