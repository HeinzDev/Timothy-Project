import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import GlobalStyles from '../styled-components/GlobalStyles';
import { useToaster } from '../Context/ToasterContext';

const Sign = () => {
  const { login } = useAuth();
  const showToast = useToaster();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [icon, setIcon] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const loginHandler = () => {
    if (name != '' && username != '' && password != '') {
      const signData = {
        name: name,
        username: '@' + username,
        password: password,
        icon: icon,
      };
      axios
        .post('https://timothy-project.onrender.com/api/users', signData)
        .then(() => {
          axios
            .post('https://timothy-project.onrender.com/api/login', signData)
            .then((response) => {
              const { token, name, username, _id } = response.data;
              localStorage.setItem('token', token);
              axios.defaults.headers['Authorization'] = `Bearer ${token}`;
              login(name, username, _id);
              navigate('/');
            })
            .catch((error) => showToast('Wrong credentials!'));
        })
        .catch(() => showToast('failed to create your user'));
    }
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      loginHandler();
    }
  };

  return (
    <div className="login-container">
      <GlobalStyles />
      <div className="container-wrapper">
        <div className="login-form exo-font">
          <div className="login-inputs">
            <label htmlFor="">name</label>
            <input type="text" onChange={(e) => setName(e.target.value)} onKeyPress={handleKeyPress} />
            <label htmlFor="">username</label>
            <input type="text" onChange={(e) => setUsername(e.target.value)} onKeyPress={handleKeyPress} />
            <label htmlFor="">icon link</label>
            <input type="text" onChange={(e) => setIcon(e.target.value)} onKeyPress={handleKeyPress} />
            <label htmlFor="">password</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} />
          </div>
          <button className="sign-button exo-font" onClick={loginHandler}>
            Sign-in!
          </button>
        </div>
        {icon && (
          <div className="profile-preview">
            <p>{name}</p>
            <img src={icon} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Sign;
