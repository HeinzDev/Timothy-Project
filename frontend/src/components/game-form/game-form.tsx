import './style.css';
import axios from 'axios';
import { useState } from 'react';
import Card from '../card/card';

interface GameFormProps {
  visible: boolean;
  onClose: () => void;
  reloadGames: () => void;
}

const GameForm = ({ visible, onClose, reloadGames }: GameFormProps) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState('');

  const sendGames = async () => {
    try {
      if (name.trim() === '' || image.trim() === '') {
        alert('Please fill in both fields');
      } else {
        await axios
          .post('https://timothy-project.onrender.com/api/games', {
            name: name,
            image: image,
          })
          .then(function (response) {
            reloadGames();
            console.log(response);
          })
          .catch(function (error) {
            alert('Failed to create the game');
            console.log(error);
          });

        setName('');
        setImage('');

        onClose();
      }
    } catch (error) {
      alert('Failed to create the game');
      console.log(error);
      onClose();
    }
  };

  return (
    <div className={`game-form ${visible ? 'show' : ''}`}>
      <div className="form-wrapper">
        <div className="form-input">
          <div className="close-button" onClick={onClose}>
            <i className="fa-solid fa-x"></i>
          </div>

          <label>Game name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />

          <label>Image link</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />

          <button className="submit" onClick={sendGames}>
            Submit
          </button>
        </div>
        {image != '' && (
          <div className="game-preview">
            <Card name={name} image={image} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GameForm;
