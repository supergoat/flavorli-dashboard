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
  display: flex;
  justify-content: center;
  padding: 30px;
  padding-right: 50px;
  width: 100%;
`;
