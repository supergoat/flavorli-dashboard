import React, {useState, useEffect, useRef} from 'react';
import gql from 'graphql-tag';
import {Mutation, MutationFn} from 'react-apollo';
import styled from 'styled-components/macro';
import ConfirmButtons from '../components/ConfirmButtons';
import Error from '../ui/Error';
import calculateTextAreaRows from '../_utils/calculateTextAreaRows';

const UpdateMenuDescription = ({
  menuDescription = '',
  menuId,
}: {
  menuDescription: string;
  menuId: string;
}) => {
  const textAreaEl: any = useRef();

  const [description, setDescription] = useState(menuDescription);
  const [hasBeenEdited, setHasBeenEdited] = useState(false);
  const [error, setError] = useState('');

  /**
   * Call calculateTextAreaRows once  when the component mounts. This is needed
   * to ensure the textarea has the correct number of rows
   */
  useEffect(() => calculateTextAreaRows(textAreaEl), []);

  /**
   * Update description, when the description prop changes. This is needed when navigating
   * between menus because  the component doesn't not re-render therefore the
   * description remains stale
   */
  useEffect(() => {
    setHasBeenEdited(false);
    setDescription(menuDescription);
  }, [menuDescription]);

  const handleDescriptionChange = (event: any) => {
    const value = event.target.value;
    calculateTextAreaRows(textAreaEl);
    setDescription(value);
    setHasBeenEdited(value !== menuDescription);
  };

  const handleUpdate = (updateMenu: MutationFn<any, {description: string}>) => {
    updateMenu();
  };

  return (
    <Mutation
      mutation={UPDATE_MENU_DESCRIPTION}
      variables={{menuId, description}}
      onError={() => setError('Something went wrong, unable to save')}
    >
      {(updateMenu: any, {loading}: any) => {
        return (
          <UpdateMenuDescriptionWrapper>
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
                onConfirm={() => handleUpdate(updateMenu)}
                onCancel={() => setDescription(menuDescription)}
              />
            </DescriptionInput>

            <OptionError show={!!error}>{error}</OptionError>
          </UpdateMenuDescriptionWrapper>
        );
      }}
    </Mutation>
  );
};

export default UpdateMenuDescription;

const UPDATE_MENU_DESCRIPTION = gql`
  mutation updateMenu($menuId: ID!, $description: String) {
    updateMenu(menuId: $menuId, description: $description) {
      id
      description
    }
  }
`;

const UpdateMenuDescriptionWrapper = styled.div`
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
