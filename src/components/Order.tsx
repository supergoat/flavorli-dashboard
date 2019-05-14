import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components/macro';
import OrderItems from '../components/OrderItems';
import Button from '../ui/Button';
import Dietary from '../components/Dietary';
import UpdateOrder from '../containers/UpdateOrder';
import SelectTime from '../components/SelectTime';
import isValidPrice from '../_utils/isValidPrice';
import calculateTextAreaRows from '../_utils/calculateTextAreaRows';
import Label from '../ui/Label';
import Error from '../ui/Error';
import {formatTime} from '../_utils/formatTime';

const Order = ({order}: {order: any}) => {
  const textAreaEl: any = useRef();
  useEffect(() => calculateTextAreaRows({textAreaEl, minRows: 2}));

  const [showDelayOrder, setShowDelayOrder] = useState(false);
  const [showPriceAdjustment, setShowPriceAdjustment] = useState(false);
  const [price, setPrice] = useState(order.priceAdjustment);
  const [reason, setReason] = useState('');
  const [priceError, setPriceError] = useState('');

  const [selectedTime, setSelectedTime] = useState(order.delayedBy);

  const handleReasonChange = (event: any) => {
    calculateTextAreaRows({textAreaEl, minRows: 2});
    setReason(event.target.value);
  };

  let dueAt = new Date(order.dueAt);
  dueAt.setMinutes(dueAt.getMinutes() + order.delayedBy);

  return (
    <OrderWrapper>
      <OrderInfo>
        <OrderDueTime>
          <p>
            Due at <span>{formatTime(dueAt)}</span>
          </p>
        </OrderDueTime>
        <OrderId>
          <span>#</span>
          {order.orderNo}
        </OrderId>
      </OrderInfo>
      <TimeBadge>
        {order.status === 'InProgress' && !order.delayedBy && 'On Time'}
        {order.status === 'InProgress' && !!order.delayedBy && 'Delayed'}
        {order.status !== 'InProgress' && 'On Time'}
      </TimeBadge>

      <Customer>
        <CustomerInfo>
          <Avatar />
          <div>
            <CustomerName>{order.customer.name}</CustomerName>
            <CustomerTel>{order.customer.tel}</CustomerTel>
            <Dietary dietary={['vegan']} />
          </div>
        </CustomerInfo>

        <OrderActions>
          {order.status === 'InProgress' && (
            <DelayOrder
              delayed={order.delayedBy}
              secondary
              onClick={() => setShowDelayOrder(true)}
            >
              {order.delayedBy
                ? `DELAYED ${order.delayedBy} MIN`
                : 'DELAY ORDER'}
            </DelayOrder>
          )}
          {order.status === 'InProgress' && (
            <AdjustPrice secondary onClick={() => setShowPriceAdjustment(true)}>
              {order.priceAdjustment !== '0'
                ? `PRICE ${
                    order.priceAdjustment >= 0 ? 'INCREASED' : 'DECREASED'
                  } BY £${Number(order.priceAdjustment).toFixed(2)}`
                : ' ADJUST PRICE'}
            </AdjustPrice>
          )}
        </OrderActions>
      </Customer>

      {showDelayOrder && (
        <BackDrop>
          <Modal>
            <Heading>Delay Order</Heading>
            <Label>How long do you need?</Label>
            <SelectTime
              onSelect={(time: string) => setSelectedTime(time)}
              selectedTime={selectedTime}
            />

            <Actions>
              <Button
                secondary
                width="35%"
                onClick={() => {
                  setShowDelayOrder(false);
                  setSelectedTime(order.delayedBy);
                }}
              >
                Cancel
              </Button>

              <UpdateOrder
                onUpdate={() => setShowDelayOrder(false)}
                orderId={order.id}
                delayedBy={selectedTime}
                width="60%"
              >
                Notify Customer
              </UpdateOrder>
            </Actions>
          </Modal>
        </BackDrop>
      )}

      {showPriceAdjustment && (
        <BackDrop>
          <Modal>
            <Heading> Adjust Price</Heading>
            <Label>Adjustment amount</Label>

            <Price>
              <input
                id="menu-item-price"
                onBlur={() => setPriceError(price !== '' ? '' : 'Required')}
                value={price}
                onChange={(e: any) => {
                  const str = e.target.value;
                  if (isValidPrice(str)) {
                    setPriceError('');
                    setPrice(str);
                  }
                }}
              />
            </Price>
            <Error show={!!priceError}>{priceError}</Error>

            <Label>Reason for price adjusment</Label>
            <ReasonForPriceAdjustment
              value={reason}
              ref={textAreaEl}
              onChange={handleReasonChange}
            />

            <AdjustedTotal>
              <div>Previous Total:</div>
              <div>£{order.total}</div>
            </AdjustedTotal>

            <AdjustedTotal>
              <div>New Total:</div>
              <div>
                £
                {(
                  Number(order.total) + Number(price === '-' ? -0 : price)
                ).toFixed(2)}
              </div>
            </AdjustedTotal>

            <Actions>
              <Button
                secondary
                width="35%"
                onClick={() => {
                  setShowPriceAdjustment(false);
                  setPrice(order.priceAdjustment);
                }}
              >
                Cancel
              </Button>

              <UpdateOrder
                orderId={order.id}
                onUpdate={() => setShowPriceAdjustment(false)}
                priceAdjustment={price}
                width="60%"
              >
                Notify Customer
              </UpdateOrder>
            </Actions>
          </Modal>
        </BackDrop>
      )}

      <OrderSummary>Order Summary</OrderSummary>

      <OrderItems items={order.items} />
      <Total>
        <div>Total: </div>
        <div>
          £
          {(Number(order.total) + Number(price === '-' ? -0 : price)).toFixed(
            2,
          )}
        </div>
      </Total>
      <Actions>
        {order.status === 'Pending' && (
          <>
            <UpdateOrder
              orderId={order.id}
              status="Declined"
              width="35%"
              secondary
            >
              Decline Order
            </UpdateOrder>

            <UpdateOrder orderId={order.id} status="InProgress" width="55%">
              Accept Order
            </UpdateOrder>
          </>
        )}

        {order.status === 'InProgress' && (
          <>
            <UpdateOrder
              orderId={order.id}
              status="Canceled"
              width="35%"
              danger
            >
              Cancel Order
            </UpdateOrder>

            <UpdateOrder orderId={order.id} status="Ready" width="55%">
              Ready for Pickup
            </UpdateOrder>
          </>
        )}

        {order.status === 'Ready' && (
          <>
            <UpdateOrder
              orderId={order.id}
              status="NotCollected"
              width="35%"
              secondary
            >
              Not Collected
            </UpdateOrder>

            <UpdateOrder orderId={order.id} status="Collected" width="55%">
              Collected
            </UpdateOrder>
          </>
        )}
      </Actions>
    </OrderWrapper>
  );
};

