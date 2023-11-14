import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.css';
import Card from '../card/card';
import GlobalStyles from '../../styled-components/GlobalStyles';

interface ProfileProps {
  userId: string;
}

interface UserData {
  name: string;
  username: string;
  icon: string;
  favoriteGames: Games[];
  currentGame: string;
  currentGameCover: string;
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
  const [opacity, setOpacity] = useState(0);
  const [opacityEditIcon, setOpacityEditIcon] = useState(0);
  const navigate = useNavigate();

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
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMouseOver = () => {
    setOpacityEditIcon(1);
  };

  const handleMouseLeave = () => {
    setOpacityEditIcon(0);
  };

  useEffect(() => {
    setTimeout(() => setOpacity(1), 1000);
    getUserData();

    getGamesData();
  }, []);

  return (
    <>
      <GlobalStyles />
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
            <div className="current-playing" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
              {/* overwrite these with currentGame and currentGameCover */}
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn8VH0P94J1cz2Z5Knq2ukBDbKOhlxU4075pYgyRZsi5SeXEjU1I9C48sFYPhXCG3CdPY&usqp=CAU" />
              <h3 className="exo-font">The killer is Dead</h3>
              <i className="fa-solid fa-compact-disc disc"></i>
              <i className="fa-solid fa-edit edit" style={{ opacity: opacityEditIcon }}></i>
            </div>
          </div>

          {/* placeholders */}
          <div className="favorite-games-section ">
            <p className="exo-font section-text">Favorite Games</p>
            <div className="favorite-games">
              {gamesData?.map(({ name, image, _id }) => (
                <Link to={`/Game/${_id}`} key={_id}>
                  <Card name={name} image={image} comments={0} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
      {!userData && <div className="profile-dash"></div>}
    </>
  );
};

export default ProfilePage;
