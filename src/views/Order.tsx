import React from 'react';
import {RouteComponentProps} from '@reach/router';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import Order from '../components/Order';

interface Props extends RouteComponentProps {
  orderId?: string;
}
const OrderView = ({orderId}: Props) => {
  return (
    <Query query={GET_ORDER} variables={{id: orderId}}>
      {({loading, error, data: {getOrder}}: any) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return <Order order={getOrder} />;
      }}
    </Query>
  );
};

export default OrderView;

const GET_ORDER = gql`
  query getOrder($id: ID!) {
    getOrder(id: $id) {
      id
      orderNo
      dueAt
      total
      status
      priceAdjustment
      delayedBy
      cancelReason
      priceAdjustmentReason
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
