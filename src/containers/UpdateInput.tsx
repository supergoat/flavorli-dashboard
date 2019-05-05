import React, {useState, useEffect, useRef} from 'react';
import {Mutation, MutationFn} from 'react-apollo';
import styled from 'styled-components/macro';
import ConfirmButtons from '../components/ConfirmButtons';
import Error from '../ui/Error';
import calculateTextAreaRows from '../_utils/calculateTextAreaRows';

const UpdateInput = ({
  inputValue = '',
  variables,
  mutation,
  name,
  placeholder,
  textarea,
  style,
  textareaLineHeight,
}: {
  inputValue: string;
  variables: {[key: string]: any};
  mutation: MutationFn<any, any>;
  name: string;
  placeholder?: string;
  textarea?: boolean;
  style?: any;
  textareaLineHeight?: number;
}) => {
  const textAreaEl: any = useRef();

  const [value, setValue] = useState(inputValue);
  const [hasBeenEdited, setHasBeenEdited] = useState(false);
  const [error, setError] = useState('');

  /**
   * Call calculateTextAreaRows once  when the component mounts. This is needed
   * to ensure the textarea has the correct number of rows
   */
  useEffect(() => calculateTextAreaRows({textAreaEl, textareaLineHeight}), []);

  /**
   * Update value, when the value prop changes. This is needed when navigating
   * as the component does not re-render, therefore the value remains stale
   */
  useEffect(() => {
    setHasBeenEdited(false);
    setValue(inputValue);
  }, [inputValue]);

  const handleUpdate = (mutationFn: MutationFn<any, any>) => {
    setError('');
    if (value.trim() === '') return setError('required');

    mutationFn();
  };

  const handleInputValueChange = (e: any) => {
    const value = e.target.value;
    setError('');
    setValue(value);
    setHasBeenEdited(value !== inputValue);
  };

  const handleTextAreaValueChange = (event: any) => {
    setError('');
    const value = event.target.value;
    calculateTextAreaRows({textAreaEl, textareaLineHeight});
    setValue(value);
    setHasBeenEdited(value !== inputValue);
  };

  return (
    <Mutation
      mutation={mutation}
      variables={{...variables, [name]: value}}
      onError={() => {
        setError('Something went wrong, unable to save');
      }}
    >
      {(mutationFn: any, {loading}: any) => {
        return (
          <UpdateInputWrapper css={style}>
            {textarea ? (
              <textarea
                ref={textAreaEl}
                onChange={handleTextAreaValueChange}
                value={value}
                placeholder={placeholder}
              />
            ) : (
              <input
                value={value}
                onChange={handleInputValueChange}
                placeholder={placeholder}
              />
            )}

            <ConfirmButtons
              show={hasBeenEdited}
              saving={loading}
              onConfirm={() => handleUpdate(mutationFn)}
              onCancel={() => {
                setError('');
                setHasBeenEdited(false);
                setValue(inputValue);
              }}
            />

            <InputError show={!!error}>{error}</InputError>
          </UpdateInputWrapper>
        );
      }}
    </Mutation>
  );
};

export default UpdateInput;

interface UpdateInputWrapperProps {
  css: any;
}
const UpdateInputWrapper = styled.div`
  ${(_: UpdateInputWrapperProps) => ``};
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  input,
  textarea {
    max-width: 85%;
    outline: none;
    border: none;
  }

  textarea {
    resize: none;
  }
`;

interface ErrorProps {
  show?: boolean;
}
const InputError = styled(Error)`
  width: 100%;
  margin-top: 0;
  max-height: ${(props: ErrorProps) => (props.show ? '15px' : '0')};
`;
