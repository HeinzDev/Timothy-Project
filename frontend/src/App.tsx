import './App.css';
import { Link, Outlet } from 'react-router-dom';
import { AuthProvider } from './Context/AuthContext';
import { ToasterProvider } from './Context/ToasterContext';

function App() {
  return (
    <AuthProvider>
      <ToasterProvider>
        <div className="app">
          <Outlet />
        </div>
      </ToasterProvider>
    </AuthProvider>
  );
}

export default App;
