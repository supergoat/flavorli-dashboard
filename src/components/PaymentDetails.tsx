import React, {useEffect} from 'react';
import styled from 'styled-components/macro';
import Colours from '../Colours';

interface Props {
  isConnected: boolean;
  connectStripe: any;
  code?: string;
  state?: string;
  error?: string;
}

const RestaurantDetails = ({
  isConnected,
  connectStripe,
  code,
  state,
  error,
}: Props) => {
  useEffect(() => {
    if (code && state) {
      connectStripe({variables: {code, state}});
    }
  }, [code, state]);

  return (
    <PaymentDetailsWrapper>
      Payment Details
      {isConnected && (
        <a
          href="https://connect.stripe.com/oauth/authorize?response_type=code&client_id=ca_EqxkNeRrQaWelLWJqNz90JuuFWoYrn6J&scope=read_write&state=hello"
          target="__blank"
        >
          <StripeConnectIcon
            src={require('../assets/stripe/blue-on-light.png')}
            alt="stripe icon"
          />
        </a>
      )}
    </PaymentDetailsWrapper>
  );
};

export default RestaurantDetails;

const PaymentDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 3px;
  margin: 5px 0;
  width: 580px;
  background: ${Colours.white};
  padding: 10px 0;
`;

const StripeConnectIcon = styled.img`
  align-self: flex-start;
`;
