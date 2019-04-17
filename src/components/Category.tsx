import React from 'react';
import styled from 'styled-components/macro';
import Button from '../ui/Button';
import Colours from '../Colours';

const Menu = () => {
  return (
    <MenuWrapper>
      <MenuName>Lunch</MenuName>
      <CategoryName>Burgers</CategoryName>
      <ServiceDays>Monday to Friday</ServiceDays>
      <ServiceHours>9am to 10pm</ServiceHours>
    </MenuWrapper>
  );
};

export default Menu;

const MenuWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  border-radius: 4px;
  padding: 0 35px;
`;

const MenuName = styled.h1`
  font-size: 20px;
  color: ${Colours.osloGrey};
`;

const CategoryName = styled.h1`
  font-size: 40px;
  color: ${Colours.oxfordBlue};
`;

const ServiceDays = styled.h3``;
const ServiceHours = styled.h3``;
