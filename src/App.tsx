import React from 'react';
import {Router} from '@reach/router';
import Home from './views/Home';
import Login from './views/Login';

const App = () => {
  return (
    <Router>
      <Home path="/" />
      <Login path="/login" />
    </Router>
  );
};

export default App;
