import { useState } from 'react';
import './style.css';
import axios from 'axios';

interface GameFormProps {
  visible: boolean;
  onClose: () => void;
  user: string | null;
}

const EditIcon = ({ visible, onClose, user }: GameFormProps) => {
  const [iconLink, setIconLink] = useState<string>('');

  const sendGames = async () => {
    try {
      const nameInput = document.getElementById('name') as HTMLInputElement | null;

      if (nameInput) {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        };

        if (token) {
          const response = await axios.get(`http://localhost:8080/api/users/${user}`, config);
          const userData = response.data;

          if ('icon' in userData) {
            await axios.patch(`http://localhost:8080/api/users/${user}`, { icon: iconLink }, config);
            alert('User icon updated successfully.');
            onClose();
          } else {
            alert('Failed to update user icon. User data format is incorrect.');
            onClose();
          }
        }
      }
    } catch (error) {
      alert('Failed to edit user icon.');
      onClose();
    }
  };

  return (
    <div className={`game-form ${visible ? 'show' : ''}`}>
      <div className="icon-form-wrapper">
        <div className="form-content">
          <label>Icon Link</label>
          <input id="name" type="text" value={iconLink} onChange={(e) => setIconLink(e.target.value)} />

          <button className="submit" onClick={sendGames}>
            Update Icon
          </button>
        </div>
        <div className="icon-preview">
          <img src={iconLink} />
        </div>
        <div className="close-button" onClick={onClose}>
          <i className="fa-solid fa-x"></i>
        </div>
      </div>
    </div>
  );
};

export default EditIcon;
