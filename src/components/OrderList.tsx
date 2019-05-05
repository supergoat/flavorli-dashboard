import React from 'react';
import styled from 'styled-components/macro';
import OrderListItem from './OrderListItem';

const orders: any[] = [
  {
    id: '1',
    customer: {
      name: 'Jake',
    },
    dueAt: '12:00',
  },
];
const OrderList = () => {
  return (
    <Orders>
      {orders.map((order: any) => {
        return <OrderListItem order={order} />;
      })}
    </Orders>
  );
};

export default OrderList;

const Orders = styled.div`
  padding: 0 20px;
`;
