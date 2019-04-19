import React, {useState} from 'react';
import styled from 'styled-components/macro';
import FormInput from './FormInput';
import Button from '../ui/Button';
import Colours from '../Colours';

const AddCategory = ({
  onCancel,
  onAdd,
  errors,
  onClearError,
}: {
  onCancel: () => void;
  onAdd: (value: string) => void;
  errors: Map<string, string>;
  onClearError: (error: string) => void;
}) => {
  const [value, setValue] = useState('');

  return (
    <AddCategoryWrapper>
      <FormInput
        label="Category Name"
        onChange={e => {
          setValue(e.target.value);
          onClearError('name');
        }}
        value={value}
        isRequiredError={errors.get('name') === 'required'}
        error={errors.get('name') !== 'required' ? errors.get('name') : ''}
      />

      <Actions>
        <Button width="35%" secondary onClick={onCancel}>
          Cancel
        </Button>
        <Button width="55%" onClick={() => onAdd(value)}>
          Add
        </Button>
      </Actions>
    </AddCategoryWrapper>
  );
};

export default AddCategory;

const AddCategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 5px 15px 15px;
  background: ${Colours.alabaster};
  border-radius: 4px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`;
