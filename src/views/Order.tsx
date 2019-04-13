import React from 'react';
import {RouteComponentProps} from '@reach/router';
import styled from 'styled-components/macro';
import Order from '../components/Order';

interface Props extends RouteComponentProps {}

const OrderView = (_: Props) => {
  return (
    <OrderWrapper>
      <Order />
    </OrderWrapper>
  );
};

export default OrderView;

const OrderWrapper = styled.div`
  overflow: auto;
  padding: 60px 40px;
  width: 100%;
  height: 100vh;
`;
