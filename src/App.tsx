import React from 'react';
import {Router} from '@reach/router';
import Home from './views/Home';
import SideBar from './components/SideBar';

const App = () => {
  return (
    <>
      <SideBar />
      <Router>
        <Home path="/" />
      </Router>
    </>
  );
};

export default App;
