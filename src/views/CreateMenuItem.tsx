import React from 'react';
import {RouteComponentProps} from '@reach/router';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import MenuItem from '../components/MenuItem';

const menuItem = {
  name: '',
  description: '',
  price: 0.0,
  dietary: [],
  options: [],
};
interface Props extends RouteComponentProps {}
const CreateMenuItemView = (_: Props) => {
  return (
    <Query query={GET_OPTIONS}>
      {({loading, error, data: {getOptions}}: any) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return <MenuItem menuItem={menuItem} options={getOptions} />;
      }}
    </Query>
  );
};

export default CreateMenuItemView;

const GET_OPTIONS = gql`
  query getOptions {
    getOptions {
      id
      name
      min
      max
      items {
        id
        price
        name
      }
    }
  }
`;
