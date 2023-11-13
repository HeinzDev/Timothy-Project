import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import GamePageCard from '../components/game-page-card/game-page-card';
import axios from 'axios';

import ProfilePage from '../components/profile-page/profile';

const Profile = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="game-page-container">
      <ProfilePage userId={id ? id : ''} />
    </div>
  );
};

export default Profile;
