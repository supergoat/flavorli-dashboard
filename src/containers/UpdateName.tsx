import React, {useState, useEffect} from 'react';
import {Mutation, MutationFn} from 'react-apollo';
import styled from 'styled-components/macro';
import ConfirmButtons from '../components/ConfirmButtons';
import Error from '../ui/Error';

const UpdateName = ({
  previousName = '',
  variables,
  mutation,
}: {
  previousName: string;
  variables: {[key: string]: any};
  mutation: MutationFn<any, any>;
}) => {
  const [name, setName] = useState(previousName);
  const [hasBeenEdited, setHasBeenEdited] = useState(false);
  const [error, setError] = useState('');

  /**
   * Update name, when the name prop changes. This is needed when navigating
   * as the component does not re-render, therefore the name remains stale
   */
  useEffect(() => {
    setHasBeenEdited(false);
    setName(previousName);
  }, [previousName]);

  const handleUpdate = (mutationFn: MutationFn<any, any>) => {
    if (name.trim() === '') return setError('required');

    mutationFn();
  };

  const handleNameChange = (e: any) => {
    const value = e.target.value;
    setError('');
    setName(value);
    setHasBeenEdited(value !== previousName);
  };

  return (
    <Mutation
      mutation={mutation}
      variables={{...variables, name}}
      onError={() => {
        setError('Something went wrong, unable to save');
      }}
    >
      {(mutationFn: any, {loading}: any) => {
        return (
          <UpdateNameWrapper>
            <NameInput>
              <input
                value={name}
                onChange={handleNameChange}
                placeholder="Name"
              />

              <NameError show={!!error}>{error}</NameError>
            </NameInput>

            <ConfirmButtons
              show={hasBeenEdited}
              saving={loading}
              onConfirm={() => handleUpdate(mutationFn)}
              onCancel={() => {
                setHasBeenEdited(false);
                setName(previousName);
              }}
            />
          </UpdateNameWrapper>
        );
      }}
    </Mutation>
  );
};

export default UpdateName;

const UpdateNameWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;

  input {
    font-size: 40px;
    width: 100%;
    outline: none;
    padding-top: 10px;
    border: none;
    font-weight: 300;
  }
`;

const NameInput = styled.div`
  width: 100%;
`;

interface ErrorProps {
  show?: boolean;
}
const NameError = styled(Error)`
  margin-top: 0;
  max-height: ${(props: ErrorProps) => (props.show ? '15px' : '0')};
`;
