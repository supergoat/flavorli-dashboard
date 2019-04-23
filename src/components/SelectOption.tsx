import React, {useState} from 'react';
import styled from 'styled-components/macro';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Options from '../containers/Options';

const SelectOption = ({onAdd}: {onAdd: (value: any) => void}) => {
  const [value, setValue] = useState('');
  const [selectedOption, setSelectedOption] = useState(undefined);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <SelectOptionWrapper>
      <SearchOptions>
        <Input
          onChange={e => setValue(e.target.value)}
          onFocus={() => setShowOptions(true)}
          onBlur={(e: any) => setShowOptions(false)}
          value={value}
        />

        <Button
          width="30%"
          onClick={() => {
            onAdd(selectedOption);
            setValue('');
            setSelectedOption(undefined);
          }}
        >
          Add Option
        </Button>
      </SearchOptions>
      {showOptions && (
        <Options
          filter={value}
          onSelect={(option: any) => {
            setSelectedOption(option);
            setValue(option.name);
          }}
        />
      )}
    </SelectOptionWrapper>
  );
};

export default SelectOption;

const SelectOptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const SearchOptions = styled.div`
  display: flex;
  justify-content: space-between;

  ${Input} {
    width: 65%;
    font-weight: bold;
  }
`;
