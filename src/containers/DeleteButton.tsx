import React, {useState} from 'react';
import {Mutation} from 'react-apollo';
import styled from 'styled-components/macro';
import Colours from '../Colours';
import Button from '../ui/Button';

const DeleteButton = ({
  variables,
  mutation,
  onDelete,
}: {
  variables: {[key: string]: any};
  mutation: any;
  onDelete: (cache: any, obj: any) => void;
}) => {
  const [error, setError] = useState('');
  const [confirmDelete, setConfirmDelete] = useState(false);

  const handleDelete = (mutationFn: any) => {
    mutationFn({variables: {...variables}});
  };

  return (
    <Mutation
      mutation={mutation}
      update={onDelete}
      onError={() => setError('Could not delete')}
    >
      {(mutationFn: any, {loading}: any) => {
        return (
          <DeleteButtonWrapper>
            {loading && 'DELETING...'}

            {!confirmDelete && !loading && (
              <Button
                danger
                onClick={() => {
                  setError('');
                  setConfirmDelete(true);
                }}
              >
                Delete
              </Button>
            )}

            {confirmDelete && !loading && (
              <ConfirmDelete>
                <Button secondary onClick={() => setConfirmDelete(false)}>
                  CANCEL
                </Button>

                <Button
                  onClick={() => {
                    setConfirmDelete(false);
                    handleDelete(mutationFn);
                  }}
                >
                  CONFIRM DELETE
                </Button>
              </ConfirmDelete>
            )}
            <Error show={!!error}>{error}</Error>
          </DeleteButtonWrapper>
        );
      }}
    </Mutation>
  );
};

export default DeleteButton;

const DeleteButtonWrapper = styled.div`
  position: relative;
  ${Button} {
    font-weight: bold;
  }
`;

const ConfirmDelete = styled.div`
  display: flex;
  flex-direction: column;

  ${Button} {
    &:last-of-type {
      margin-top: 10px;
    }
  }
`;

interface ErrorProps {
  show?: boolean;
}
const Error = styled.div`
  position: absolute;
  right: -7px;
  color: ${Colours.red};
  transition: all 400ms;
  width: 145px;
  font-size: 14px;
  margin-top: 5px;
  opacity: ${(props: ErrorProps) => (props.show ? 1 : 0)};
`;
