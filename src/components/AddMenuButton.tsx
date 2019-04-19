import React, {useState} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import Button from '../ui/Button';
import AddMenu from './AddMenu';

const AddMenuButton = ({
  onAdd,
}: {
  onAdd: (menu: {name: string; id: string}) => void;
}) => {
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
        restaurantId: 'cjumsnzj9001d0707xfdi5lbe',
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

  return (
    <Mutation
      mutation={ADD_MENU}
      onCompleted={({addMenu}: {addMenu: {name: string; id: string}}) => {
        setAddingMenu(false);
        onAdd(addMenu);
      }}
      onError={() => {
        setError('name', 'Something went wrong! Could not create menu!');
      }}
    >
      {(addMenu: any, {loading}: any) => {
        return (
          <>
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
          </>
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
    }
  }
`;
