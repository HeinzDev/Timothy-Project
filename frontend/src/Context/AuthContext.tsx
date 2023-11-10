import React, { createContext, useContext, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  name: string | null;
  username: string | null;
  _id: string | null;
  login: (name: string, username: string, _id: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [name, setName] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [_id, set_id] = useState<string | null>(null);

  const login = (name: string, username: string, _id: string): void => {
    setIsAuthenticated(true);
    setName(name);
    setUsername(username);
    set_id(_id);
  };

  const logout = (): void => {
    setIsAuthenticated(false);
    setName(null);
    setUsername(null);
    set_id(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, name, username, _id, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
