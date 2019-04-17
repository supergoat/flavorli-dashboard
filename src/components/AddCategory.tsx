import React from 'react';
import styled from 'styled-components/macro';
import FormInput from './FormInput';
import Button from '../ui/Button';
import Colours from '../Colours';

const AddCategory = ({onCancel}: {onCancel: () => void}) => {
  return (
    <AddCategoryWrapper>
      <FormInput label="Category Name" onChange={() => {}} value={''} />
      <Actions>
        <Button width="35%" secondary onClick={onCancel}>
          Cancel
        </Button>
        <Button width="55%">Add</Button>
      </Actions>
    </AddCategoryWrapper>
  );
};

export default AddCategory;

const AddCategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background: ${Colours.alabaster};
  border-radius: 4px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`;
