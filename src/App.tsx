import React from 'react';
import {RouteComponentProps, Router} from '@reach/router';
import Orders from './views/Orders';
import OrderHistory from './views/OrderHistory';
import Settings from './views/Settings';
import MenuBuilder from './views/MenuBuilder';

interface Props extends RouteComponentProps {}
const App = (_: Props) => {
  return (
    <Router>
      <Orders path="/*" />
      <OrderHistory path="/order-history" />
      <Settings path="/settings/*" />
      <MenuBuilder path="/menu-builder/*" />
    </Router>
  );
};

export default App;
