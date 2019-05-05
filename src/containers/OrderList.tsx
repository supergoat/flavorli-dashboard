import React, {useState} from 'react';
import styled from 'styled-components/macro';
import OrderListItem from '../components/OrderListItem';
import {Subscription} from 'react-apollo';
import gql from 'graphql-tag';

const OrderList = ({restaurantId}: {restaurantId: string}) => {
  const [orders, setOrders] = useState<any>([]);

  return (
    <Subscription
      subscription={ORDERS_SUBSCRIPTION}
      variables={{restaurantId}}
      onSubscriptionData={(options: any) => {
        const {subscriptionData} = options;
        const {data} = subscriptionData;
        const {getRestaurantOrders} = data;
        setOrders([...orders, getRestaurantOrders]);
      }}
    >
      {({data, loading}: any) => {
        if (loading) return 'Loading...';
        return (
          <Orders>
            {orders.map((order: any) => {
              return <OrderListItem key={order.id} order={order} />;
            })}
          </Orders>
        );
      }}
    </Subscription>
  );
};

export default OrderList;

const Orders = styled.div`
  padding: 0 20px;
`;

const ORDERS_SUBSCRIPTION = gql`
  subscription getRestaurantOrders($restaurantId: ID!) {
    getRestaurantOrders(restaurantId: $restaurantId) {
      id
      orderNo
      dueAt
      customer {
        name
      }
      items {
        id
        name
        price
        quantity
        options {
          id
          name
          items {
            id
            name
            price
          }
        }
      }
    }
  }
`;
