import React from 'react';
import {RouteComponentProps, Router} from '@reach/router';
import styled from 'styled-components/macro';

import Navbar from './components/Navbar';
import SideBar from './components/SideBar';
import Order from './views/Order';

interface Props extends RouteComponentProps {}
const App = (_: Props) => {
  return (
    <>
      <Navbar />

      <AppWrapper>
        <SideBar />

        <Router>
          <Order path="/order" />
        </Router>
      </AppWrapper>
    </>
  );
};

export default App;

const AppWrapper = styled.div`
  padding-top: 55px;
  margin-left: 370px;
`;
