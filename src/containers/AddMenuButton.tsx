import React, {useState} from 'react';
import styled from 'styled-components/macro';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import Button from '../ui/Button';
import AddMenu from '../components/AddMenu';
import {RESTAURANT_MENUS_DATA} from '../views/MenuBuilder';
import useErrors from '../_utils/useErrors';
import {navigate} from '@reach/router';

const AddMenuButton = ({restaurantId}: {restaurantId: string}) => {
  const [addingMenu, setAddingMenu] = useState(false);
  const [errors, setErrors, clearErrors] = useErrors();

  const handleAddMenu = (menuName: string, addMenu: any) => {
    if (menuName.trim() === '') {
      setErrors([['name', 'required']]);
      return;
    }

    addMenu({
      variables: {
        name: menuName,
        restaurantId,
      },
    });
  };

  const handleMenuAdded = (cache: any, {data: {addMenu}}: any) => {
    const {menus} = cache.readFragment({
      id: `Restaurant:${restaurantId}`,
      fragment: RESTAURANT_MENUS_DATA,
      fragmentName: 'RestaurantMenus',
    });

    cache.writeFragment({
      id: `Restaurant:${restaurantId}`,
      fragment: RESTAURANT_MENUS_DATA,
      data: {
        menus: [addMenu, ...menus],
        __typename: 'Restaurant',
      },
      fragmentName: 'RestaurantMenus',
    });

    setAddingMenu(false);
    navigate(`/menu-builder/menu/${addMenu.id}`);
  };

  return (
    <Mutation
      mutation={ADD_MENU}
      update={handleMenuAdded}
      onError={() => {
        setErrors([['name', 'Something went wrong! Could not create menu!']]);
      }}
    >
      {(addMenu: any, {loading}: any) => {
        return (
          <AddMenuButtonWrapper>
            <Button width="100%" onClick={() => setAddingMenu(true)}>
              Add Menu
            </Button>

            {addingMenu && (
              <AddMenu
                onCancel={() => {
                  setAddingMenu(false);
                  clearErrors(['name']);
                }}
                onAdd={menuName => handleAddMenu(menuName, addMenu)}
                errors={errors}
                onClearErrors={clearErrors}
              />
            )}
          </AddMenuButtonWrapper>
        );
      }}
    </Mutation>
  );
};

export default AddMenuButton;

const ADD_MENU = gql`
  mutation addMenu($name: String!, $restaurantId: ID!) {
    addMenu(name: $name, restaurantId: $restaurantId) {
      id
      name
      serviceTimes {
        id
        hours
        days
      }
      categories {
        id
        name
      }
    }
  }
`;

const AddMenuButtonWrapper = styled.div`
  padding: 20px;
`;
