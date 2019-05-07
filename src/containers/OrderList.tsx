import React, {useEffect} from 'react';
import styled from 'styled-components/macro';
import OrderListItem from '../components/OrderListItem';

const OrderList = ({
  orders = [],
  onClick,
  subscribeToMore,
}: {
  orders: any;
  onClick: (id: string) => void;
  subscribeToMore?: any;
}) => {
  useEffect(() => subscribeToMore && subscribeToMore(), []);
  return (
    <Orders>
      {orders.map((order: any) => {
        return (
          <OrderListItem
            key={order.id}
            onClick={() => onClick(order.id)}
            order={order}
          />
        );
      })}
    </Orders>
  );
};

export default OrderList;

const Orders = styled.div`
  padding: 2px 20px;
  overflow-y: auto;
`;
