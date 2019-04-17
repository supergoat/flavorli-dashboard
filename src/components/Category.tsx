import React from 'react';
import {RouteComponentProps, navigate} from '@reach/router';
import styled from 'styled-components/macro';
import Button from '../ui/Button';
import Colours from '../Colours';

interface Props extends RouteComponentProps {
  menu?: string;
  category?: string;
}

const Menu = ({menu, category}: Props) => {
  return (
    <MenuWrapper>
      <MenuName onClick={() => navigate(`/menu-builder/${menu}`)}>
        {menu}
      </MenuName>
      <CategoryName>{category}</CategoryName>
    </MenuWrapper>
  );
};

export default Menu;

const MenuWrapper = styled.div``;

const MenuName = styled.h1`
  font-size: 20px;
  color: ${Colours.osloGrey};
`;

const CategoryName = styled.h1`
  font-size: 40px;
  color: ${Colours.oxfordBlue};
`;
