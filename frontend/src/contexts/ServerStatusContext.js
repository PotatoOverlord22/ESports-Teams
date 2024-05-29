import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_STATUS_URL } from '../Constants';

const ServerStatusContext = createContext();

const ServerStatusProvider = ({ children }) => {
  const [isServerOnline, setIsServerOnline] = useState(false);

  const checkServerStatus = () => {
    axios.get(API_STATUS_URL)
      .then(response => {
        setIsServerOnline(true);
      })
      .catch(error => {
        setIsServerOnline(false);
      });
  };

  useEffect(() => {
    checkServerStatus();
    const interval = setInterval(checkServerStatus, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ServerStatusContext.Provider value={{ isServerOnline }}>
      {children}
    </ServerStatusContext.Provider>
  );
};

export { ServerStatusContext, ServerStatusProvider };
