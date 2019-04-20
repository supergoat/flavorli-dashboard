import React from 'react';
import {RouteComponentProps, Router} from '@reach/router';
import styled from 'styled-components/macro';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import Menu from '../components/Menu';
import Category from '../components/Category';
import MenuList from '../containers/MenuList';

import AddMenuButton from '../containers/AddMenuButton';

interface Props extends RouteComponentProps {}
const MenuBuilder = (_: Props) => {
  return (
    <MenuBuilderWrapper>
      <Navbar />
      <SideBar>
        <AddMenuButton />

        <MenuList />
      </SideBar>

      <RouterWrapper>
        <Menu path="/:menu" />
        <Category path="/:menu/:category" />
      </RouterWrapper>
    </MenuBuilderWrapper>
  );
};

export default MenuBuilder;

const MenuBuilderWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
  width: 100%;
  margin-top: 61px;
`;

const RouterWrapper = styled(Router)`
  display: flex;
  justify-content: center;
  flex: 1;
`;
