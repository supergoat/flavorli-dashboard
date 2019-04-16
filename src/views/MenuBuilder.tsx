import React from 'react';
import {RouteComponentProps} from '@reach/router';
import styled from 'styled-components/macro';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
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
            <div>
              <MenuName>Breakfast</MenuName>
              <MenuServingTime>
                Monday to Friday <br />
                9am to 12pm
              </MenuServingTime>
            </div>

            <Months>Jan-Jul</Months>
          </MenuItem>

          <MenuItem>
            <div>
              <MenuName>Lunch</MenuName>
              <MenuServingTime>
                Monday to Friday <br />
                12pm to 5pm
              </MenuServingTime>
            </div>
          </MenuItem>
        </MenuList>
      </SideBar>
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
  padding: 20px;
`;

const MenuItem = styled.div`
  display: flex;
  justify-content: space-between;
  background: var(--white);
  border-radius: 3px;
  color: var(--oxfordBlue);
  padding: 0;
  margin-bottom: 15px;
  font-weight: 300;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  padding: 20px 15px;
`;

const MenuName = styled.h4`
  margin-bottom: 2px;
`;

const Months = styled.p``;

const MenuServingTime = styled.h3`
  font-size: 16px;
  color: ${Colours.osloGrey};

  span {
    font-weight: bold;
    font-size: 20px;
    color: ${Colours.oxfordBlue};
  }
`;
