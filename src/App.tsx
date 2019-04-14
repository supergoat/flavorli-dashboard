import React from 'react';
import {RouteComponentProps, Router} from '@reach/router';
import styled from 'styled-components/macro';
import SideBar from './components/SideBar';
import Order from './views/Order';

interface Props extends RouteComponentProps {}
const App = (_: Props) => {
  return (
    <AppWrapper>
      <SideBar />

      <RouterWrapper>
        <Router>
          <Order path="/order" />
        </Router>
      </RouterWrapper>
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.div`
  display: flex;
`;

const RouterWrapper = styled.div`
  flex: 1;
`;
