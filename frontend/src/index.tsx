import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import GamePage from './routes/GamePage';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Home from './routes/Home';
import Login from './routes/Login';
import Sign from './routes/Sign';
import Profile from './routes/Profile';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/Login',
        element: <Login />,
      },
      {
        path: '/Sign',
        element: <Sign />,
      },
      {
        path: '/Game/:id',
        element: <GamePage />,
      },
      {
        path: '/Profile/:id',
        element: <Profile />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
