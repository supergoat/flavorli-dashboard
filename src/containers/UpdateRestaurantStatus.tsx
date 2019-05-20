import React, {useState} from 'react';
import styled from 'styled-components/macro';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';
import Colours from '../Colours';

const UpdateRestaurantStatus = ({status}: {status: string}) => {
  const [showStatuses, setShowStatuses] = useState(false);

  return (
    <Mutation
      mutation={UPDATE_RESTAURANT_STATUS}
      onCompleted={() => setShowStatuses(false)}
    >
      {(updateRestaurant: any, {loading}: any) => {
        return (
          <>
            <OpenTimes onClick={() => setShowStatuses(!showStatuses)}>
              {status === 'Open' && (
                <>
                  <Dot color="green" /> Open - Accepting Orders
                </>
              )}

              {status === 'Busy' && (
                <>
                  <Dot color="orange" /> Busy - Experiencing Delays
                </>
              )}

              {status === 'Closed' && (
                <>
                  <Dot color="red" /> Closed - Not Accepting Order
                </>
              )}
            </OpenTimes>

            <Dropdown showDropdown={showStatuses}>
              {status !== 'Open' && (
                <DropDownItem
                  onClick={() =>
                    updateRestaurant({
                      variables: {status: 'Open'},
                    })
                  }
                >
                  <Dot color="green" />
                  Open - Accepting Orders
                </DropDownItem>
              )}
              {status !== 'Busy' && (
                <DropDownItem
                  onClick={() =>
                    updateRestaurant({
                      variables: {status: 'Busy'},
                    })
                  }
                >
                  <Dot color="orange" />
                  Busy - Experiencing Delays
                </DropDownItem>
              )}
              {status !== 'Closed' && (
                <DropDownItem
                  onClick={() =>
                    updateRestaurant({
                      variables: {status: 'Closed'},
                    })
                  }
                >
                  <Dot color="red" />
                  Closed - Not Accepting Order
                </DropDownItem>
              )}
            </Dropdown>
          </>
        );
      }}
    </Mutation>
  );
};

export default UpdateRestaurantStatus;

const UPDATE_RESTAURANT_STATUS = gql`
  mutation updateRestaurant($status: String) {
    updateRestaurant(status: $status) {
      id
      status
    }
  }
`;

interface DotProps {
  color: string;
}
const Dot = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 7.5px;
  background: ${(props: DotProps) => props.color};
  margin-right: 5px;
`;

const OpenTimes = styled.div`
  display: flex;
  align-items: center;
  z-index: 1;
  cursor: pointer;
  user-select: none;
`;

interface DropdownProps {
  showDropdown?: boolean;
}
const Dropdown = styled.ul`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 5px;
  left: 5px;
  width: 350px;
  background: ${Colours.white};
  color: ${Colours.osloGrey};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  border-radius: 3px;
  padding: 50px 15px 15px;
  transition: transform 200ms;
  transform: ${(props: DropdownProps) =>
    props.showDropdown ? 'translateX(0)' : 'translateY(-110%)'};
`;

const DropDownItem = styled.li`
  display: flex;
  align-items: center;
  padding: 15px 0;
  user-select: none;
`;
