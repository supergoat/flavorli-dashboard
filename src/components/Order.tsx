import React from 'react';
import styled from 'styled-components/macro';

import OrderItems from './OrderItems';
import Button from '../ui/Button';
import Dietary from './Dietary';

const items = [
  {
    id: '1',
    name: 'Burger',
    categories: [
      {
        name: 'Choose Sauce',
        items: [
          {
            name: 'Tomato Sauce',
            price: 1.0,
          },
        ],
      },
    ],
    price: 11.0,
    quantity: 1,
  },
  {
    id: '2',
    name: 'Burger',
    categories: [
      {
        name: 'Choose Sauce',
        items: [
          {
            name: 'Tomato Sauce',
            price: 0.0,
          },
        ],
      },
      {
        name: 'Toppings',
        items: [
          {
            name: 'Cheese',
            price: 0.0,
          },
        ],
      },
    ],
    price: 11.0,
    quantity: 1,
  },
  {
    id: '3',
    name: 'Burger',
    categories: [
      {
        name: 'Choose Sauce',
        items: [
          {
            name: 'Tomato Sauce',
            price: 0.0,
          },
        ],
      },
      {
        name: 'Toppings',
        items: [
          {
            name: 'Cheese',
            price: 0.0,
          },
          {
            name: 'Cheese',
            price: 0.0,
          },
        ],
      },
    ],
    price: 11.0,
    quantity: 1,
  },
];

const Order = () => {
  return (
    <OrderWrapper>
      <Actions>
        <Button secondary width="35%">
          Decline
        </Button>
        <Button width="60%">Accept Order</Button>
      </Actions>

      <OrderInfo>
        <TimeBadge>On Time</TimeBadge>

        <OrderId>#0001</OrderId>
      </OrderInfo>
      <OrderDueTime>
        <p>
          Due in <span>15 min</span>
        </p>
      </OrderDueTime>
      <CustomerInfo>
        <Avatar />

        <div>
          <CustomerName>Larry Page</CustomerName>
          <Dietary
            dietary={['vegan', 'halal', 'dairy-free', 'gluten-free', 'nuts']}
          />
        </div>
      </CustomerInfo>

      <Total>
        <div>Total: </div>
        <div>£10.00</div>
      </Total>
      <OrderItems items={items} />
    </OrderWrapper>
  );
};

export default Order;

const OrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 30px 40px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
`;

const OrderInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OrderId = styled.h1`
  font-size: 18px;
`;

const TimeBadge = styled.div`
  align-self: flex-start;
  font-size: 12px;
  padding: 5px 10px;
  background: green;
  border-radius: 4px;
  color: white;
`;

const OrderDueTime = styled.div`
  display: flex;
  align-items: center;
  color: var(--osloGrey);
  font-size: 20px;
  margin-bottom: 20px;

  span {
    font-weight: bold;
    font-size: 30px;
    color: var(--oxfordBlue);
  }
`;

const CustomerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0px;
`;

const CustomerName = styled.h1`
  font-size: 20px;
  margin-bottom: 5px;
`;

const Avatar = styled.img`
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background: grey;
  margin-right: 20px;
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 25px;
  font-weight: 500;
  padding: 20px 0;
`;
