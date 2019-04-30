import React, {useState, useEffect, useRef} from 'react';
import {Mutation, MutationFn} from 'react-apollo';
import styled from 'styled-components/macro';
import ConfirmButtons from '../components/ConfirmButtons';
import Error from '../ui/Error';
import calculateTextAreaRows from '../_utils/calculateTextAreaRows';

const UpdateDescription = ({
  previousDescription = '',
  variables,
  mutation,
}: {
  previousDescription: string;
  variables: {[key: string]: any};
  mutation: MutationFn<any, any>;
}) => {
  const textAreaEl: any = useRef();

  const [description, setDescription] = useState(previousDescription);
  const [hasBeenEdited, setHasBeenEdited] = useState(false);
  const [error, setError] = useState('');

  /**
   * Call calculateTextAreaRows once  when the component mounts. This is needed
   * to ensure the textarea has the correct number of rows
   */
  useEffect(() => calculateTextAreaRows(textAreaEl), []);

  /**
   * Update description, when the description prop changes. This is needed when navigating
   * as the component doesn't not re-render therefore the description remains stale
   */
  useEffect(() => {
    setHasBeenEdited(false);
    setDescription(previousDescription);
  }, [previousDescription]);

  const handleDescriptionChange = (event: any) => {
    const value = event.target.value;
    calculateTextAreaRows(textAreaEl);
    setDescription(value);
    setHasBeenEdited(value !== previousDescription);
  };

  const handleUpdate = (mutationFn: MutationFn<any, any>) => {
    mutationFn();
  };

  return (
    <Mutation
      mutation={mutation}
      variables={{...variables, description}}
      onError={() => setError('Something went wrong, unable to save')}
    >
      {(mutationFn: any, {loading}: any) => {
        return (
          <UpdateDescriptionWrapper>
            <DescriptionInput>
              <textarea
                ref={textAreaEl}
                onChange={handleDescriptionChange}
                value={description}
                placeholder="Description"
              />

              <ConfirmButtons
                show={hasBeenEdited}
                saving={loading}
                onConfirm={() => handleUpdate(mutationFn)}
                onCancel={() => {
                  setHasBeenEdited(false);
                  setDescription(previousDescription);
                }}
              />
            </DescriptionInput>

            <OptionError show={!!error}>{error}</OptionError>
          </UpdateDescriptionWrapper>
        );
      }}
    </Mutation>
  );
};

export default UpdateDescription;

const UpdateDescriptionWrapper = styled.div`
  margin-bottom: 20px;

  textarea {
    font-size: 20px;
    outline: none;
    resize: none;
    padding-bottom: 10px;
    width: 100%;
    border: none;
  }
`;

const DescriptionInput = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

interface ErrorProps {
  show?: boolean;
}
const OptionError = styled(Error)`
  margin-top: 0;
  max-height: ${(props: ErrorProps) => (props.show ? '15px' : '0')};
`;
