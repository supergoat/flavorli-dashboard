import React from 'react';
import styled from 'styled-components/macro';
import Colours from '../Colours';

const SelectDays = ({
  selectedDays,
  onSelect,
}: {
  selectedDays: string[];
  onSelect: (day: string) => void;
}) => {
  return (
    <SelectDaysWrapper>
      {days.map((day: any) => {
        return (
          <Day
            key={day}
            selected={selectedDays.includes(day)}
            onClick={() => onSelect(day)}
          >
            <p>{day}</p>
          </Day>
        );
      })}
    </SelectDaysWrapper>
  );
};
export default SelectDays;

const SelectDaysWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

interface DayProps {
  selected?: boolean;
}
const Day = styled.div`
  display: flex;
  align-items: center;
  width: 23.5%;
  margin-right: 2%;
  margin-bottom: 10px;
  padding: 5px;
  height: 40px;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
  border: ${(props: DayProps) =>
    props.selected
      ? `1px solid ${Colours.oxfordBlue}`
      : `1px solid ${Colours.grey}`};

  p {
    margin-left: 5px;
  }

  &:nth-of-type(4n) {
    margin-right: 0;
  }
`;

const days: string[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];
