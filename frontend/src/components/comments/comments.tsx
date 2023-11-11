import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';

interface CommentProps {
  originalPoster: string;
  text: string;
  postId: string;
}
interface UserProps {
  name: string;
  icon: string;
}

const Comments: React.FC<CommentProps> = ({ originalPoster, text, postId }) => {
  const [opData, setOpData] = useState<UserProps>();
  const [userData, setUserData] = useState<UserProps>();
  const { _id } = useAuth();
  const user = _id;

  const getOriginalPosters = async () => {
    try {
      if (user) {
        console.log(user);
        const response = await axios.get<UserProps>(`https://timothy-project.onrender.com/api/users/${originalPoster}`);
        setOpData(response.data);
        console.log(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      if (user) {
        console.log(user);
        const response = await axios.get<UserProps>(`https://timothy-project.onrender.com/api/users/${user}`);
        setUserData(response.data);
        console.log('ACTIVE USER:' + userData?.name);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOriginalPosters();
    getUser();
  }, [user]);

  return (
    <div className="comment">
      <div className="comment-icon">
        <img src={opData?.icon} alt="" />
      </div>
      <div className="comment-data">
        <label>{opData ? opData.name : 'unknown'}</label>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Comments;
