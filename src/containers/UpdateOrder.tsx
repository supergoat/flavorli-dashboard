import React, {useState} from 'react';
import {navigate} from '@reach/router';
import styled from 'styled-components/macro';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import Button from '../ui/Button';
import Error from '../ui/Error';

const UpdateOrder = ({
  orderId,
  onUpdate = () => {},
  status,
  delayedBy,
  priceAdjustment,
  width,
  danger,
  success,
  secondary,
  children,
}: {
  orderId: string;
  onUpdate?: () => void;
  status?: string;
  delayedBy?: number;
  priceAdjustment?: string;
  width: string;
  danger?: boolean;
  success?: boolean;
  secondary?: boolean;
  children: any;
}) => {
  const [error, setError] = useState('');

  const variables: any = {orderId};

  if (status !== undefined) variables.status = status;
  if (priceAdjustment !== undefined)
    variables.priceAdjustment = priceAdjustment;
  if (delayedBy !== undefined) variables.delayedBy = delayedBy;

  return (
    <UpdateOrderWrapper width={width}>
      <Mutation
        mutation={UPDATE_ORDER}
        variables={variables}
        onCompleted={() => {
          status && navigate('/');
          onUpdate();
        }}
        onError={() => setError('Could not update')}
      >
        {(updateOrder: any, {loading}: any) => {
          return (
            <Button
              onClick={() => updateOrder()}
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
  ) {
    updateOrder(
      orderId: $orderId
      status: $status
      priceAdjustment: $priceAdjustment
      delayedBy: $delayedBy
    ) {
      id
      status
      priceAdjustment
      delayedBy
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
