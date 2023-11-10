import './App.css';
import { Link, Outlet } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <div className="app">
        <Outlet />
      </div>
    </AuthProvider>
  );
}

export default App;
