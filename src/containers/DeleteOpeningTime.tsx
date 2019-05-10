import React, {useState} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import styled from 'styled-components/macro';
import Error from '../ui/Error';
import {RESTAURANT_OPENING_TIMES_DATA} from '../views/MenuBuilder';

const DeleteOpeningTime = ({
  onDelete,
  openingTimeId,
  restaurantId,
}: {
  onDelete: () => void;
  openingTimeId: string;
  restaurantId: string;
}) => {
  const [error, setError] = useState('');

  return (
    <Mutation
      mutation={DELETE_OPENING_TIME}
      variables={{id: openingTimeId}}
      update={(cache: any, {data: {deleteOpeningTime}}: any) => {
        const {openingTimes} = cache.readFragment({
          id: `Restaurant:${restaurantId}`,
          fragment: RESTAURANT_OPENING_TIMES_DATA,
        });

        cache.writeFragment({
          id: `Restaurant:${restaurantId}`,
          fragment: RESTAURANT_OPENING_TIMES_DATA,
          data: {
            openingTimes: openingTimes.filter(
              (item: any) => item.id !== deleteOpeningTime.id,
            ),
            __typename: 'Restaurant',
          },
        });

        onDelete();
      }}
      onError={() => setError('Could not delete')}
    >
      {(deleteOpeningTime: any, {loading}: any) => {
        return (
          <DeleteButtonWrapper>
            {loading && 'DELETING...'}

            <Error show={!!error}>{error}</Error>

            <DeleteButton
              onClick={() => {
                setError('');
                deleteOpeningTime();
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

export default DeleteOpeningTime;

const DELETE_OPENING_TIME = gql`
  mutation deleteOpeningTime($id: ID!) {
    deleteOpeningTime(id: $id) {
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
