import AddCategory from '../components/AddCategory';
import React, {useState} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import styled from 'styled-components/macro';
import Colours from '../Colours';
import {MENU_CATEGORIES_DATA} from '../views/MenuBuilder';

const AddCategoryButton = ({menuId}: {menuId: string}) => {
  const [addingCategory, setAddingCategory] = useState(false);
  const [errors, setErrors] = useState<Map<string, string>>(new Map());

  const handleAddMenu = (categoryName: string, addMenuCategory: any) => {
    if (categoryName.trim() === '') {
      setError('name', 'required');
      return;
    }

    addMenuCategory({
      variables: {
        name: categoryName,
        menuId,
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

  const handleCategoryAdded = (cache: any, {data: {addMenuCategory}}: any) => {
    const {categories} = cache.readFragment({
      id: `Menu:${menuId}`,
      fragment: MENU_CATEGORIES_DATA,
    });

    cache.writeFragment({
      id: `Menu:${menuId}`,
      fragment: MENU_CATEGORIES_DATA,
      data: {
        categories: [addMenuCategory, ...categories],
        __typename: 'Menu',
      },
    });

    setAddingCategory(false);
  };

  return (
    <Mutation
      mutation={ADD_CATEGORY}
      update={handleCategoryAdded}
      onError={() => {
        setError('name', 'Something went wrong! Could not create menu!');
      }}
    >
      {(addMenuCategory: any, {loading}: any) => {
        return (
          <>
            <AddButton onClick={() => setAddingCategory(true)}>
              ADD CATEGORY
            </AddButton>

            {addingCategory && (
              <AddCategory
                onCancel={() => {
                  setAddingCategory(false);
                  handleClearError('name');
                }}
                onAdd={categoryName =>
                  handleAddMenu(categoryName, addMenuCategory)
                }
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

export default AddCategoryButton;

const ADD_CATEGORY = gql`
  mutation addMenuCategory($name: String!, $menuId: ID!) {
    addMenuCategory(name: $name, menuId: $menuId) {
      id
      name
    }
  }
`;

const AddButton = styled.div`
  font-size: 14px;
  padding: 15px;
  font-weight: bold;
  cursor: pointer;
  background: ${Colours.alabaster};
  border-radius: 4px;
`;
