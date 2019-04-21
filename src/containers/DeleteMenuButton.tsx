import React from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import styled from 'styled-components/macro';
import Colours from '../Colours';
import {RESTAURANT_MENUS_DATA} from '../views/MenuBuilder';
import Button from '../ui/Button';
import {navigate} from '@reach/router';

const DeleteMenuButton = ({
  restaurantId,
  menuId,
}: {
  restaurantId: string;
  menuId: string;
}) => {
  const handleDeleteMenu = (deleteMenu: any) => {
    deleteMenu({
      variables: {
        menuId,
      },
    });
  };

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
    <Mutation mutation={DELETE_MENU} update={handleMenuDeleted}>
      {(deleteMenu: any, {loading, error}: any) => {
        return (
          <DeleteMenuButtonWrapper>
            <DeleteButton onClick={() => handleDeleteMenu(deleteMenu)}>
              {loading ? 'DELETING...' : 'DELETE MENU'}
            </DeleteButton>
            <Error show={!!error}>Could not delete menu!</Error>
          </DeleteMenuButtonWrapper>
        );
      }}
    </Mutation>
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

const DeleteMenuButtonWrapper = styled.div`
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
