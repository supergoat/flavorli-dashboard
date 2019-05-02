import React, {useState} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import styled from 'styled-components/macro';
import Error from '../ui/Error';

const DeleteServiceTime = ({
  onDelete,
  serviceTimeId,
}: {
  onDelete: () => void;
  serviceTimeId: string;
}) => {
  const [error, setError] = useState('');

  return (
    <Mutation
      mutation={DELETE_SERVICE_TIME}
      variables={{id: serviceTimeId}}
      onCompleted={onDelete}
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
