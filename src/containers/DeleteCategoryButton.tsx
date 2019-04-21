import React from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import styled from 'styled-components/macro';
import Colours from '../Colours';
import {MENU_CATEGORIES_DATA} from '../views/MenuBuilder';
import Button from '../ui/Button';
import {navigate} from '@reach/router';

const DeleteCategoryButton = ({
  menuId,
  categoryId,
}: {
  menuId: string;
  categoryId: string;
}) => {
  const handleDeleteMenuCategory = (deleteMenuCategory: any) => {
    deleteMenuCategory({
      variables: {
        categoryId,
      },
    });
  };

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

    navigate(`/menu-builder/${menuId}`, {replace: true});
  };

  return (
    <Mutation mutation={DELETE_MENU} update={handleMenuDeleted}>
      {(deleteMenuCategory: any, {loading, error}: any) => {
        return (
          <DeleteCategoryButtonWrapper>
            <DeleteButton
              onClick={() => handleDeleteMenuCategory(deleteMenuCategory)}
            >
              {loading ? 'Deleting...' : 'Delete Category'}
            </DeleteButton>
            <Error show={!!error}>Could not delete menu!</Error>
          </DeleteCategoryButtonWrapper>
        );
      }}
    </Mutation>
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

const DeleteCategoryButtonWrapper = styled.div`
  position: relative;
`;

const DeleteButton = styled(Button)`
  background: ${Colours.red};
  color: ${Colours.white};
`;

interface ErrorProps {
  show?: boolean;
}

const Error = styled.div`
  position: absolute;
  right: -7px;
  color: ${Colours.red};
  transition: all 400ms;
  width: 145px;
  font-size: 14px;
  margin-top: 5px;
  opacity: ${(props: ErrorProps) => (props.show ? 1 : 0)};
`;
