import './App.css';
import { useState } from 'react';
import Container from './components/container/container';

function App() {
  const [mainWidth, setMainWidth] = useState<string>('100%');
  const [menuWidth, setMenuWidth] = useState<string>('0%');
  const [sideBorder, setsideBorder] = useState<string>('0px solid #99999900');

  const toggleWidth = () => {
    if (mainWidth === '100%') {
      setMainWidth('80%');
      setMenuWidth('20%');
      setsideBorder('1px solid #999');
    } else {
      setMainWidth('100%');
      setMenuWidth('0%');
      setsideBorder('1px solid #999');
      setsideBorder('0px solid #99999900');
    }
  };

  return (
    <div className="app">
      <button className="toggler" onClick={toggleWidth}>
        Menu
      </button>
      <Container mainWidth={mainWidth} menuWidth={menuWidth} borderSize={sideBorder} />
    </div>
  );
}

export default App;
