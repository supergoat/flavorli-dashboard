import React from 'react';
import {RouteComponentProps} from '@reach/router';
import styled from 'styled-components/macro';
import Order from '../components/Order';
import SideBar from '../components/SideBar';
import Navbar from '../components/Navbar';

interface Props extends RouteComponentProps {}

const OrderView = (_: Props) => {
  return (
    <OrderWrapper>
      <Navbar />
      <SideBar />

      <Order />
    </OrderWrapper>
  );
};

export default OrderView;

const OrderWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
  width: 100%;
  margin-top: 61px;
`;
