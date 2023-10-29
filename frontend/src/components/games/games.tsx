import React, { useState, useEffect } from 'react';
import './games.css';
import GlobalStyles from '../../styled-components/GlobalStyles';
import Card from '../card/card';
import axios from 'axios';

interface GameData {
  name: string;
  img: string;
}

interface User {
  id: number;
  username: string;
  email: string;
}

export const Games = () => {
  const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento
  const [data, setData] = useState<GameData[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  /*useEffect(() => {
    // Função para carregar os usuários via GET
    const getUsers = async () => {
      try {
        const response = await axios.get<User[]>('http://127.0.0.1:8080/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Erro ao obter os usuários', error);
      }
    };

    getUsers();
  }, []);*/

  useEffect(() => {
    //Fake requisition
    /*setTimeout(() => {
      const array = [
        { name: 'Catherine: Fullbody', img: 'https://m.media-amazon.com/images/I/815BAHe2-lL.jpg' },
        {
          name: 'The killer is dead',
          img: 'https://m.media-amazon.com/images/I/71MW+LprsjL._AC_UF1000,1000_QL80_.jpg',
        },
      ];
      setData(array);
      setLoading(false);
    }, 3000);*/

    // remove this further
    const array = [
      { name: 'Catherine: Fullbody', img: 'https://m.media-amazon.com/images/I/815BAHe2-lL.jpg' },
      { name: 'The killer is dead', img: 'https://m.media-amazon.com/images/I/71MW+LprsjL._AC_UF1000,1000_QL80_.jpg' },
      {
        name: 'The Legend of Zelda: Ocarina of time',
        img: 'https://images.nintendolife.com/baf49b85ad309/jp.large.jpg',
      },
      {
        name: 'Castlevania: Symphony of the Night',
        img: 'https://assets-prd.ignimgs.com/2021/12/14/castlevaniasymp-1639445441428.jpg',
      },
      {
        name: 'Batman: Arkham City',
        img: 'https://cdn.europosters.eu/image/1300/posters/batman-arkham-city-cover-i11510.jpg',
      },
      { name: 'The Evil Within 2', img: 'https://freshcomics.s3.amazonaws.com/issue_covers/JUL172131.jpg' },
      {
        name: 'Final Fantasy VII',
        img: 'https://upload.wikimedia.org/wikipedia/en/c/c2/Final_Fantasy_VII_Box_Art.jpg',
      },
      { name: 'Catherine: Fullbody', img: 'https://m.media-amazon.com/images/I/815BAHe2-lL.jpg' },
      { name: 'The killer is dead', img: 'https://m.media-amazon.com/images/I/71MW+LprsjL._AC_UF1000,1000_QL80_.jpg' },
      {
        name: 'The Legend of Zelda: Ocarina of time',
        img: 'https://images.nintendolife.com/baf49b85ad309/jp.large.jpg',
      },
      {
        name: 'Castlevania: Symphony of the Night',
        img: 'https://assets-prd.ignimgs.com/2021/12/14/castlevaniasymp-1639445441428.jpg',
      },
      {
        name: 'Batman: Arkham City',
        img: 'https://cdn.europosters.eu/image/1300/posters/batman-arkham-city-cover-i11510.jpg',
      },
      { name: 'The Evil Within 2', img: 'https://freshcomics.s3.amazonaws.com/issue_covers/JUL172131.jpg' },
      {
        name: 'Final Fantasy VII',
        img: 'https://upload.wikimedia.org/wikipedia/en/c/c2/Final_Fantasy_VII_Box_Art.jpg',
      },
      { name: 'Catherine: Fullbody', img: 'https://m.media-amazon.com/images/I/815BAHe2-lL.jpg' },
      { name: 'The killer is dead', img: 'https://m.media-amazon.com/images/I/71MW+LprsjL._AC_UF1000,1000_QL80_.jpg' },
      {
        name: 'The Legend of Zelda: Ocarina of time',
        img: 'https://images.nintendolife.com/baf49b85ad309/jp.large.jpg',
      },
      {
        name: 'Castlevania: Symphony of the Night',
        img: 'https://assets-prd.ignimgs.com/2021/12/14/castlevaniasymp-1639445441428.jpg',
      },
      {
        name: 'Batman: Arkham City',
        img: 'https://cdn.europosters.eu/image/1300/posters/batman-arkham-city-cover-i11510.jpg',
      },
      { name: 'The Evil Within 2', img: 'https://freshcomics.s3.amazonaws.com/issue_covers/JUL172131.jpg' },
      {
        name: 'Final Fantasy VII',
        img: 'https://upload.wikimedia.org/wikipedia/en/c/c2/Final_Fantasy_VII_Box_Art.jpg',
      },
    ];

    setData(array);
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
          data.map(({ name, img }) => {
            return <Card key={name} name={name} img={img} />;
          })
        )}
      </div>
    </div>
  );
};
