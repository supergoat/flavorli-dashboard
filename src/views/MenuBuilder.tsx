import React from 'react';
import {RouteComponentProps} from '@reach/router';
import styled, {css} from 'styled-components/macro';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import Menu from '../components/Menu';
import Button from '../ui/Button';
import Colours from '../Colours';

interface Props extends RouteComponentProps {}

const MenuBuilder = (_: Props) => {
  return (
    <MenuBuilderWrapper>
      <Navbar />
      <SideBar>
        <AddMenu>
          <Button width="100%">Add Menu +</Button>
        </AddMenu>

        <MenuList>
          <MenuItem>
            <MenuName>All Day</MenuName>
            <MenuServiceHours>Monday to Friday</MenuServiceHours>
            <MenuServiceHours>9am to 10pm</MenuServiceHours>
          </MenuItem>

          <Categories>
            <CategoryItem>Burgers</CategoryItem>
            <CategoryItem>Wingz</CategoryItem>
            <CategoryItem>Bowls and Bites</CategoryItem>
            <CategoryItem>Filthy Fries</CategoryItem>
          </Categories>
          <MenuItem>
            <MenuName>Lunch</MenuName>
            <MenuServiceHours>Monday to Friday</MenuServiceHours>
            <MenuServiceHours>9am to 10pm</MenuServiceHours>
          </MenuItem>
          <MenuItem>
            <MenuName>Dinner</MenuName>
            <MenuServiceHours>Monday to Friday</MenuServiceHours>
            <MenuServiceHours>9am to 10pm</MenuServiceHours>
          </MenuItem>
        </MenuList>
      </SideBar>

      <Menu />
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

const AddMenu = styled.div`
  padding: 20px;
`;

const MenuList = styled.div`
  padding: 0 20px;
`;

const CategoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  background: var(--white);
  border-radius: 3px;
  color: var(--oxfordBlue);
  font-weight: 300;
  padding: 15px 25px;
`;

interface MenuItemProps {
  selected?: boolean;
}
const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px 25px;
  color: var(--osloGrey);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
`;

const MenuName = styled.p`
  margin-right: 5px;
  color: ${Colours.oxfordBlue};
  font-weight: bold;
`;

const MenuServiceHours = styled.div`
  font-size: 15px;
`;

const Categories = styled.div`
  padding: 20px 0;
`;
