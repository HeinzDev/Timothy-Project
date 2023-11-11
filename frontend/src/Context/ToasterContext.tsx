import React, { createContext, useContext, useState, ReactNode } from 'react';
import Toaster from '../components/toaster/toaster';

interface ToasterContextProps {
  children: ReactNode;
}

type ShowToastFunction = (message: string) => void;

const ToasterContext = createContext<ShowToastFunction | undefined>(undefined);

export const ToasterProvider: React.FC<ToasterContextProps> = ({ children }) => {
  const [toastMessage, setToastMessage] = useState('');

  const showToast: ShowToastFunction = (message) => {
    setToastMessage(message);
  };

  return (
    <ToasterContext.Provider value={showToast}>
      {children}
      <Toaster message={toastMessage} />
    </ToasterContext.Provider>
  );
};

export const useToaster = (): ShowToastFunction => {
  const showToast = useContext(ToasterContext);
  if (!showToast) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return showToast;
};
