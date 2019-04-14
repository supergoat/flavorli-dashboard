import React from 'react';
import {RouteComponentProps, Router} from '@reach/router';
import styled from 'styled-components/macro';
import SideBar from './components/SideBar';
import Navbar from './components/Navbar';
import Order from './views/Order';

interface Props extends RouteComponentProps {}
const App = (_: Props) => {
  return (
    <AppWrapper>
      <Navbar />
      <SideBar />

      <RouterWrapper>
        <Order path="/order" />
      </RouterWrapper>
    </AppWrapper>
  );
};

export default App;

const AppWrapper = styled.div`
  display: flex;
`;

const RouterWrapper = styled(Router)`
  margin-top: 61px;
  flex: 1;
`;
