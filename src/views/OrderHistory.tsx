import React, {useState} from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {RouteComponentProps} from '@reach/router';
import styled from 'styled-components/macro';
import OrderItems from '../components/OrderItems';
import Navbar from '../containers/Navbar';
import SideBar from '../components/SideBar';

import Colours from '../Colours';

interface Props extends RouteComponentProps {}

const OrderHistory = (_: Props) => {
  const [selectedOrderId, setSelectedOrderId] = useState('');
  return (
    <OrderHistoryWrapper>
      <Navbar />
      <SideBar />
      <Orders>
        <Heading>Order History</Heading>

        <Query query={GET_ORDER_HISTORY}>
          {({loading, error, data: {getOrderHistory}}: any) => {
            if (loading) return 'Loading...';
            if (error) return 'Something went wrong...';

            return (
              <>
                {getOrderHistory.map((order: any) => {
                  return (
                    <Order
                      key={order.id}
                      onClick={() =>
                        selectedOrderId === order.id
                          ? setSelectedOrderId('')
                          : setSelectedOrderId(order.id)
                      }
                    >
                      <OrderSummary>
                        <Status>
                          <p>{order.status}</p>
                          <p>{order.dueAt}</p>
                        </Status>

                        <Customer>
                          <Avatar />
                          <p>{order.customer.name}</p>
                        </Customer>

                        <OrderId>#000{order.orderNo}</OrderId>
                        <OrderTotal>£{order.total}</OrderTotal>
                      </OrderSummary>

                      {selectedOrderId === order.id && (
                        <OrderDetails>
                          <OrderItems items={order.items} />
                          <Total>
                            <div>Total: </div>
                            <div>£10.00</div>
                          </Total>
                        </OrderDetails>
                      )}
                    </Order>
                  );
                })}
              </>
            );
          }}
        </Query>
      </Orders>
    </OrderHistoryWrapper>
  );
};

export default OrderHistory;

const GET_ORDER_HISTORY = gql`
  query getOrderHistory {
    getOrderHistory {
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

const OrderHistoryWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
  width: 100%;
  margin-top: 61px;
`;
const Orders = styled.div`
  display: flex;
  flex-direction: column;
  width: 580px;
  padding: 10px 0;
`;

const Heading = styled.h1`
  font-size: 30px;
  margin-bottom: 20px;
`;

const Order = styled.div`
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  cursor: pointer;
  user-select: none;
  margin: 5px 0;
`;

const OrderSummary = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px;
`;

const Customer = styled.div`
  display: flex;
  align-items: center;
  width: 40%;
`;

const Avatar = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background: grey;
  margin-right: 10px;
`;

const Status = styled.div`
  width: 20%;
`;

const OrderId = styled.div`
  width: 20%;
`;
const OrderTotal = styled.div`
  width: 10%;
  text-align: right;
`;

const OrderDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 20px 30px 25%;
  background: ${Colours.alabaster};
`;

const Total = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 15px;
  font-weight: 500;
  padding-left: 10%;
`;
