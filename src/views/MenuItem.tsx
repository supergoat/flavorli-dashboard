import React from 'react';
import {RouteComponentProps} from '@reach/router';
import gql from 'graphql-tag';
import {Query, Mutation} from 'react-apollo';
import UpsertMenuItem from '../containers/UpsertMenuItem';

const menuItem = {
  name: '',
  description: '',
  price: 0.0,
  dietary: [],
  options: [],
};

interface Props extends RouteComponentProps {
  menuItemId?: string;
  categoryId?: string;
}
const MenuItemView = ({menuItemId, categoryId}: Props) => {
  return (
    <Query query={GET_MENU_ITEM} variables={{menuItemId}}>
      {({loading, error, data: {getMenuItem, getOptions}}: any) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <UpsertMenuItem
            categoryId={categoryId}
            menuItem={getMenuItem}
            options={getOptions}
          />
        );
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
