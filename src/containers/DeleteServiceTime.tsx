import React, {useState} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import styled from 'styled-components/macro';
import Error from '../ui/Error';
import {MENU_SERVICE_TIMES_DATA} from '../views/MenuBuilder';

const DeleteServiceTime = ({
  onDelete,
  serviceTimeId,
  menuId,
}: {
  onDelete: () => void;
  serviceTimeId: string;
  menuId: string;
}) => {
  const [error, setError] = useState('');

  return (
    <Mutation
      mutation={DELETE_SERVICE_TIME}
      variables={{id: serviceTimeId}}
      update={(cache: any, {data: {deleteServiceTime}}: any) => {
        const {serviceTimes} = cache.readFragment({
          id: `Menu:${menuId}`,
          fragment: MENU_SERVICE_TIMES_DATA,
        });

        cache.writeFragment({
          id: `Menu:${menuId}`,
          fragment: MENU_SERVICE_TIMES_DATA,
          data: {
            serviceTimes: serviceTimes.filter(
              (item: any) => item.id !== deleteServiceTime.id,
            ),
            __typename: 'Menu',
          },
        });

        onDelete();
      }}
      onError={() => setError('Could not delete')}
    >
      {(deleteServiceTime: any, {loading}: any) => {
        return (
          <DeleteButtonWrapper>
            {loading && 'DELETING...'}

            <Error show={!!error}>{error}</Error>

            <DeleteButton
              onClick={() => {
                setError('');
                deleteServiceTime();
              }}
            >
              X
            </DeleteButton>
          </DeleteButtonWrapper>
        );
      }}
    </Mutation>
  );
};

export default DeleteServiceTime;

const DELETE_SERVICE_TIME = gql`
  mutation deleteServiceTime($id: ID!) {
    deleteServiceTime(id: $id) {
      id
    }
  }
`;

const DeleteButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const DeleteButton = styled.div`
  padding: 10px;
`;
