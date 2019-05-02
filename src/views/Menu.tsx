import React, {useState} from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {RouteComponentProps} from '@reach/router';
import styled from 'styled-components/macro';
import Button from '../ui/Button';
import Colours from '../Colours';
import DeleteMenuButton from '../containers/DeleteMenuButton';
import UpdateName from '../containers/UpdateName';
import UpdateDescription from '../containers/UpdateDescription';
import UpsertServiceTime from '../containers/UpsertServiceTime';
import DeleteServiceTime from '../containers/DeleteServiceTime';

interface Props extends RouteComponentProps {
  menuId?: string;
}
const Menu = ({menuId}: Props) => {
  const [serviceTimes, setServiceTimes] = useState<any[]>([]);
  const [editingServiceTime, setEditingServiceTime] = useState<any>(null);
  const [iseCreatingServiceTime, setIseCreatingServiceTime] = useState(false);

  return (
    <Query
      query={GET_RESTAURANT_MENU}
      variables={{menuId: menuId}}
      onCompleted={({getMenu}: any) =>
        setServiceTimes(getMenu.serviceTimes || [])
      }
    >
      {({loading, error, data: {getMenu, getRestaurant}}: any) => {
        if (loading) return 'Loading...';

        if (error) return `Error! ${error.message}`;

        return (
          <MenuWrapper>
            <UpdateName
              mutation={UPDATE_MENU_NAME}
              previousName={getMenu.name || ''}
              variables={{menuId: getMenu.id}}
            />

            <UpdateDescription
              mutation={UPDATE_MENU_DESCRIPTION}
              previousDescription={getMenu.description || ''}
              variables={{menuId: getMenu.id}}
            />

            <AddService
              onClick={() => {
                setIseCreatingServiceTime(true);
                setEditingServiceTime(null);
              }}
            >
              ADD SERVICE TIMES +
            </AddService>

            <ServiceTimes>
              {iseCreatingServiceTime && (
                <ServiceListItem>
                  <UpsertServiceTime
                    serviceTime={{
                      menuId: getMenu.id,
                      hours: ['10:00', '22:00'],
                      days: [
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                      ],
                    }}
                    onSave={(newServiceTime: any) => {
                      setServiceTimes([...serviceTimes, newServiceTime]);
                      setIseCreatingServiceTime(false);
                    }}
                    onCancel={() => setIseCreatingServiceTime(false)}
                  />
                </ServiceListItem>
              )}

              {serviceTimes.map((serviceTime: any) => (
                <ServiceListItem key={serviceTime.id}>
                  {editingServiceTime &&
                  editingServiceTime.id === serviceTime.id ? (
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
                      serviceTime={{...editingServiceTime, menuId: getMenu.id}}
                      onCancel={() => setEditingServiceTime(null)}
                    />
                  ) : (
                    <Service>
                      <ServiceInfo
                        onClick={() => {
                          setEditingServiceTime(serviceTime);
                        }}
                      >
                        <ServiceDays>{serviceTime.days.join(', ')}</ServiceDays>
                        <ServiceHours>
                          {serviceTime.hours[0]} to {serviceTime.hours[1]}
                        </ServiceHours>
                      </ServiceInfo>
                      <DeleteServiceTime
                        serviceTimeId={serviceTime.id}
                        onDelete={() => {
                          setServiceTimes(
                            serviceTimes.filter(
                              (t: any) => t.id !== serviceTime.id,
                            ),
                          );
                        }}
                      />
                    </Service>
                  )}
                </ServiceListItem>
              ))}
            </ServiceTimes>

            <Options>
              <Option>
                <div>
                  <h4>Delete Menu</h4>
                  <p>Deleting this menu, is an ireverisble action.</p>
                </div>

                <DeleteMenuButton
                  menuId={getMenu.id}
                  restaurantId={getRestaurant.id}
                />
              </Option>
            </Options>
          </MenuWrapper>
        );
      }}
    </Query>
  );
};

export default Menu;

const GET_RESTAURANT_MENU = gql`
  query getMenu($menuId: ID!) {
    getMenu(menuId: $menuId) {
      id
      name
      description
      serviceTimes {
        id
        hours
        days
      }
    }
    getRestaurant {
      id
    }
  }
`;

const UPDATE_MENU_NAME = gql`
  mutation updateMenu($menuId: ID!, $name: String) {
    updateMenu(menuId: $menuId, name: $name) {
      id
      name
    }
  }
`;

const UPDATE_MENU_DESCRIPTION = gql`
  mutation updateMenu($menuId: ID!, $description: String) {
    updateMenu(menuId: $menuId, description: $description) {
      id
      description
    }
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 580px;
  padding: 20px 0;
`;

const Options = styled.div`
  margin-top: 50px;

  h4 {
    margin-bottom: 5px;
  }

  p {
    color: ${Colours.osloGrey};
  }
`;

const Option = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;

  ${Button} {
    width: 140px;
    flex-shrink: 0;
    font-size: 12px;
    margin-left: 10px;
  }
`;

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

const ServiceDays = styled.p`
  color: ${Colours.oxfordBlue};
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 16px;
`;
const ServiceHours = styled.p``;
