import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {RouteComponentProps, Router} from '@reach/router';
import styled, {keyframes} from 'styled-components/macro';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import Menu from './Menu';
import Category from './Category';
import MenuList from '../components/MenuList';
import Colours from '../Colours';

import AddMenuButton from '../containers/AddMenuButton';
import MenuItem from './MenuItem';

interface Props extends RouteComponentProps {}
const MenuBuilder = (_: Props) => {
  return (
    <Query query={GET_RESTAURANT}>
      {({loading, error, data: {getRestaurant}}: any) => {
        if (error) return `Error! ${error.message}`;

        return (
          <MenuBuilderWrapper>
            <Navbar />
            <SideBar>
              <AddMenuButton restaurantId={getRestaurant && getRestaurant.id} />

              {loading ? (
                <MenuListLoading>
                  <MenuListLoadingItem />

                  <MenuListLoadingItem />
                  <MenuListLoadingItem />
                </MenuListLoading>
              ) : (
                <MenuList menuList={getRestaurant.menus} />
              )}
            </SideBar>

            <RouterWrapper>
              <Menu path="/menu/:menuId" />
              <Category path="/menu/:menuId/category/:categoryId" />
              <MenuItem path="/menu/:menuId/category/:categoryId/menuItem/:menuItemId" />
            </RouterWrapper>
          </MenuBuilderWrapper>
        );
      }}
    </Query>
  );
};

export default MenuBuilder;

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

const GET_RESTAURANT = gql`
  query getRestaurant {
    getRestaurant {
      id
      ...RestaurantMenus
    }
  }
  ${RESTAURANT_MENUS_DATA}
`;

const MenuBuilderWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
  width: 100%;
  margin-top: 61px;
`;

const RouterWrapper = styled(Router)`
  display: flex;
  justify-content: center;
  flex: 1;
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
