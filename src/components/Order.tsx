import React from 'react';
import styled from 'styled-components/macro';

import OrderItems from './OrderItems';
import Button from '../ui/Button';
import Dietary from './Dietary';

const items = [
  {
    id: '1',
    name: 'Burger',
    modifiers: [
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
  {
    id: '2',
    name: 'Burger',
    modifiers: [
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
      <OrderInfo>
        <OrderDueTime>
          <p>
            Due in <span>15 min</span>
          </p>
        </OrderDueTime>
        <OrderId>
          <span>#</span>001
        </OrderId>
      </OrderInfo>
      <TimeBadge>On Time</TimeBadge>

      <Customer>
        <CustomerInfo>
          <Avatar />
          <div>
            <CustomerName>Panayiotis Nicolaou</CustomerName>
            <Dietary dietary={['vegan']} />
          </div>
        </CustomerInfo>

        <OrderActions>
          <ContactCustomer>Contact Customer</ContactCustomer>
          <EditOrder secondary>Edit Order</EditOrder>
        </OrderActions>
      </Customer>

      <OrderSummary>Order Summary</OrderSummary>

      <OrderItems items={items} />
      <Total>
        <div>Total: </div>
        <div>£10.00</div>
      </Total>
      <Actions>
        <Button secondary width="35%">
          Cancel Order
        </Button>
        <Button width="55%">Ready For Pickup</Button>
      </Actions>
    </OrderWrapper>
  );
};

export default Order;

const OrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  padding: 20px 35px;
  width: 580px;
  background: var(--white);
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
`;

const OrderInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const OrderId = styled.h1`
  font-size: 26px;
  color: var(--oxfordBlue);
  span {
    font-size: 18px;
    color: var(--osloGrey);
    font-weight: bold;
    margin-right: 3px;
  }
`;

const TimeBadge = styled.div`
  align-self: flex-start;
  font-size: 12px;
  padding: 5px 10px;
  background: green;
  border-radius: 4px;
  color: white;
  margin-bottom: 20px;
`;

const OrderDueTime = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--osloGrey);
  font-size: 20px;
  margin-bottom: 5px;

  span {
    font-weight: bold;
    font-size: 30px;
    color: var(--oxfordBlue);
  }
`;

const Customer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;
const CustomerInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 0;
`;

const CustomerName = styled.h1`
  font-size: 20px;
  margin-bottom: 5px;
`;

const Avatar = styled.img`
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background: grey;
  margin-right: 10px;
`;

const OrderActions = styled.div`
  display: flex;
  flex-direction: column;

  ${Button} {
    align-self: flex-start;
    width: 155px;
  }
`;

const ContactCustomer = styled(Button)`
  margin-bottom: 15px;
`;

const EditOrder = styled(Button)``;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 25px;
  font-weight: 500;
  padding: 20px 0;
  border-top: 1px solid var(--gallery);
`;

const OrderSummary = styled.h3`
  margin-bottom: 15px;
`;
