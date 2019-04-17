import React from 'react';
import {RouteComponentProps} from '@reach/router';
import styled from 'styled-components/macro';
import Button from '../ui/Button';
import Colours from '../Colours';

interface Props extends RouteComponentProps {
  menu?: string;
}
const Menu = ({menu}: Props) => {
  return (
    <MenuWrapper>
      <MenuName>{menu}</MenuName>
      <ServiceDays>Monday to Friday</ServiceDays>
      <ServiceHours>9am to 10pm</ServiceHours>
    </MenuWrapper>
  );
};

export default Menu;

const MenuWrapper = styled.div``;

const MenuName = styled.h1`
  font-size: 40px;
  color: ${Colours.oxfordBlue};
`;

const ServiceDays = styled.h3``;
const ServiceHours = styled.h3``;
