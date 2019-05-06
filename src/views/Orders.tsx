import React, {useState} from 'react';
import gql from 'graphql-tag';
import {Query, Subscription} from 'react-apollo';
import {RouteComponentProps, Router} from '@reach/router';
import styled, {css} from 'styled-components/macro';
import Order from './Order';
import SideBar from '../components/SideBar';
import Navbar from '../components/Navbar';
import Colours from '../Colours';
import OrderList from '../containers/OrderList';

// restaurantId={'cjumsnzj9001d0707xfdi5lbe'}

interface Props extends RouteComponentProps {}
const OrdersView = (_: Props) => {
  const [newOrders, setNewOrders] = useState(0);
  const [inProgressOrders, setInProgressOrders] = useState(0);
  const [readyOrders, setReadyOrders] = useState(0);
  const [status, setStatus] = useState('Pending');

  return (
    <Query
      query={GET_ORDERS}
      variables={{status}}
      fetchPolicy="cache-and-network"
      onCompleted={({getOrders}: any) => {
        if (status === 'Pending') setNewOrders(getOrders.length);
        if (status === 'InProgress') setInProgressOrders(getOrders.length);
        if (status === 'Ready') setReadyOrders(getOrders.length);
      }}
    >
      {({loading, error, data: {getOrders}, subscribeToMore}: any) => {
        const subscribeToMoreOrders = () =>
          subscribeToMore({
            document: ORDERS_SUBSCRIPTION,
            variables: {restaurantId: 'cjumsnzj9001d0707xfdi5lbe'},
            updateQuery: (prev: any, {subscriptionData}: any) => {
              setNewOrders(newOrders + 1);
              if (status !== 'Pending') return;
              if (!subscriptionData.data) return prev;
              const newOrder = subscriptionData.data.getRestaurantOrders;

              return Object.assign({}, prev, {
                getOrders: [newOrder, ...prev.getOrders],
              });
            },
          });

        return (
          <OrderWrapper>
            <Navbar />
            <SideBar>
              <Tabs>
                <Tab
                  selected={status === 'Pending'}
                  onClick={() => setStatus('Pending')}
                >
                  New {newOrders > 0 && <TabNumber> {newOrders}</TabNumber>}
                </Tab>
                <Tab
                  selected={status === 'InProgress'}
                  onClick={() => setStatus('InProgress')}
                >
                  In Progress
                  {inProgressOrders > 0 && (
                    <TabNumber>{inProgressOrders}</TabNumber>
                  )}
                </Tab>
                <Tab
                  selected={status === 'Ready'}
                  onClick={() => setStatus('Ready')}
                >
                  Ready
                  {readyOrders > 0 && <TabNumber>{readyOrders}</TabNumber>}
                </Tab>
              </Tabs>

              {!loading && (
                <OrderList
                  orders={getOrders}
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
  query getOrders($status: String) {
    getOrders(status: $status) {
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
  border-bottom: 1px solid var(--gallery);
  cursor: pointer;
  font-size: 15px;

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
  background: ${Colours.oxfordBlue};
  color: ${Colours.white};
  padding: 4px 8px;
  border-radius: 3px;
  margin-left: 5px;
  font-size: 11px;
`;
