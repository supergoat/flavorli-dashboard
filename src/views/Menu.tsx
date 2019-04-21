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
      <MenuDescription>{menu}</MenuDescription>

      <ServiceDays>Monday to Friday</ServiceDays>
      <ServiceHours>9am to 10pm</ServiceHours>
    </MenuWrapper>
  );
};

export default Menu;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 580px;
  flex: 1;
  padding: 20px 35px;
`;

const MenuName = styled.h1`
  font-size: 40px;
`;

const MenuDescription = styled.p`
  /* font-size: 40px; */
  margin: 10px 0;
`;

const ServiceDays = styled.h3``;
const ServiceHours = styled.h3``;
