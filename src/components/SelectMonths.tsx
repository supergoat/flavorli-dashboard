import React from 'react';
import styled from 'styled-components/macro';
import Colours from '../Colours';

const SelectMonths = ({
  selectedMonths,
  onSelect,
}: {
  selectedMonths: string[];
  onSelect: (month: string) => void;
}) => {
  return (
    <SelectMonthsWrapper>
      {months.map((month: any) => {
        return (
          <Day
            key={month}
            selected={selectedMonths.includes(month)}
            onClick={() => onSelect(month)}
          >
            <p>{month}</p>
          </Day>
        );
      })}
    </SelectMonthsWrapper>
  );
};
export default SelectMonths;

const SelectMonthsWrapper = styled.div`
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

const months: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
