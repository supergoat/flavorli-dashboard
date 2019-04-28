import React from 'react';
import styled from 'styled-components/macro';

import Colours from '../Colours';

const AvailableOptions = ({
  filter,
  onSelect,
  availableOptions,
}: {
  filter: string;
  availableOptions: any;
  onSelect: (option: any) => void;
}) => {
  const options = availableOptions.filter((option: any) =>
    option.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <AvailableOptionsWrapper>
      {options.length === 0 ? (
        <Heading>No matching options</Heading>
      ) : (
        <Heading>{options.length} matching options</Heading>
      )}
      {options.map((option: any) => {
        return (
          <OptionItem key={option.id} onMouseDown={() => onSelect(option)}>
            {option.name}
          </OptionItem>
        );
      })}
    </AvailableOptionsWrapper>
  );
};

export default AvailableOptions;

const AvailableOptionsWrapper = styled.div`
  margin-top: 15px;
  border-radius: 3px;
  background: ${Colours.white};
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
  max-height: 210px;
  padding: 5px;
  overflow: auto;
`;

const Heading = styled.div`
  padding: 10px 20px;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  padding: 0 20px;
  height: 50px;
  cursor: pointer;
  border-radius: 3px;
  font-weight: bold;

  &:hover {
    background: ${Colours.alabaster};
  }
`;
