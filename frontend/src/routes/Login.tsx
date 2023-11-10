import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginHandler = () => {
    try {
      const loginData = {
        username: username,
        password: password,
      };

      axios
        .post('http://localhost:8080/api/login', loginData)
        .then((response) => {
          console.log(response);
          navigate('/');
        })
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <div className="login-inputs">
          <label htmlFor="">username</label>
          <input type="text" onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor="">password</label>
          <input type="text" onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="login-button" onClick={loginHandler}>
          LOGIN
        </button>
      </div>
    </div>
  );
};

export default Login;
