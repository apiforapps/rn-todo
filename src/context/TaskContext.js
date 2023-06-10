import React, { createContext, useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';

import { baseURL, developer } from 'configs/api';
import { AuthContext } from './AuthContext';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('id');
  const [direction, setDirection] = useState('asc');
  const [tasks, setTasks] = useState([]);
  const [count, setCount] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const [status, setStatus] = useState(null);
  const [current, setCurrent] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    getTasks();
  }, [page, sort, direction]);

  const getTasks = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${baseURL}?developer=${developer}&page=${page}&sort_field=${sort}&sort_direction=${direction}`
      );
      const payload = await response.json();
      setTasks(payload.message.tasks);
      setCount(payload.message.total_task_count);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const createTask = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('text', text);
      const response = await fetch(`${baseURL}create?developer=${developer}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
      const payload = await response.json();
      if (payload.status === 'ok') {
        reset();
        Alert.alert('The task was saved successfully');
        getTasks();
      } else {
        Alert.alert(
          payload.message.username ||
            payload.message.email ||
            payload.message.text
        );
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('text', text);
      formData.append('status', status);
      formData.append('token', token);
      const response = await fetch(
        `${baseURL}edit/${current?.id}?developer=${developer}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        }
      );
      const payload = await response.json();
      if (payload.status === 'ok') {
        Alert.alert('The task was saved successfully');
        getTasks();
      } else {
        Alert.alert(payload.message.token);
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const reset = () => {
    setUsername('');
    setEmail('');
    setText('');
    setStatus(null);
    setCurrent(null);
  };

  return (
    <TaskContext.Provider
      value={{
        isLoading,
        tasks,
        count,
        page,
        sort,
        direction,
        username,
        email,
        text,
        status,
        current,
        setPage,
        setSort,
        setDirection,
        setUsername,
        setEmail,
        setText,
        setStatus,
        setCurrent,
        reset,
        getTasks,
        createTask,
        editTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
