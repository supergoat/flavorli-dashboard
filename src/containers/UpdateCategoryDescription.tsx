import React, {useState, useEffect, useRef} from 'react';
import gql from 'graphql-tag';
import {Mutation, MutationFn} from 'react-apollo';
import styled from 'styled-components/macro';
import ConfirmButtons from '../components/ConfirmButtons';
import Error from '../ui/Error';
import calculateTextAreaRows from '../_utils/calculateTextAreaRows';

const UpdateCategoryDescription = ({
  categoryDescription = '',
  categoryId,
}: {
  categoryDescription: string;
  categoryId: string;
}) => {
  const textAreaEl: any = useRef();
  useEffect(() => calculateTextAreaRows(textAreaEl));

  const [description, setDescription] = useState(categoryDescription);
  const [error, setError] = useState('');

  const handleDescriptionChange = (event: any) => {
    calculateTextAreaRows(textAreaEl);
    setDescription(event.target.value);
  };

  const handleUpdate = (
    updateMenuCategory: MutationFn<any, {description: string}>,
  ) => {
    updateMenuCategory();
  };

  return (
    <Mutation
      mutation={UPDATE_CATEGORY_DESCRIPTION}
      variables={{categoryId, description}}
      onError={() => {
        setError('Something went wrong, unable to save');
      }}
    >
      {(updateMenuCategory: any, {loading}: any) => {
        return (
          <UpdateCategoryDescriptionWrapper>
            <DescriptionInput>
              <textarea
                ref={textAreaEl}
                onChange={handleDescriptionChange}
                value={description}
                placeholder="Description"
              />

              <ConfirmButtons
                show={description !== categoryDescription}
                saving={loading}
                onConfirm={() => handleUpdate(updateMenuCategory)}
                onCancel={() => setDescription(categoryDescription)}
              />
            </DescriptionInput>

            <Error show={!!error}>{error}</Error>
          </UpdateCategoryDescriptionWrapper>
        );
      }}
    </Mutation>
  );
};

export default UpdateCategoryDescription;

const UPDATE_CATEGORY_DESCRIPTION = gql`
  mutation updateMenuCategory($categoryId: ID!, $description: String) {
    updateMenuCategory(categoryId: $categoryId, description: $description) {
      id
      description
    }
  }
`;

const UpdateCategoryDescriptionWrapper = styled.div`
  margin-bottom: 20px;

  textarea {
    font-size: 20px;
    outline: none;
    resize: none;
    padding-bottom: 10px;
    width: 100%;
    border: none;
  }
`;

const DescriptionInput = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;
