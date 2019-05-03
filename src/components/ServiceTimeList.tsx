import React, {useState, useEffect} from 'react';
import styled from 'styled-components/macro';
import Colours from '../Colours';
import UpsertServiceTime from '../containers/UpsertServiceTime';
import DeleteServiceTime from '../containers/DeleteServiceTime';

interface Props {
  menuId: string;
  menuServiceTimes: {id: string; hours: [string, string]; days: string[]}[];
}
const ServiceTimeList = ({menuId, menuServiceTimes}: Props) => {
  const [editingServiceTime, setEditingServiceTime] = useState<any>(null);
  const [serviceTimes, setServiceTimes] = useState<any[]>(menuServiceTimes);
  const [isCreatingServiceTime, setIsCreatingServiceTime] = useState(false);

  useEffect(() => setServiceTimes(menuServiceTimes), [menuId]);

  return (
    <>
      <AddService
        onClick={() => {
          setIsCreatingServiceTime(true);
          setEditingServiceTime(null);
        }}
      >
        ADD SERVICE TIMES +
      </AddService>

      <ServiceTimes>
        {isCreatingServiceTime && (
          <ServiceListItem>
            <UpsertServiceTime
              serviceTime={{
                hours: ['10:00', '22:00'],
                days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                months: [],
                menuId,
              }}
              onSave={(newServiceTime: any) => {
                setServiceTimes([...serviceTimes, newServiceTime]);
                setIsCreatingServiceTime(false);
              }}
              onCancel={() => setIsCreatingServiceTime(false)}
            />
          </ServiceListItem>
        )}

        {serviceTimes.map((serviceTime: any) => (
          <ServiceListItem key={serviceTime.id}>
            {editingServiceTime && editingServiceTime.id === serviceTime.id ? (
              <UpsertServiceTime
                onSave={(updatedServiceTime: any) => {
                  const copyServiceTimes = [...serviceTimes];
                  const updatedServiceTimeIndex = copyServiceTimes.findIndex(
                    (o: any) => o.id === updatedServiceTime.id,
                  );

                  copyServiceTimes[
                    updatedServiceTimeIndex
                  ] = updatedServiceTime;
                  setServiceTimes(copyServiceTimes);

                  setEditingServiceTime(null);
                }}
                serviceTime={{...editingServiceTime, menuId}}
                onCancel={() => setEditingServiceTime(null)}
              />
            ) : (
              <Service>
                <ServiceInfo
                  onClick={() => {
                    setEditingServiceTime(serviceTime);
                  }}
                >
                  <ServiceHours>
                    {serviceTime.hours[0]} to {serviceTime.hours[1]}
                  </ServiceHours>
                  <ServiceDays>{serviceTime.days.join(', ')}</ServiceDays>
                  <ServiceMonths>{serviceTime.months.join(', ')}</ServiceMonths>
                </ServiceInfo>
                <DeleteServiceTime
                  serviceTimeId={serviceTime.id}
                  menuId={menuId}
                  onDelete={() => {
                    setServiceTimes(
                      serviceTimes.filter((t: any) => t.id !== serviceTime.id),
                    );
                  }}
                />
              </Service>
            )}
          </ServiceListItem>
        ))}
      </ServiceTimes>
    </>
  );
};

export default ServiceTimeList;

const AddService = styled.div`
  align-self: flex-start;
  font-size: 14px;
  padding: 10px 0;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  margin: 10px 0;
`;

const ServiceTimes = styled.div``;

const ServiceListItem = styled.div`
  margin-bottom: 10px;
`;

const Service = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px;
  color: ${Colours.osloGrey};
  cursor: pointer;
  user-select: none;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
`;

const ServiceInfo = styled.div`
  flex: 1;
`;

const ServiceHours = styled.p`
  color: ${Colours.oxfordBlue};
  margin-bottom: 5px;
`;

const ServiceDays = styled.p`
  margin-bottom: 5px;
  font-weight: bold;
`;

const ServiceMonths = styled.p``;
