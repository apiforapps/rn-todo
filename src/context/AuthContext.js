import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

import { baseURL, developer } from 'configs/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState(null);

  useEffect(() => {
    getTokenFromStorage();
  }, []);

  const getTokenFromStorage = async () => {
    try {
      const payload = await AsyncStorage.getItem('@token');
      return payload !== null ? setToken(payload) : setToken(null);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('username', username);
      formData.append('password', password);
      const response = await fetch(`${baseURL}login?developer=${developer}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      const payload = await response.json();
      if (payload.status === 'ok') {
        setToken(payload.message.token);
        await AsyncStorage.setItem('@token', payload.message.token);
        setUsername('');
        setPassword('');
      } else {
        setToken(null);
        Alert.alert(payload.message.username || payload.message.password);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        username,
        password,
        token,
        setUsername,
        setPassword,
        setToken,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
