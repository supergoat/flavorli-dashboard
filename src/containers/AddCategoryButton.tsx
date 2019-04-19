import AddCategory from '../components/AddCategory';
import React, {useState} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import styled from 'styled-components/macro';
import Colours from '../Colours';

const AddCategoryButton = ({
  onAdd,
}: {
  onAdd: (menu: {name: string; id: string}) => void;
}) => {
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
        menuId: 'cjuo9ux15003007624wikvr1x',
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
      mutation={ADD_CATEGORY}
      onCompleted={({
        addMenuCategory,
      }: {
        addMenuCategory: {name: string; id: string};
      }) => {
        setAddingCategory(false);
        onAdd(addMenuCategory);
      }}
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
