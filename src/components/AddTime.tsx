import React, {useState} from 'react';
import styled from 'styled-components/macro';
import Colours from '../Colours';
import Label from '../ui/Label';
import ConfirmButtons from './ConfirmButtons';
import SelectDays from './SelectDays';
import Error from '../ui/Error';
import sortDays from '../_utils/sortDays';

interface Props {
  addTime: any;
  saving: boolean;
  errors: Map<string, string>;
  clearErrors: (errors: string[]) => void;
  onSave: (addTime: any) => void;
  onCancel: () => void;
}

const AddTime = ({
  addTime,
  saving,
  errors,
  clearErrors,
  onSave,
  onCancel,
}: Props) => {
  const [opensAt, setOpensAt] = useState(addTime.hours[0]);
  const [closesAt, setClosesAt] = useState(addTime.hours[1]);
  const [days, setAddTimeDays] = useState(addTime.days);

  const handleSave = () => {
    onSave({
      ...addTime,
      hours: [opensAt, closesAt],
      days,
    });
  };

  const hasAddTimeBeenEdited =
    !addTime.id ||
    JSON.stringify(addTime.hours) !== JSON.stringify([opensAt, closesAt]) ||
    JSON.stringify(addTime.days) !== JSON.stringify(days);

  return (
    <AddTimeWrapper>
      {!hasAddTimeBeenEdited && (
        <CancelButton
          src={require('../assets/icons/cancel.svg')}
          onClick={onCancel}
        />
      )}

      <Actions>
        <ConfirmButtons
          show={hasAddTimeBeenEdited}
          saving={saving}
          onConfirm={handleSave}
          onCancel={onCancel}
        />
      </Actions>

      <AddTimeError show={errors.has('server-error')}>
        {errors.get('server-error')}
      </AddTimeError>

      <Label>Available Hours</Label>
      <AddTimeError show={errors.has('add-time-hours')}>
        {errors.get('add-time-hours')}
      </AddTimeError>

      <AddTimeHours>
        <Time
          type="time"
          value={opensAt}
          onChange={(e: any) => {
            clearErrors(['add-time-hours']);
            setOpensAt(e.target.value);
          }}
        />
        <p>and</p>
        <Time
          type="time"
          value={closesAt}
          onChange={(e: any) => {
            clearErrors(['add-time-hours']);
            setClosesAt(e.target.value);
          }}
        />
      </AddTimeHours>

      <Label>Available Days</Label>
      <AddTimeError show={errors.has('days')}>
        {errors.get('days')}
      </AddTimeError>
      <SelectDays
        selectedDays={days}
        onSelect={item =>
          setAddTimeDays((items: any) => {
            if (items.includes(item))
              return items.filter((i: any) => i !== item);
            const sortedDays = sortDays([...items, item]);
            return sortedDays;
          })
        }
      />
    </AddTimeWrapper>
  );
};

export default AddTime;

const AddTimeWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 3px;
  width: 580px;
  background: ${Colours.white};
  border-radius: 4px;
  padding: 15px;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
`;

interface ErrorProps {
  show?: boolean;
}
const AddTimeError = styled(Error)`
  margin-top: 0;
  max-height: ${(props: ErrorProps) => (props.show ? '15px' : '0')};
`;

const CancelButton = styled.img`
  width: 35px;
  height: 35px;
  cursor: pointer;
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 1;
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  position: absolute;
  top: 15px;
  right: 15px;
`;

const AddTimeHours = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  p {
    margin: 0 10px;
  }
`;

const Time = styled.input`
  font-size: 20px;
  outline: none;
  border-radius: 3px;
  padding: 5px;
  border: 1px solid ${Colours.grey};
`;
