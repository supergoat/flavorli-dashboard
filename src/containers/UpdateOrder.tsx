import React, {useState} from 'react';
import styled from 'styled-components/macro';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import Button from '../ui/Button';
import Error from '../ui/Error';

const UpdateOrder = ({
  onUpdate = () => {},
  validator = () => true,
  variables,
  width,
  danger,
  success,
  secondary,
  children,
}: {
  onUpdate?: () => void;
  validator?: () => boolean;
  variables: any;
  width: string;
  danger?: boolean;
  success?: boolean;
  secondary?: boolean;
  children: any;
}) => {
  const [error, setError] = useState('');

  return (
    <UpdateOrderWrapper width={width}>
      <Mutation
        mutation={UPDATE_ORDER}
        variables={variables}
        onCompleted={onUpdate}
        onError={() => setError('Could not update')}
      >
        {(updateOrder: any, {loading}: any) => {
          return (
            <Button
              onClick={() => validator() && updateOrder()}
              danger={danger}
              success={success}
              width="100%"
              secondary={secondary}
            >
              {loading ? 'Updating...' : children}
            </Button>
          );
        }}
      </Mutation>
      <Error show={!!error}>{error}</Error>
    </UpdateOrderWrapper>
  );
};

export default UpdateOrder;

const UPDATE_ORDER = gql`
  mutation updateOrder(
    $orderId: ID!
    $status: String
    $priceAdjustment: String
    $delayedBy: Int
    $cancelReason: String
    $priceAdjustmentReason: String
  ) {
    updateOrder(
      orderId: $orderId
      status: $status
      priceAdjustment: $priceAdjustment
      delayedBy: $delayedBy
      cancelReason: $cancelReason
      priceAdjustmentReason: $priceAdjustmentReason
    ) {
      id
      status
      priceAdjustment
      delayedBy
      cancelReason
      priceAdjustmentReason
    }
  }
`;

interface UpdateOrderWrapperProps {
  width?: string;
}
const UpdateOrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${(props: UpdateOrderWrapperProps) => props.width || '100%'};
`;
