import React from 'react';
import {RouteComponentProps} from '@reach/router';
import {GET_RESTAURANT} from './MenuBuilder';
import {Query} from 'react-apollo';
import RestaurantDetails from '../components/RestaurantDetails';

interface Props extends RouteComponentProps {}
const RestaurantDetailsView = (_: Props) => {
  return (
    <Query query={GET_RESTAURANT}>
      {({loading, error, data: {getRestaurant}}: any) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        return <RestaurantDetails restaurant={getRestaurant} />;
      }}
    </Query>
  );
};

export default RestaurantDetailsView;
