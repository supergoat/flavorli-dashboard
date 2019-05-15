import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components/macro';
import calculateTextAreaRows from '../_utils/calculateTextAreaRows';
import Colours from '../Colours';
import Label from '../ui/Label';

const SelectCancelReason = ({
  selectedCancelReason,
  onSelect,
}: {
  selectedCancelReason: string;
  onSelect: (reason: string) => void;
}) => {
  const textAreaEl: any = useRef();
  useEffect(() => calculateTextAreaRows({textAreaEl, minRows: 2}));

  const handleReasonChange = (event: any) => {
    calculateTextAreaRows({textAreaEl, minRows: 2});
    onSelect(event.target.value);
  };

  return (
    <>
      <SelectCancelReasonWrapper>
        {reasons.map((reason: any) => {
          return (
            <Reason
              key={reason}
              selected={selectedCancelReason === reason}
              onClick={() => onSelect(reason)}
            >
              <p>{reason}</p>
            </Reason>
          );
        })}
      </SelectCancelReasonWrapper>
      <Label>Comments</Label>
      <CancelReason
        value={selectedCancelReason}
        ref={textAreaEl}
        onChange={handleReasonChange}
      />
    </>
  );
};
export default SelectCancelReason;

const SelectCancelReasonWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
`;

interface ReasonProps {
  selected?: boolean;
}
const Reason = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 49%;
  margin-right: 2%;
  margin-bottom: 10px;
  padding: 5px;
  height: 50px;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
  border: ${(props: ReasonProps) =>
    props.selected
      ? `1px solid ${Colours.oxfordBlue}`
      : `1px solid ${Colours.grey}`};

  p {
    margin-left: 5px;
  }

  &:nth-of-type(2n) {
    margin-right: 0;
  }
`;

const CancelReason = styled.textarea`
  width: 100%;
  font-size: 18px;
  outline: none;
  border: 1px solid var(--osloGrey);
  border-radius: 3px;
  margin-bottom: 20px;
  padding: 5px;
  resize: none;
  max-height: 100px;
`;

const reasons: string[] = [
  'Closing Early',
  'Restaurant Problem',
  'Out of Item',
  'Other',
];
