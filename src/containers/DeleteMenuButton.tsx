import React from 'react';
import gql from 'graphql-tag';
import {RESTAURANT_MENUS_DATA} from '../views/MenuBuilder';
import {navigate} from '@reach/router';
import DeleteButton from './DeleteButton';

const DeleteMenuButton = ({
  restaurantId,
  menuId,
}: {
  restaurantId: string;
  menuId: string;
}) => {
  const handleMenuDeleted = (cache: any, {data: {deleteMenu}}: any) => {
    const {menus} = cache.readFragment({
      id: `Restaurant:${restaurantId}`,
      fragment: RESTAURANT_MENUS_DATA,
      fragmentName: 'RestaurantMenus',
    });

    cache.writeFragment({
      id: `Restaurant:${restaurantId}`,
      fragment: RESTAURANT_MENUS_DATA,
      data: {
        menus: menus.filter((menu: any) => menu.id !== deleteMenu.id),
        __typename: 'Restaurant',
      },
      fragmentName: 'RestaurantMenus',
    });

    navigate('/menu-builder', {replace: true});
  };

  return (
    <DeleteButton
      mutation={DELETE_MENU}
      onDelete={handleMenuDeleted}
      variables={{menuId}}
    />
  );
};

export default DeleteMenuButton;

const DELETE_MENU = gql`
  mutation deleteMenu($menuId: ID!) {
    deleteMenu(menuId: $menuId) {
      id
      name
    }
  }
`;
