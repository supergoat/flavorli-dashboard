import React from 'react';
import {RouteComponentProps, Router} from '@reach/router';
import Order from './views/Order';
import MenuBuilder from './views/MenuBuilder';

interface Props extends RouteComponentProps {}
const App = (_: Props) => {
  return (
    <Router>
      <Order path="/order" />
      <MenuBuilder path="/menu-builder" />
    </Router>
  );
};

export default App;
