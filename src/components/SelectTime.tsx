import React from 'react';
import styled from 'styled-components/macro';
import Colours from '../Colours';

const SelectTime = ({
  selectedTime,
  onSelect,
}: {
  selectedTime: string;
  onSelect: (time: string) => void;
}) => {
  return (
    <SelectTimeWrapper>
      {times.map((time: any) => {
        return (
          <Time
            key={time}
            selected={selectedTime === time}
            onClick={() => onSelect(time)}
          >
            <p>{time}</p>
          </Time>
        );
      })}
    </SelectTimeWrapper>
  );
};
export default SelectTime;

const SelectTimeWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface TimeProps {
  selected?: boolean;
}
const Time = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32%;
  margin-right: 2%;
  margin-bottom: 10px;
  padding: 5px;
  height: 50px;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
  border: ${(props: TimeProps) =>
    props.selected
      ? `1px solid ${Colours.oxfordBlue}`
      : `1px solid ${Colours.grey}`};

  p {
    margin-left: 5px;
  }

  &:nth-of-type(3n) {
    margin-right: 0;
  }
`;

const times: string[] = [
  '5 min',
  '10 min',
  '15 min',
  '20 min',
  '25 min',
  '30 min',
];
