import React from 'react';
import gql from 'graphql-tag';
import DeleteButton from './DeleteButton';
import {CATEGORY_ITEMS} from '../views/Category';
import {navigate} from '@reach/router';

const DeleteMenuItemButton = ({
  menuItemId,
  categoryId,
}: {
  menuItemId: string;
  categoryId?: string;
}) => {
  const handleMenuItemDeleted = (cache: any, {data: {deleteMenuItem}}: any) => {
    const {items} = cache.readFragment({
      id: `MenuCategory:${categoryId}`,
      fragment: CATEGORY_ITEMS,
    });

    cache.writeFragment({
      id: `MenuCategory:${categoryId}`,
      fragment: CATEGORY_ITEMS,
      data: {
        items: items.filter((item: any) => item.id !== deleteMenuItem.id),
        __typename: 'MenuCategory',
      },
    });

    navigate(`/menu-builder/category/${categoryId}`, {replace: true});
  };

  return (
    <DeleteButton
      mutation={DELETE_MENU}
      onDelete={handleMenuItemDeleted}
      variables={{menuItemId}}
    />
  );
};

export default DeleteMenuItemButton;

const DELETE_MENU = gql`
  mutation deleteMenuItem($menuItemId: ID!) {
    deleteMenuItem(menuItemId: $menuItemId) {
      id
      name
    }
  }
`;
