import React from 'react';
import {RouteComponentProps, Router} from '@reach/router';
import styled from 'styled-components/macro';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import Menu from '../components/Menu';
import Category from '../components/Category';
import MenuList from '../components/MenuList';

import AddMenuButton from '../containers/AddMenuButton';

const menuList = [
  {
    id: '1',
    name: 'Breakfast',
    days: 'Monday to Friday',
    hours: ['12pm', '10pm'],
    categories: [],
  },
  {
    id: '2',
    name: 'Lunch',
    days: 'Monday to Friday',
    hours: ['12pm', '10pm'],
    categories: ['Burgers', 'Wingz', 'Bowls and Bites', 'Filthy Fries'],
  },
  {
    id: '3',
    name: 'Dinner',
    days: 'Monday to Friday',
    hours: ['12pm', '10pm'],
    categories: ['Burgers', 'Wingz', 'Bowls and Bites', 'Filthy Fries'],
  },
];

interface Props extends RouteComponentProps {}
const MenuBuilder = (_: Props) => {
  return (
    <MenuBuilderWrapper>
      <Navbar />
      <SideBar>
        <AddMenu>
          <AddMenuButton
            onAdd={addMenu => {
              console.log(addMenu);
            }}
          />
        </AddMenu>

        <MenuList menuList={menuList} />
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

const AddMenu = styled.div`
  padding: 20px;
`;
