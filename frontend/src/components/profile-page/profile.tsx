import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import Card from '../card/card';
import GlobalStyles from '../../styled-components/GlobalStyles';
import CurrentGame from '../curent-game/current-game';
import { useAuth } from '../../Context/AuthContext';

interface ProfileProps {
  userId: string;
}

interface UserData {
  name: string;
  username: string;
  icon: string;
  favoriteGames: FavoriteGame[];
  currentGame: string;
  currentGameCover: string;
}

interface FavoriteGame {
  gameId: string;
  _id: string;
  medal?: number;
}

interface Games {
  _id: string;
  name: string;
  image: string;
  stars: number;
  comments: number;
  genre: string;
  postedBy: string;
}

const ProfilePage = ({ userId }: ProfileProps) => {
  const [userData, setUserData] = useState<UserData>();
  const [gamesData, setGamesData] = useState<Games[]>();
  const [currentGameEditForm, setcurrentGameEditForm] = useState<boolean>(false);
  const [favoriteGameEditForm, setFavoriteGameEditForm] = useState<boolean>(false);
  const [opacity, setOpacity] = useState(0);
  const [CurrentGamesEditIcon, setCurrentGamesEditIcon] = useState(0);
  const [favoriteGamesEditIcon, setFavoriteGamesEditIcon] = useState(0);
  const navigate = useNavigate();
  const { _id } = useAuth();

  const getUserData = async () => {
    try {
      if (userId) {
        const response = await axios.get<UserData>(`https://timothy-project.onrender.com/api/users/${userId}`);
        setUserData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getGamesData = async () => {
    try {
      if (userId) {
        const response = await axios.get<Games[]>(`https://timothy-project.onrender.com/api/games`);
        setGamesData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => setOpacity(1), 1000);
    getUserData();
    getGamesData();
  }, []);

  return (
    <>
      <GlobalStyles />

      <CurrentGame
        visible={currentGameEditForm}
        onClose={() => setcurrentGameEditForm(!currentGameEditForm)}
        games={gamesData ? gamesData : []}
        reload={() => getUserData()}
      />

      <div className="back-home" onClick={() => navigate('/')}>
        <div className="home-wrapper">
          <i className="fa-solid fa-chevron-left"></i>
        </div>
      </div>
      {userData && (
        <div className="profile-dash">
          <div className="user-section">
            <div style={{ opacity }} className="profile-content">
              <img style={{ opacity }} className="profile-icon" src={userData.icon} alt="" />
              <div className="user-text">
                {userData.name}
                <span>{userData.username}</span>
              </div>
            </div>
          </div>
          <div className="current-game-section">
            <p className="exo-font section-text">Current Playing</p>
            <div
              className="current-playing"
              onMouseOver={() => setCurrentGamesEditIcon(1)}
              onMouseLeave={() => setCurrentGamesEditIcon(0)}
            >
              {!!userData.currentGame && (
                <>
                  <img src={userData.currentGameCover} alt="" />
                  <h3 className="exo-font">{userData.currentGame}</h3>
                  <i className="fa-solid fa-compact-disc disc"></i>
                </>
              )}
              {_id && (
                <i
                  className="fa-solid fa-edit edit"
                  style={{ opacity: CurrentGamesEditIcon }}
                  onClick={() => setcurrentGameEditForm(true)}
                ></i>
              )}
            </div>
          </div>
          <div className="favorite-games-section ">
            <p className="exo-font section-text">Favorite Games</p>
            <div
              className="favorite-games"
              onMouseOver={() => setFavoriteGamesEditIcon(1)}
              onMouseLeave={() => setFavoriteGamesEditIcon(0)}
            >
              {_id && (
                <i
                  className="fa-solid fa-edit edit"
                  style={{ opacity: favoriteGamesEditIcon }}
                  onClick={() => setFavoriteGameEditForm(true)}
                ></i>
              )}
              {userData.favoriteGames && userData.favoriteGames.length > 0 && gamesData ? (
                userData.favoriteGames.map(({ gameId }) => {
                  const favoriteGame = gamesData.find((game) => game._id === gameId);
                  if (favoriteGame) {
                    return (
                      <Link to={`/Game/${favoriteGame._id}`} key={favoriteGame._id}>
                        <Card name={favoriteGame.name} image={favoriteGame.image} comments={0} />
                      </Link>
                    );
                  }
                  return null;
                })
              ) : (
                <div
                  style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
                >
                  <img src="/empty.png" alt="" className="empty" />
                  <h3 className="exo-font">(Empty)</h3>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {!userData && <div className="profile-dash"></div>}
    </>
  );
};

export default ProfilePage;
