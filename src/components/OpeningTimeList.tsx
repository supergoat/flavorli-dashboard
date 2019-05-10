import React, {useState, useEffect} from 'react';
import styled from 'styled-components/macro';
import Colours from '../Colours';
import UpsertOpeningTime from '../containers/UpsertOpeningTime';
import DeleteOpeningTime from '../containers/DeleteOpeningTime';

interface Props {
  restaurantId: string;
  restaurantOpeningTimes: {
    id: string;
    hours: [string, string];
    days: string[];
  }[];
}
const OpeningTimeList = ({restaurantId, restaurantOpeningTimes}: Props) => {
  const [editingOpeningTime, setEditingOpeningTime] = useState<any>(null);
  const [openingTimes, setOpeningTimes] = useState<any[]>(
    restaurantOpeningTimes,
  );
  const [isCreatingOpeningTime, setIsCreatingOpeningTime] = useState(false);

  useEffect(() => setOpeningTimes(restaurantOpeningTimes), [restaurantId]);

  return (
    <>
      <AddOpeningTime
        onClick={() => {
          setIsCreatingOpeningTime(true);
          setEditingOpeningTime(null);
        }}
      >
        ADD OPENING TIME +
      </AddOpeningTime>

      <OpeningTimes>
        {isCreatingOpeningTime && (
          <OpeningTimeListItem>
            <UpsertOpeningTime
              openingTime={{
                hours: ['10:00', '22:00'],
                days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                restaurantId,
              }}
              onSave={(newOpeningTime: any) => {
                setOpeningTimes([...openingTimes, newOpeningTime]);
                setIsCreatingOpeningTime(false);
              }}
              onCancel={() => setIsCreatingOpeningTime(false)}
            />
          </OpeningTimeListItem>
        )}

        {openingTimes.map((openingTime: any) => (
          <OpeningTimeListItem key={openingTime.id}>
            {editingOpeningTime && editingOpeningTime.id === openingTime.id ? (
              <UpsertOpeningTime
                onSave={(updatedOpeningTime: any) => {
                  const copyOpeningTimes = [...openingTimes];
                  const updatedOpeningTimeIndex = copyOpeningTimes.findIndex(
                    (o: any) => o.id === updatedOpeningTime.id,
                  );

                  copyOpeningTimes[
                    updatedOpeningTimeIndex
                  ] = updatedOpeningTime;
                  setOpeningTimes(copyOpeningTimes);

                  setEditingOpeningTime(null);
                }}
                openingTime={{...editingOpeningTime, restaurantId}}
                onCancel={() => setEditingOpeningTime(null)}
              />
            ) : (
              <OpeningTime>
                <OpeningTimeInfo
                  onClick={() => {
                    setEditingOpeningTime(openingTime);
                  }}
                >
                  <OpeningTimeHours>
                    {openingTime.hours[0]} to {openingTime.hours[1]}
                  </OpeningTimeHours>
                  <OpeningTimeDays>
                    {openingTime.days.join(', ')}
                  </OpeningTimeDays>
                </OpeningTimeInfo>
                <DeleteOpeningTime
                  openingTimeId={openingTime.id}
                  restaurantId={restaurantId}
                  onDelete={() => {
                    setOpeningTimes(
                      openingTimes.filter((t: any) => t.id !== openingTime.id),
                    );
                  }}
                />
              </OpeningTime>
            )}
          </OpeningTimeListItem>
        ))}
      </OpeningTimes>
    </>
  );
};

export default OpeningTimeList;

const AddOpeningTime = styled.div`
  align-self: flex-start;
  font-size: 14px;
  padding: 10px 0;
  font-weight: bold;
  cursor: pointer;
  user-select: none;
  margin: 10px 0;
`;

const OpeningTimes = styled.div``;

const OpeningTimeListItem = styled.div`
  margin-bottom: 10px;
`;

const OpeningTime = styled.div`
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

const OpeningTimeInfo = styled.div`
  flex: 1;
`;

const OpeningTimeHours = styled.p`
  color: ${Colours.oxfordBlue};
  margin-bottom: 5px;
`;

const OpeningTimeDays = styled.p`
  margin-bottom: 5px;
  font-weight: bold;
`;
