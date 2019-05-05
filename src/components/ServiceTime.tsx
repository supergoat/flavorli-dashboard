import React, {useState} from 'react';
import styled from 'styled-components/macro';
import Colours from '../Colours';
import Label from '../ui/Label';
import ConfirmButtons from './ConfirmButtons';
import SelectDays from './SelectDays';
import SelectMonths from './SelectMonths';
import Error from '../ui/Error';
import sortDays from '../_utils/sortDays';
import sortMonths from '../_utils/sortMonths';

interface Props {
  serviceTime: any;
  saving: boolean;
  errors: Map<string, string>;
  clearErrors: (errors: string[]) => void;
  onSave: (serviceTime: {
    menuId: string;
    id: string;
    hours: [string, string];
    days: string[];
    months: string[];
  }) => void;
  onCancel: () => void;
}

const ServiceTime = ({
  serviceTime,
  saving,
  errors,
  clearErrors,
  onSave,
  onCancel,
}: Props) => {
  const [opensAt, setOpensAt] = useState(serviceTime.hours[0]);
  const [closesAt, setClosesAt] = useState(serviceTime.hours[1]);
  const [days, setServiceDays] = useState(serviceTime.days);
  const [months, setServiceMonths] = useState(serviceTime.months);

  const handleSave = () => {
    onSave({
      menuId: serviceTime.menuId,
      id: serviceTime.id,
      hours: [opensAt, closesAt],
      days,
      months,
    });
  };

  // This comparison will only work, if the order of the keys is correct
  const hasServiceBeenEdited =
    JSON.stringify(serviceTime) !==
    JSON.stringify({
      id: serviceTime.id,
      hours: [opensAt, closesAt],
      days,
      months,
      __typename: 'ServiceTime',
      menuId: serviceTime.menuId,
    });

  return (
    <ServiceTimeWrapper>
      {!hasServiceBeenEdited && (
        <CancelButton
          src={require('../assets/icons/cancel.svg')}
          onClick={onCancel}
        />
      )}

      <Actions>
        <ConfirmButtons
          show={hasServiceBeenEdited}
          saving={saving}
          onConfirm={handleSave}
          onCancel={onCancel}
        />
      </Actions>

      <ServiceTimeError show={errors.has('server-error')}>
        {errors.get('server-error')}
      </ServiceTimeError>

      <Label>Serving Between</Label>
      <ServiceTimeError show={errors.has('service-hours')}>
        {errors.get('service-hours')}
      </ServiceTimeError>

      <ServiceHours>
        <Time
          type="time"
          value={opensAt}
          onChange={(e: any) => {
            clearErrors(['service-hours']);
            setOpensAt(e.target.value);
          }}
        />
        <p>and</p>
        <Time
          type="time"
          value={closesAt}
          onChange={(e: any) => {
            clearErrors(['service-hours']);
            setClosesAt(e.target.value);
          }}
        />
      </ServiceHours>

      <Label>Service Days</Label>
      <ServiceTimeError show={errors.has('days')}>
        {errors.get('days')}
      </ServiceTimeError>
      <SelectDays
        selectedDays={days}
        onSelect={item =>
          setServiceDays((items: any) => {
            if (items.includes(item))
              return items.filter((i: any) => i !== item);
            const sortedDays = sortDays([...items, item]);
            return sortedDays;
          })
        }
      />

      <Label>Service Months</Label>
      <ServiceTimeError show={errors.has('months')}>
        {errors.get('months')}
      </ServiceTimeError>
      <SelectMonths
        selectedMonths={months}
        onSelect={item =>
          setServiceMonths((items: any) => {
            if (items.includes(item))
              return items.filter((i: any) => i !== item);

            const sortedMonths = sortMonths([...items, item]);
            return sortedMonths;
          })
        }
      />
    </ServiceTimeWrapper>
  );
};

export default ServiceTime;

const ServiceTimeWrapper = styled.div`
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
const ServiceTimeError = styled(Error)`
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

const ServiceHours = styled.div`
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
