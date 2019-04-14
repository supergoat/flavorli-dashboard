import React from 'react';
import styled from 'styled-components/macro';

type OrderItemType = {
  id: string;
  name: string;
  modifiers: {
    name: string;
    items: {
      name: string;
      price: number;
    }[];
  }[];
  price: number;
  quantity: number;
};

interface Props {
  items: OrderItemType[];
}
const OrderItems = ({items}: Props) => {
  return (
    <>
      {items.map(orderItem => (
        <OrderItem key={orderItem.id}>
          <OrderItemInfo>
            <Quantity>{orderItem.quantity}</Quantity>
            <Name>{orderItem.name}</Name>
            <Price>{orderItem.price.toFixed(2)}</Price>
          </OrderItemInfo>

          <Modifiers>
            {orderItem.modifiers.map((modifier: any) => {
              return (
                <Modifier>
                  <ModifierName key={modifier.name}>
                    {modifier.name}
                  </ModifierName>
                  {modifier.items.map((modifierItem: any) => {
                    return (
                      <ModifierItem key={modifierItem.name}>
                        <ModifierItemName>{modifierItem.name}</ModifierItemName>
                        <ModifierItemPrice>
                          {modifierItem.price.toFixed(2)}
                        </ModifierItemPrice>
                      </ModifierItem>
                    );
                  })}
                </Modifier>
              );
            })}
          </Modifiers>
        </OrderItem>
      ))}
    </>
  );
};

export default OrderItems;

const OrderItem = styled.div`
  margin-bottom: 15px;
`;

const OrderItemInfo = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Quantity = styled.div`
  font-size: 20px;
  width: 10%;
  &:after {
    content: 'x';
  }
`;

const Name = styled.div`
  width: 70%;
  font-size: 20px;
  margin-bottom: 10px;
`;

const Price = styled.div`
  font-size: 15px;
  width: 20%;
  text-align: right;
  &:before {
    content: '£';
  }
`;

const Modifiers = styled.div``;

const Modifier = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 15px;
`;

const ModifierName = styled.h2`
  width: 90%;
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

const ModifierItemName = styled.p`
  font-size: 16px;
  color: var(--osloGrey);
  margin-bottom: 5px;
`;

const ModifierItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

const ModifierItemPrice = styled.div`
  font-size: 14px;
  width: 20%;
  text-align: right;
  color: var(--osloGrey);
  &:before {
    content: '£';
  }
`;
