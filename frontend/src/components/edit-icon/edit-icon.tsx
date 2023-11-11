import { useState } from 'react';
import './style.css';
import axios from 'axios';
import { useToaster } from '../../Context/ToasterContext';

interface GameFormProps {
  visible: boolean;
  onClose: () => void;
  user: string | null;
}

const EditIcon = ({ visible, onClose, user }: GameFormProps) => {
  const [iconLink, setIconLink] = useState<string>('');
  const showToaster = useToaster();

  const sendGames = async () => {
    try {
      const nameInput = document.getElementById('name') as HTMLInputElement | null;

      if (nameInput) {
        const response = await axios.get(`https://timothy-project.onrender.com/api/users/${user}`);
        const userData = response.data;

        if ('icon' in userData) {
          await axios.patch(`https://timothy-project.onrender.com/api/users/${user}`, { icon: iconLink });
          showToaster('User icon updated successfully.');
          onClose();
        } else {
          showToaster('Failed to update user icon. User data format is incorrect.');
          onClose();
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
