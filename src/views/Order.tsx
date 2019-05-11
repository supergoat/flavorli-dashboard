import React, {useState} from 'react';

import styled from 'styled-components/macro';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import OrderItems from '../components/OrderItems';
import Button from '../ui/Button';
import Dietary from '../components/Dietary';
import UpdateOrderStatus from '../containers/UpdateOrderStatus';
import SelectTime from '../components/SelectTime';

interface Props {
  orderId?: string;
}
const Order = ({orderId}: Props) => {
  const [showDelayOrder, setShowDelayOrder] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');

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
                  <CustomerTel>{getOrder.customer.tel}</CustomerTel>
                  <Dietary dietary={['vegan']} />
                </div>
              </CustomerInfo>

              <OrderActions>
                {getOrder.status === 'InProgress' && (
                  <DelayOrder secondary onClick={() => setShowDelayOrder(true)}>
                    DELAY ORDER
                  </DelayOrder>
                )}
                {getOrder.status === 'InProgress' && (
                  <AdjustPrice secondary>ADJUST PRICE</AdjustPrice>
                )}
              </OrderActions>
            </Customer>

            {showDelayOrder && (
              <BackDrop>
                <Modal>
                  <Heading>Delay Order</Heading>
                  <SubHeading>How long do you need?</SubHeading>
                  <SelectTime
                    onSelect={(time: string) => setSelectedTime(time)}
                    selectedTime={selectedTime}
                  />

                  <Actions>
                    <Button
                      secondary
                      width="35%"
                      onClick={() => setShowDelayOrder(false)}
                    >
                      Cancel
                    </Button>
                    <Button width="60%">Notify Customer</Button>
                  </Actions>
                </Modal>
              </BackDrop>
            )}

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
        tel
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
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
  padding: 20px 35px;
  width: 580px;
  background: var(--white);
  margin-top: 5px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
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

const CustomerTel = styled.p`
  margin-bottom: 5px;
  color: var(--osloGrey);
`;

const Avatar = styled.img`
  flex-shrink: 0;
  width: 70px;
  height: 70px;
  border-radius: 35px;
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

const DelayOrder = styled(Button)`
  margin-bottom: 15px;
  font-size: 12px;
  margin-bottom: 10px;
  box-shadow: none;
  border: 1px solid var(--osloGrey);
  cursor: pointer;
`;

const AdjustPrice = styled(Button)`
  font-size: 12px;
  width: 155px;
  box-shadow: none;
  border: 1px solid var(--osloGrey);
  cursor: pointer;
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

const BackDrop = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  padding-top: 15%;
`;

const Modal = styled.div`
  width: 400px;
  background: white;
  padding: 20px;
  border-radius: 3px;
  box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
  align-self: flex-start;
`;

const Heading = styled.h1`
  margin-bottom: 10px;
`;

const SubHeading = styled.h3`
  margin-bottom: 20px;
`;
