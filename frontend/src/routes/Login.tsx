import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import GlobalStyles from '../styled-components/GlobalStyles';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginHandler = () => {
    const loginData = {
      username: '@' + username,
      password: password,
    };

    axios
      .post('https://timothy-project.onrender.com/api/login', loginData)
      .then((response) => {
        const { token, name, username, _id } = response.data;
        localStorage.setItem('token', token);
        axios.defaults.headers['Authorization'] = `Bearer ${token}`;
        login(name, username, _id);
        navigate('/');
      })
      .catch((error) => console.log(error));
  };

  const handleKeyPress = (e: any) => {
    if (e.key === 'Enter') {
      loginHandler();
    }
  };

  return (
    <div className="login-container">
      <GlobalStyles />
      <div className="login-form exo-font">
        <div className="login-inputs">
          <label htmlFor="">username</label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} onKeyPress={handleKeyPress} />
          <label htmlFor="">password</label>
          <input type="password" onChange={(e) => setPassword(e.target.value)} onKeyPress={handleKeyPress} />
        </div>
        <button className="login-button exo-font" onClick={loginHandler}>
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
