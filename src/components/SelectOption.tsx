import React, {useState} from 'react';
import styled from 'styled-components/macro';
import Button from '../ui/Button';
import Input from '../ui/Input';
import AvailableOptions from './AvailableOptions';
import Colours from '../Colours';

const SelectOption = ({
  onAdd,
  availableOptions,
}: {
  onAdd: (value: any) => void;
  availableOptions: any;
}) => {
  const [value, setValue] = useState('');
  const [selectedOption, setSelectedOption] = useState<any>(undefined);
  const [showOptions, setShowOptions] = useState(false);

  return (
    <SelectOptionWrapper>
      <SearchOptions>
        <Input
          onChange={e => {
            if (selectedOption) return;
            setValue(e.target.value);
            setSelectedOption(undefined);
          }}
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
        {selectedOption && (
          <SelectedOption>
            {selectedOption.name}
            <span
              onClick={() => {
                setValue('');
                setSelectedOption(undefined);
              }}
            >
              X
            </span>
          </SelectedOption>
        )}
      </SearchOptions>

      {showOptions && !selectedOption && (
        <AvailableOptions
          availableOptions={availableOptions}
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
  position: relative;
  width: 100%;

  ${Input} {
    width: 65%;
    font-weight: bold;
  }
`;

const SelectedOption = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 7px;
  left: 7px;
  height: 29px;
  background: ${Colours.gallery};
  padding: 0 10px;
  border-radius: 3px;
  font-weight: bold;
  cursor: pointer;

  span {
    margin-left: 10px;
  }
`;
