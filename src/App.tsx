import React from 'react';
import {Router} from '@reach/router';
import Home from './views/Home';

const App = () => {
  return (
    <Router>
      <Home path="/" />
    </Router>
  );
};

export default App;
