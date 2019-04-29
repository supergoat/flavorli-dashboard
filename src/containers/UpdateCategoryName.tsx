import React, {useState} from 'react';
import gql from 'graphql-tag';
import {Mutation, MutationFn} from 'react-apollo';
import styled from 'styled-components/macro';
import ConfirmButtons from '../components/ConfirmButtons';
import Error from '../ui/Error';

const UpdateCategoryName = ({
  categoryName = '',
  categoryId,
}: {
  categoryName: string;
  categoryId: string;
}) => {
  const [name, setName] = useState(categoryName);
  const [error, setError] = useState('');

  const handleUpdate = (
    updateMenuCategory: MutationFn<any, {name: string}>,
  ) => {
    if (name.trim() === '') return setError('Name cannot be blank');

    updateMenuCategory();
  };

  return (
    <Mutation
      mutation={UPDATE_CATEGORY_NAME}
      variables={{categoryId, name}}
      onError={() => {
        setError('Could not save');
      }}
    >
      {(updateMenuCategory: any, {loading}: any) => {
        return (
          <UpdateCategoryNameWrapper>
            <NameInput>
              <input
                id="name"
                value={name}
                onChange={e => {
                  setError('');
                  setName(e.target.value);
                }}
                placeholder="Name"
              />

              <Error show={!!error}>{error}</Error>
            </NameInput>

            <ConfirmButtons
              show={name !== categoryName}
              saving={loading}
              onConfirm={() => handleUpdate(updateMenuCategory)}
              onCancel={() => setName(categoryName)}
            />
          </UpdateCategoryNameWrapper>
        );
      }}
    </Mutation>
  );
};

export default UpdateCategoryName;

const UPDATE_CATEGORY_NAME = gql`
  mutation updateMenuCategory($categoryId: ID!, $name: String) {
    updateMenuCategory(categoryId: $categoryId, name: $name) {
      id
      name
    }
  }
`;

const UpdateCategoryNameWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  input {
    font-size: 40px;
    width: 100%;
    outline: none;
    padding-top: 10px;
    border: none;
    font-weight: 300;
  }
`;

const NameInput = styled.div`
  width: 100%;
`;
