import React from 'react';
import styled from 'styled-components/macro';

type OrderItemType = {
  id: string;
  name: string;
  options: {
    id: string;
    name: string;
    items: {
      name: string;
      price: string;
    }[];
  }[];
  price: string;
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
            <Price>{orderItem.price}</Price>
          </OrderItemInfo>

          <Options>
            {orderItem.options.map((option: any) => {
              return (
                <Option key={option.id}>
                  <OptionName key={option.name}>{option.name}</OptionName>
                  {option.items.map((optionItem: any) => {
                    return (
                      <OptionItem key={optionItem.name}>
                        <OptionItemName>{optionItem.name}</OptionItemName>
                        <OptionItemPrice>{optionItem.price}</OptionItemPrice>
                      </OptionItem>
                    );
                  })}
                </Option>
              );
            })}
          </Options>
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

const Options = styled.div``;

const Option = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 15px;
`;

const OptionName = styled.h2`
  width: 90%;
  font-size: 13px;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

const OptionItemName = styled.p`
  font-size: 16px;
  color: var(--osloGrey);
  margin-bottom: 5px;
`;

const OptionItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

const OptionItemPrice = styled.div`
  font-size: 14px;
  width: 20%;
  text-align: right;
  color: var(--osloGrey);
  &:before {
    content: '£';
  }
`;
