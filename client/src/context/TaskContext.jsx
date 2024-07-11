import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({
    backlog: [],
    todo: [],
    inProgress: [],
    done: [],
  });
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState(null);
  const [filter, setFilter] = useState('');


  const taskAnalytics = async () => {
    setLoading(true);
    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/task/analytics`;
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;

      const response = await axios.get(reqUrl);
      console.log(response.data);
      setAnalytics(response.data.data);
    } catch (error) {
      console.error('Error while fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const reqUrl = `${import.meta.env.VITE_BACKEND_URL}/task/all-tasks?filter=${filter}`;
      const token = localStorage.getItem('token');
      axios.defaults.headers.common['Authorization'] = token;

      const response = await axios.get(reqUrl);
      console.log(response.data);
      const { data } = response.data;
      const segregatedTasks = {
        backlog: data.filter(task => task.status === 'backlog'),
        todo: data.filter(task => task.status === 'todo'),
        inProgress: data.filter(task => task.status === 'inProgress'),
        done: data.filter(task => task.status === 'done'),
      };

      setTasks(segregatedTasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const refreshTasks = async () => {
    setLoading(true);
    await Promise.all([fetchTasks(), taskAnalytics()]);
    setLoading(false);
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, refreshTasks, analytics , setFilter  , filter , loading}}>
      {children}
    </TaskContext.Provider>
  );
};

export { TaskProvider, TaskContext };
