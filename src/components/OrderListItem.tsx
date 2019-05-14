import React from 'react';
import styled from 'styled-components/macro';
import Colours from '../Colours';
import {navigate} from '@reach/router';
import {formatTime} from '../_utils/formatTime';

const OrderListItem = ({order}: {order: any}) => {
  let dueAt = new Date(order.dueAt);
  dueAt.setMinutes(dueAt.getMinutes() + order.delayedBy);

  return (
    <OrderListItemWrapper onClick={() => navigate(`/order/${order.id}`)}>
      <CustomerInfo>
        <Avatar />
        <div>
          <CustomerName>{order.customer.name}</CustomerName>
          <OrderTime>
            Due at <span>{formatTime(dueAt)}</span>
          </OrderTime>
        </div>
      </CustomerInfo>

      <OrderId>#{order.orderNo}</OrderId>
    </OrderListItemWrapper>
  );
};

export default OrderListItem;

const OrderListItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background: var(--white);
  border-radius: 3px;
  color: var(--oxfordBlue);
  padding: 0;
  margin-bottom: 15px;
  font-weight: 300;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
  padding: 20px 15px;
  cursor: pointer;
`;

const CustomerInfo = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: grey;
  margin-right: 15px;
`;

const CustomerName = styled.h4`
  margin-bottom: 2px;
`;

const OrderId = styled.p``;

const OrderTime = styled.h3`
  font-size: 16px;
  color: ${Colours.osloGrey};

  span {
    font-weight: bold;
    font-size: 20px;
    color: ${Colours.oxfordBlue};
  }
`;
