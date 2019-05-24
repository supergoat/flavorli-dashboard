import React, {useEffect, useState} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import {RouteComponentProps} from '@reach/router';
import {GET_RESTAURANT} from './MenuBuilder';
import {Query} from 'react-apollo';
import PaymentDetails from '../components/PaymentDetails';

interface Props extends RouteComponentProps {
  location?: any;
}
const PaymentDetailsView = ({location}: Props) => {
  const [stripeError, setStripeError] = useState('');
  const [stripeCode, setStripeCode] = useState('');
  const [stripeState, setStripeState] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    const hasError = urlParams.get('error');
    const errorDescription =
      urlParams.get('error_description') || 'Something went wrong';

    if (hasError) return setStripeError(decodeURI(errorDescription));

    if (code && state) {
      setStripeCode(code);
      setStripeState(state);
    }
  }, []);

  return (
    <Query
      query={GET_RESTAURANT}
      onError={() => {
        setStripeError(
          'Something went wrong! Could not connect account to stripe!',
        );
      }}
    >
      {({loading, _error, data: {getRestaurant}}: any) => {
        if (loading) return 'Loading...';

        return (
          <Mutation
            mutation={CONNECT_STRIPE}
            onError={() => {
              setStripeError(
                'Something went wrong! Could not connect account to stripe!',
              );
            }}
          >
            {(connectStripe: any, {loading}: any) => {
              return (
                <PaymentDetails
                  isConnected={getRestaurant.isConnected}
                  connectStripe={connectStripe}
                  error={stripeError}
                  code={stripeCode}
                  state={stripeState}
                />
              );
            }}
          </Mutation>
        );
      }}
    </Query>
  );
};

export default PaymentDetailsView;

const CONNECT_STRIPE = gql`
  mutation connectStripe($code: String!, $state: String!) {
    connectStripe(code: $code, state: $state) {
      id
      isConnected
    }
  }
`;
