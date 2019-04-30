import React from 'react';
import {RouteComponentProps} from '@reach/router';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import UpsertMenuItem from '../containers/UpsertMenuItem';

interface Props extends RouteComponentProps {
  menuItemId?: string;
}
const MenuItemView = ({menuItemId}: Props) => {
  return (
    <Query query={GET_MENU_ITEM} variables={{menuItemId}}>
      {({loading, error, data: {getMenuItem, getOptions}}: any) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <UpsertMenuItem
            categoryId={getMenuItem.category.id}
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
      available
      category {
        id
      }
      options {
        id
        min
        max
        name
        items {
          id
          name
          price
        }
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
