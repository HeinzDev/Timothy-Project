import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Container from '../components/container/container';
import { useAuth } from '../Context/AuthContext';

const Home = () => {
  const [mainWidth, setMainWidth] = useState<string>('100%');
  const [menuWidth, setMenuWidth] = useState<string>('0%');
  const [sideBorder, setsideBorder] = useState<string>('0px solid #99999900');

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  });

  const toggleWidth = () => {
    if (mainWidth === '100%') {
      setMainWidth('80%');
      setMenuWidth('20%');
      setsideBorder('1px solid #999');
    } else {
      setMainWidth('100%');
      setMenuWidth('0%');
      setsideBorder('1px solid #999');
      setsideBorder('0px solid #99999900');
    }
  };

  return (
    <>
      <button className="toggler" onClick={toggleWidth}>
        <i className=" fa-solid fa-bars" />
      </button>
      {isAuthenticated ? (
        <>
          <Container mainWidth={mainWidth} menuWidth={menuWidth} borderSize={sideBorder} isLogged={true} />
        </>
      ) : (
        <>
          <Container mainWidth={mainWidth} menuWidth={menuWidth} borderSize={sideBorder} isLogged={false} />
        </>
      )}
    </>
  );
};

export default Home;