export default Order;

const OrderWrapper = styled.div`
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
  margin-top: 30px;
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

interface DelayOrderProps {
  delayed?: boolean;
}
const DelayOrder = styled(Button)`
  margin-bottom: 15px;
  font-size: 12px;
  margin-bottom: 10px;
  box-shadow: none;
  border: ${(props: DelayOrderProps) =>
    props.delayed ? '1px solid var(--darkRed)' : '1px solid var(--osloGrey)'};
  color: ${(props: DelayOrderProps) =>
    props.delayed ? 'var(--darkRed)' : '(--oxfordBlue)'};
  cursor: pointer;
`;

const AdjustPrice = styled(Button)`
  font-size: 12px;
  width: 155px;
  box-shadow: none;
  border: 1px solid var(--osloGrey);
  cursor: pointer;
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
  font-size: 22px;
  border: 1px solid var(--osloGrey);
  border-radius: 3px;
  padding: 5px 10px;

  &:before {
    content: '£';
  }

  input {
    margin-left: 5px;
    width: 100%;
    font-size: 20px;
    outline: none;
    border: none;
  }
`;

const ReasonForPriceAdjustment = styled.textarea`
  width: 100%;
  font-size: 18px;
  outline: none;
  border: 1px solid var(--osloGrey);
  border-radius: 3px;
  margin: 20px 0;
  padding: 5px;
  resize: none;
  max-height: 100px;
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
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  padding-top: 15%;
  z-index: 1;
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
  font-size: 25px;
  margin-bottom: 10px;
`;

const SubHeading = styled.h3`
  margin-bottom: 10px;
`;

const AdjustedTotal = styled.h3`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
`;
