import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import MenuList from '../components/MenuList';

const MenuListContainer = () => {
  return (
    <Query query={GET_RESTAURANT_MENUS}>
      {({loading, error, data}: any) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return <MenuList menuList={data.getRestaurant.menus} />;
      }}
    </Query>
  );
};

export default MenuListContainer;

const GET_RESTAURANT_MENUS = gql`
  query getRestaurant {
    getRestaurant {
      menus {
        id
        name
        categories {
          id
          name
        }
      }
    }
  }
`;
