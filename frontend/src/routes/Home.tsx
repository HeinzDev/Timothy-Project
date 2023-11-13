import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Container from '../components/container/container';
import { useAuth } from '../Context/AuthContext';
import { useToaster } from '../Context/ToasterContext';

const Home = () => {
  const [mainWidth, setMainWidth] = useState<string>('100%');
  const [menuWidth, setMenuWidth] = useState<string>('0%');

  const showToast = useToaster();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    if (isAuthenticated) showToast('Welcome!');
  });

  const toggleWidth = () => {
    if (mainWidth === '100%') {
      setMainWidth('80%');
      setMenuWidth('20%');
    } else {
      setMainWidth('100%');
      setMenuWidth('0%');
    }
  };

  return (
    <>
      <button className="toggler" onClick={toggleWidth}>
        <i className=" fa-solid fa-bars" />
      </button>
      {isAuthenticated ? (
        <>
          <Container mainWidth={mainWidth} menuWidth={menuWidth} isLogged={true} />
        </>
      ) : (
        <>
          <Container mainWidth={mainWidth} menuWidth={menuWidth} isLogged={false} />
        </>
      )}
    </>
  );
};

export default Home;
