import React, {useState} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import Button from '../ui/Button';
import Error from '../ui/Error';

const UpdateOrder = ({
  orderId,
  status,
  width,
  danger,
  success,
  secondary,
  children,
}: {
  orderId: string;
  status: string;
  width: string;
  danger?: boolean;
  success?: boolean;
  secondary?: boolean;
  children: any;
}) => {
  const [error, setError] = useState('');

  return (
    <Mutation
      mutation={UPDATE_ORDER}
      variables={{orderId, status}}
      onError={() => setError('Could not update')}
    >
      {(updateOrder: any, {loading}: any) => {
        return (
          <>
            <Button
              width={width}
              onClick={() => updateOrder()}
              danger={danger}
              success={success}
              secondary={secondary}
            >
              {children}
            </Button>
            <Error show={!!error}>{error}</Error>
          </>
        );
      }}
    </Mutation>
  );
};

export default UpdateOrder;

const UPDATE_ORDER = gql`
  mutation updateOrder($orderId: ID!, $status: String) {
    updateOrder(orderId: $orderId, status: $status) {
      id
      status
    }
  }
`;
