import React from 'react';
import gql from 'graphql-tag';
import {MENU_CATEGORIES_DATA} from '../views/MenuBuilder';
import DeleteButton from './DeleteButton';
import {navigate} from '@reach/router';

const DeleteCategoryButton = ({
  menuId,
  categoryId,
}: {
  menuId: string;
  categoryId: string;
}) => {
  const handleMenuDeleted = (cache: any, {data: {deleteMenuCategory}}: any) => {
    const {categories} = cache.readFragment({
      id: `Menu:${menuId}`,
      fragment: MENU_CATEGORIES_DATA,
    });

    cache.writeFragment({
      id: `Menu:${menuId}`,
      fragment: MENU_CATEGORIES_DATA,
      data: {
        categories: categories.filter(
          (category: any) => category.id !== deleteMenuCategory.id,
        ),
        __typename: 'Menu',
      },
    });

    navigate(`/menu-builder/menu/${menuId}`, {replace: true});
  };

  return (
    <DeleteButton
      mutation={DELETE_MENU}
      onDelete={handleMenuDeleted}
      variables={{categoryId}}
    />
  );
};

export default DeleteCategoryButton;

const DELETE_MENU = gql`
  mutation deleteMenuCategory($categoryId: ID!) {
    deleteMenuCategory(categoryId: $categoryId) {
      id
      name
    }
  }
`;
