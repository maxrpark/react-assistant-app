import React from 'react';
import Todo from './Components/Todo';

import { useState, useEffect } from 'react';
import axios from 'axios';
const url = '/api/projects-api';

const App = () => {
  const [projects, setProjects] = useState([]);

  const getItems = () => {
    axios.get(url).then((res) => {
      setProjects(res.data);
    });
  };
  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <Todo />;
    </>
  );
};

export default App;
