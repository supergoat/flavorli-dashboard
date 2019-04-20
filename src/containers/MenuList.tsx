import React from 'react';
import styled, {keyframes} from 'styled-components/macro';

import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import MenuList from '../components/MenuList';
import Colours from '../Colours';

const MenuListContainer = () => {
  return (
    <Query query={GET_RESTAURANT_MENUS}>
      {({loading, error, data}: any) => {
        if (loading)
          return (
            <MenuListLoading>
              <MenuListLoadingItem />

              <MenuListLoadingItem />
              <MenuListLoadingItem />
            </MenuListLoading>
          );
        if (error) return `Error! ${error.message}`;

        return <MenuList menuList={data.getRestaurant.menus} />;
      }}
    </Query>
  );
};

export default MenuListContainer;

export const MENU_CATEGORIES_DATA = gql`
  fragment MenuCategories on Menu {
    categories {
      id
      name
    }
  }
`;

export const RESTAURANT_MENUS_DATA = gql`
  fragment RestaurantMenus on Restaurant {
    menus {
      id
      name
      ...MenuCategories
    }
  }
  ${MENU_CATEGORIES_DATA}
`;

const GET_RESTAURANT_MENUS = gql`
  query getRestaurant {
    getRestaurant {
      id
      ...RestaurantMenus
    }
  }
  ${RESTAURANT_MENUS_DATA}
`;

const placeHolderShimmer = keyframes`
    0%{
        background-position: 100% 0
    }
    100%{
        background-position: -100% 0
    }
`;

const MenuListLoading = styled.div`
  padding: 8px 20px;
`;
const MenuListLoadingItem = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 3px;
  margin: 5px 0;
  background: linear-gradient(
    to right,
    ${Colours.gallery} 3%,
    ${Colours.alabaster} 20%,
    ${Colours.gallery} 30%
  );
  background-size: 200% 50px;
  animation: ${placeHolderShimmer} 1.5s linear forwards infinite;
  position: relative;
`;
