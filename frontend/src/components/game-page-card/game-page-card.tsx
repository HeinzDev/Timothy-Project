import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import GlobalStyles from '../../styled-components/GlobalStyles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Comments from '../comments/comments';
import { useAuth } from '../../Context/AuthContext';

GlobalStyles;
interface CardProps {
  loggedUser: string;
  name: string;
  image: string;
  gameId: string;
}
interface CommentProps {
  _id: string;
  user: string;
  text: string;
  postId: string;
}
interface UserProps {
  name: string;
  icon: string;
}

const GamePageCard: React.FC<CardProps> = ({ loggedUser, name, image, gameId }) => {
  const [comments, setComments] = useState<CommentProps[]>();
  const [reloadComments, setReloadComments] = useState<boolean>(false);
  const [textData, setTextData] = useState<string>();
  const [userData, setUserData] = useState<UserProps>();
  const cardRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(loggedUser);
    if (loggedUser) {
      const getComments = async () => {
        if (gameId) {
          try {
            const response = await axios.get<CommentProps[]>(
              `https://timothy-project.onrender.com/api/games/${gameId}/comments`
            );
            setComments(response.data);
            setReloadComments(false);
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        }
      };
      getComments();

      const getUser = async () => {
        try {
          const response = await axios.get(`https://timothy-project.onrender.com/api/users/${loggedUser}`);
          setUserData(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      getUser();
    }
  }, [reloadComments]);

  const handleSubmitComment = async () => {
    console.log(loggedUser);
    if (loggedUser) {
      const commentData = {
        user: `${loggedUser}`,
        text: `${textData}`,
        postId: `${gameId}`,
      };
      console.log(commentData);
      try {
        const response = await axios.post(
          `https://timothy-project.onrender.com/api/games/${gameId}/comments`,
          commentData
        );
        console.log(response.data);
        setReloadComments(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('log in to comment.');
      navigate('/login');
    }
  };

  return (
    <>
      <GlobalStyles />
      <div className="back-home" onClick={() => navigate('/')}>
        <div className="home-wrapper">
          <i className="fa-solid fa-chevron-left"></i>
        </div>
      </div>
      <div className="game-dash">
        <h2 className="exo-font">{name}</h2>
        <div className="game-content">
          <div className="card-wrapper">
            <div className="card" ref={cardRef}>
              <img src={image} className="card-media" />
            </div>
          </div>
          <div className="cardData">
            {' '}
            [Game Info]
            <h3>{}</h3>
          </div>
        </div>
        <div className="comment-section">
          {userData && (
            <div className="comment-input">
              <img src={userData.icon} />

              <div className="text-input">
                <label>{userData ? userData.name : 'guest'}</label>
                <input
                  onChange={(e) => {
                    setTextData(e.target.value);
                    console.log(textData);
                  }}
                />
              </div>
              <button className="" onClick={handleSubmitComment}>
                post!
              </button>
            </div>
          )}
          <div className="comments">
            {comments?.map(({ _id, user, text, postId }) => {
              return <Comments key={_id} originalPoster={user} text={text} postId={postId} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default GamePageCard;
