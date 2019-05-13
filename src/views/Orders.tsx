import React, {useState} from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {RouteComponentProps, Router, navigate} from '@reach/router';
import styled, {css} from 'styled-components/macro';
import Order from './Order';
import SideBar from '../components/SideBar';
import Navbar from '../containers/Navbar';
import Colours from '../Colours';
import OrderList from '../containers/OrderList';

// restaurantId={'cjumsnzj9001d0707xfdi5lbe'}

interface Props extends RouteComponentProps {}
const OrdersView = (_: Props) => {
  const [orderId, setOrderId] = useState('');
  const [newOrders, setNewOrders] = useState<any>([]);
  const [inProgressOrders, setInProgressOrders] = useState<any>([]);
  const [readyOrders, setReadyOrders] = useState<any>([]);
  const [status, setStatus] = useState('Pending');

  const updateOrders = ({getOrders}: any) => {
    let newOrdersLocal: any = [];
    let inProgressOrdersLocal: any = [];
    let readyOrdersLocal: any = [];

    getOrders.forEach((order: any) => {
      if (order.status === 'Pending') newOrdersLocal.push(order);
      if (order.status === 'InProgress') inProgressOrdersLocal.push(order);
      if (order.status === 'Ready') readyOrdersLocal.push(order);
      setNewOrders(newOrdersLocal);
      setInProgressOrders(inProgressOrdersLocal);
      setReadyOrders(readyOrdersLocal);
    });
  };

  return (
    <Query
      query={GET_ORDERS}
      variables={{status}}
      fetchPolicy="cache-and-network"
      onCompleted={updateOrders}
    >
      {({loading, error, data: {getOrders}, subscribeToMore}: any) => {
        const subscribeToMoreOrders = () =>
          subscribeToMore({
            document: ORDERS_SUBSCRIPTION,
            variables: {restaurantId: 'cjumsnzj9001d0707xfdi5lbe'},
            updateQuery: (prev: any, {subscriptionData}: any) => {
              if (!subscriptionData.data) return prev;
              const newOrder = subscriptionData.data.getRestaurantOrders;
              setNewOrders([newOrder, ...newOrders]);
              return Object.assign({}, prev, {
                getOrders: [newOrder, ...prev.getOrders],
              });
            },
          });

        let displayingOrders = [];
        if (status === 'Pending') displayingOrders = newOrders;
        if (status === 'InProgress') displayingOrders = inProgressOrders;
        if (status === 'Ready') displayingOrders = readyOrders;

        return (
          <OrderWrapper>
            <Navbar />
            <SideBar>
              <Tabs>
                <Tab
                  selected={status === 'Pending'}
                  onClick={() => {
                    newOrders.length > 0
                      ? navigate(`/order/${newOrders[0].id}`)
                      : navigate(`/`);
                    setStatus('Pending');
                  }}
                >
                  New{' '}
                  {newOrders.length > 0 && (
                    <TabNumber selected={status === 'Pending'}>
                      {newOrders.length}
                    </TabNumber>
                  )}
                </Tab>
                <Tab
                  selected={status === 'InProgress'}
                  onClick={() => {
                    inProgressOrders.length > 0
                      ? navigate(`/order/${inProgressOrders[0].id}`)
                      : navigate(`/`);
                    setStatus('InProgress');
                  }}
                >
                  In Progress
                  {inProgressOrders.length > 0 && (
                    <TabNumber selected={status === 'InProgress'}>
                      {inProgressOrders.length}
                    </TabNumber>
                  )}
                </Tab>
                <Tab
                  selected={status === 'Ready'}
                  onClick={() => {
                    readyOrders.length > 0
                      ? navigate(`/order/${readyOrders[0].id}`)
                      : navigate(`/`);
                    setStatus('Ready');
                  }}
                >
                  Ready
                  {readyOrders.length > 0 && (
                    <TabNumber selected={status === 'Ready'}>
                      {readyOrders.length}
                    </TabNumber>
                  )}
                </Tab>
              </Tabs>

              {!loading && (
                <OrderList
                  orders={displayingOrders}
                  subscribeToMore={subscribeToMoreOrders}
                />
              )}
            </SideBar>

            <Router>
              <Order path="/order/:orderId" />
            </Router>
          </OrderWrapper>
        );
      }}
    </Query>
  );
};

export default OrdersView;

const ORDERS_SUBSCRIPTION = gql`
  subscription getRestaurantOrders($restaurantId: ID!) {
    getRestaurantOrders(restaurantId: $restaurantId) {
      id
      orderNo
      dueAt
      total
      status
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

const GET_ORDERS = gql`
  query getOrders {
    getOrders {
      id
      orderNo
      dueAt
      total
      status
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

const OrderWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
  width: 100%;
  margin-top: 61px;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
  border-bottom: 1px solid var(--gallery);
`;

interface TabProps {
  selected?: boolean;
}
const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 20px 0;
  color: var(--osloGrey);
  cursor: pointer;
  font-size: 15px;
  border-bottom: 3px solid transparent;

  ${(props: TabProps) =>
    props.selected &&
    css`
      border-bottom: 3px solid ${Colours.oxfordBlue};
      background: var(--white);
      color: var(--oxfordBlue);
      font-weight: bold;
    `}
`;

const TabNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${Colours.osloGrey};
  color: ${Colours.white};
  padding: 4px 8px;
  border-radius: 3px;
  margin-left: 5px;
  font-size: 11px;

  ${(props: TabProps) =>
    props.selected &&
    css`
      background: ${Colours.oxfordBlue};
      color: ${Colours.white};
    `}
`;
