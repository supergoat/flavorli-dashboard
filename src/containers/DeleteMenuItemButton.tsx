import React from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import styled from 'styled-components/macro';
import Colours from '../Colours';
import {CATEGORY_ITEMS} from '../views/Category';
import Button from '../ui/Button';
import {navigate} from '@reach/router';

const DeleteMenuItemButton = ({
  menuItemId,
  categoryId,
}: {
  menuItemId: string;
  categoryId?: string;
}) => {
  const handleMenuDeleted = (cache: any, {data: {deleteMenuItem}}: any) => {
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
    <Mutation
      mutation={DELETE_MENU}
      variables={{menuItemId}}
      update={handleMenuDeleted}
    >
      {(deleteMenuItem: any, {loading, error}: any) => {
        return (
          <DeleteMenuItemButtonWrapper>
            <DeleteButton onClick={deleteMenuItem}>
              {loading ? 'DELETING...' : 'DELETE ITEM'}
            </DeleteButton>
            <Error show={!!error}>Could not delete menu item!</Error>
          </DeleteMenuItemButtonWrapper>
        );
      }}
    </Mutation>
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

const DeleteMenuItemButtonWrapper = styled.div`
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
