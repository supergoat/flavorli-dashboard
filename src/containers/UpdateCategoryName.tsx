import React, {useState, useEffect} from 'react';
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
  const [hasBeenEdited, setHasBeenEdited] = useState(false);
  const [error, setError] = useState('');

  /**
   * Update name, when the name prop changes. This is needed when navigating
   * between categories because the component doesn't not re-render therefore the
   * name remains stale
   */
  useEffect(() => {
    setHasBeenEdited(false);
    setName(categoryName);
  }, [categoryName]);

  const handleUpdate = (
    updateMenuCategory: MutationFn<any, {name: string}>,
  ) => {
    if (name.trim() === '') return setError('Name cannot be blank');

    updateMenuCategory();
  };

  const handleNameChange = (e: any) => {
    const value = e.target.value;
    setError('');
    setName(value);
    setHasBeenEdited(value !== categoryName);
  };

  return (
    <Mutation
      mutation={UPDATE_CATEGORY_NAME}
      variables={{categoryId, name}}
      onError={() => {
        setError('Something went wrong, unable to save');
      }}
    >
      {(updateMenuCategory: any, {loading}: any) => {
        return (
          <UpdateCategoryNameWrapper>
            <NameInput>
              <input
                value={name}
                onChange={handleNameChange}
                placeholder="Name"
              />

              <OptionError show={!!error}>{error}</OptionError>
            </NameInput>

            <ConfirmButtons
              show={hasBeenEdited}
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

interface ErrorProps {
  show?: boolean;
}
const OptionError = styled(Error)`
  margin-top: 0;
  max-height: ${(props: ErrorProps) => (props.show ? '15px' : '0')};
`;
