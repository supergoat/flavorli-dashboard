import React from 'react';
import styled from 'styled-components/macro';

type OrderItemType = {
  id: string;
  name: string;
  categories: {
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

          <Categories>
            {orderItem.categories.map((category: any) => {
              return (
                <Category>
                  <CategoryName key={category.name}>
                    {category.name}
                  </CategoryName>
                  {category.items.map((categoryItem: any) => {
                    return (
                      <CategoryItem key={categoryItem.name}>
                        <CategoryItemName>{categoryItem.name}</CategoryItemName>
                        <CategoryItemPrice>
                          {categoryItem.price.toFixed(2)}
                        </CategoryItemPrice>
                      </CategoryItem>
                    );
                  })}
                </Category>
              );
            })}
          </Categories>
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

const Categories = styled.div``;

const Category = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 15px;
`;

const CategoryName = styled.h2`
  width: 90%;
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

const CategoryItemName = styled.p`
  font-size: 16px;
  color: var(--osloGrey);
  margin-bottom: 5px;
`;

const CategoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  width: 90%;
`;

const CategoryItemPrice = styled.div`
  font-size: 14px;
  width: 20%;
  text-align: right;
  color: var(--osloGrey);
  &:before {
    content: '£';
  }
`;
