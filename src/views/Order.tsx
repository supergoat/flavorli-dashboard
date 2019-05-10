import React from 'react';

import styled from 'styled-components/macro';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import OrderItems from '../components/OrderItems';
import Button from '../ui/Button';
import Dietary from '../components/Dietary';
import UpdateOrderStatus from '../containers/UpdateOrderStatus';

interface Props {
  orderId?: string;
}
const Order = ({orderId}: Props) => {
  return (
    <Query query={GET_ORDER} variables={{id: orderId}}>
      {({loading, error, data: {getOrder}}: any) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <OrderWrapper>
            <OrderInfo>
              <OrderDueTime>
                <p>
                  Due at <span>{getOrder.dueAt}</span>
                </p>
              </OrderDueTime>
              <OrderId>
                <span>#</span>
                {getOrder.orderNo}
              </OrderId>
            </OrderInfo>
            <TimeBadge>
              {getOrder.status === 'InProgress' ? 'On Time' : getOrder.status}
            </TimeBadge>

            <Customer>
              <CustomerInfo>
                <Avatar />
                <div>
                  <CustomerName>{getOrder.customer.name}</CustomerName>
                  <Dietary dietary={['vegan']} />
                </div>
              </CustomerInfo>

              <OrderActions>
                <ContactCustomer>CONTACT CUSTOMER</ContactCustomer>
                <EditOrder secondary>EDIT ORDER</EditOrder>
              </OrderActions>
            </Customer>

            <OrderSummary>Order Summary</OrderSummary>

            <OrderItems items={getOrder.items} />
            <Total>
              <div>Total: </div>
              <div>£{getOrder.total}</div>
            </Total>
            <Actions>
              {getOrder.status === 'Pending' && (
                <>
                  <UpdateOrderStatus
                    orderId={getOrder.id}
                    status="Declined"
                    width="35%"
                    secondary
                  >
                    Decline Order
                  </UpdateOrderStatus>

                  <UpdateOrderStatus
                    orderId={getOrder.id}
                    status="InProgress"
                    width="55%"
                  >
                    Accept Order
                  </UpdateOrderStatus>
                </>
              )}

              {getOrder.status === 'InProgress' && (
                <>
                  <UpdateOrderStatus
                    orderId={getOrder.id}
                    status="Canceled"
                    width="35%"
                    danger
                  >
                    Cancel Order
                  </UpdateOrderStatus>

                  <UpdateOrderStatus
                    orderId={getOrder.id}
                    status="Ready"
                    width="55%"
                  >
                    Ready for Pickup
                  </UpdateOrderStatus>
                </>
              )}

              {getOrder.status === 'Ready' && (
                <>
                  <UpdateOrderStatus
                    orderId={getOrder.id}
                    status="NotDelivered"
                    width="35%"
                    secondary
                  >
                    Not Delivered
                  </UpdateOrderStatus>

                  <UpdateOrderStatus
                    orderId={getOrder.id}
                    status="Delivered"
                    width="55%"
                  >
                    Delivered
                  </UpdateOrderStatus>
                </>
              )}
            </Actions>
          </OrderWrapper>
        );
      }}
    </Query>
  );
};

export default Order;

const GET_ORDER = gql`
  query getOrder($id: ID!) {
    getOrder(id: $id) {
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
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
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
  font-size: 16px;
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
  font-size: 12px;
`;

const EditOrder = styled(Button)`
  font-size: 12px;
`;

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
