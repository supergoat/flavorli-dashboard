import React from 'react';
import {RouteComponentProps, Router} from '@reach/router';
import Orders from './views/Orders';
import Account from './views/Account';
import MenuBuilder from './views/MenuBuilder';

interface Props extends RouteComponentProps {}
const App = (_: Props) => {
  return (
    <Router>
      <Orders path="/*" />
      <Account path="/account" />
      <MenuBuilder path="/menu-builder/*" />
    </Router>
  );
};

export default App;
