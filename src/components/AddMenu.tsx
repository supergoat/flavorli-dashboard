import React, {useState} from 'react';
import styled from 'styled-components/macro';
import FormInput from './FormInput';
import Button from '../ui/Button';
import Colours from '../Colours';

const AddMenu = ({
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
    <AddMenuWrapper>
      <FormInput
        label="Menu Name"
        onChange={e => {
          setValue(e.target.value);
          onClearError('name');
        }}
        isRequiredError={errors.get('name') === 'required'}
        value={value}
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
    </AddMenuWrapper>
  );
};

export default AddMenu;

const AddMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  background: ${Colours.alabaster};
  border-radius: 4px;
  margin-top: 30px;
`;

const Actions = styled.div`
  display: flex;
  justify-content: space-between;
`;
