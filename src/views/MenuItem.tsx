import React from 'react';
import {RouteComponentProps} from '@reach/router';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import MenuItem from '../components/MenuItem';

interface Props extends RouteComponentProps {
  menuItemId?: string;
}
const MenuItemView = ({menuItemId}: Props) => {
  return (
    <Query query={GET_MENU_ITEM} variables={{menuItemId}}>
      {({loading, error, data: {getMenuItem, getOptions}}: any) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return <MenuItem menuItem={getMenuItem} options={getOptions} />;
      }}
    </Query>
  );
};

export default MenuItemView;

const GET_MENU_ITEM = gql`
  query getMenuItem($menuItemId: ID!) {
    getMenuItem(menuItemId: $menuItemId) {
      id
      name
      description
      price
      dietary
      options {
        id
        min
        max
        name
      }
    }
    getOptions(menuItemId: $menuItemId) {
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
