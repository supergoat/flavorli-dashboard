import React from 'react';
import {RouteComponentProps, Router} from '@reach/router';
import Order from './views/Order';

interface Props extends RouteComponentProps {}
const App = (_: Props) => {
  return (
    <Router>
      <Order path="/order" />
    </Router>
  );
};

export default App;
