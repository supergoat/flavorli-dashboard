import React, {useState} from 'react';
import styled from 'styled-components/macro';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import Button from '../ui/Button';
import AddMenu from '../components/AddMenu';
import {RESTAURANT_MENUS_DATA} from '../views/MenuBuilder';

// TODO: Use correct restaurant id

const AddMenuButton = ({restaurantId}: {restaurantId: string}) => {
  const [addingMenu, setAddingMenu] = useState(false);
  const [errors, setErrors] = useState<Map<string, string>>(new Map());

  const handleAddMenu = (menuName: string, addMenu: any) => {
    if (menuName.trim() === '') {
      setError('name', 'required');
      return;
    }

    addMenu({
      variables: {
        name: menuName,
        restaurantId,
      },
    });
  };

  const setError = (key: string, value: string) => {
    let errors: Map<string, string> = new Map();
    errors.set(key, value);
    setErrors(errors);
  };

  const handleClearError = (error: string) => {
    const copyErrors = new Map(errors);
    copyErrors.delete(error);
    setErrors(copyErrors);
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
  };

  return (
    <Mutation
      mutation={ADD_MENU}
      update={handleMenuAdded}
      onError={() => {
        setError('name', 'Something went wrong! Could not create menu!');
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
                  handleClearError('name');
                }}
                onAdd={menuName => handleAddMenu(menuName, addMenu)}
                errors={errors}
                onClearError={handleClearError}
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
