import React from 'react';
import {RouteComponentProps, Router} from '@reach/router';
import Orders from './views/Orders';
import OrderHistory from './views/OrderHistory';
import Account from './views/Account';
import MenuBuilder from './views/MenuBuilder';

interface Props extends RouteComponentProps {}
const App = (_: Props) => {
  return (
    <Router>
      <Orders path="/*" />
      <OrderHistory path="/order-history" />
      <Account path="/account" />
      <MenuBuilder path="/menu-builder/*" />
    </Router>
  );
};

export default App;
