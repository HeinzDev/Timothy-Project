import React, { useState, useEffect } from 'react';
import './style.css';

interface ToasterProps {
  message: string;
}

const Toaster: React.FC<ToasterProps> = ({ message }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);

      const timeoutId = setTimeout(() => {
        setShow(false);
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  return <div className={`toaster ${show ? 'show' : ''}`}>{message}</div>;
};

export default Toaster;
