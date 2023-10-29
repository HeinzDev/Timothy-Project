import './App.css';
import { useState } from 'react';
import Container from './components/container/container';

function App() {
  const [mainWidth, setMainWidth] = useState<string>('100%');
  const [menuWidth, setMenuWidth] = useState<string>('0%');

  const toggleWidth = () => {
    if (mainWidth === '100%') {
      setMainWidth('80%');
      setMenuWidth('20%');
    } else {
      setMainWidth('100%');
      setMenuWidth('0%');
    }
  };

  return (
    <div className="app">
      <button className="toggler" onClick={toggleWidth}>
        Menu
      </button>
      <Container mainWidth={mainWidth} menuWidth={menuWidth} />
    </div>
  );
}

export default App;
