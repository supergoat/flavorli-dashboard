import React, {useState, useEffect} from 'react';
import gql from 'graphql-tag';
import {Mutation, MutationFn} from 'react-apollo';
import styled from 'styled-components/macro';
import ConfirmButtons from '../components/ConfirmButtons';
import Error from '../ui/Error';

const UpdateMenuName = ({
  menuName = '',
  menuId,
}: {
  menuName: string;
  menuId: string;
}) => {
  const [name, setName] = useState(menuName);
  const [hasBeenEdited, setHasBeenEdited] = useState(false);
  const [error, setError] = useState('');

  /**
   * Update name, when the name prop changes. This is needed when navigating
   * between menus because the component doesn't not re-render therefore the
   * name remains stale
   */
  useEffect(() => {
    setHasBeenEdited(false);
    setName(menuName);
  }, [menuName]);

  const handleUpdate = (updateMenu: MutationFn<any, {name: string}>) => {
    if (name.trim() === '') return setError('Name cannot be blank');

    updateMenu();
  };

  const handleNameChange = (e: any) => {
    const value = e.target.value;
    setError('');
    setName(value);
    setHasBeenEdited(value !== menuName);
  };

  return (
    <Mutation
      mutation={UPDATE_MENU_NAME}
      variables={{menuId, name}}
      onError={() => {
        setError('Something went wrong, unable to save');
      }}
    >
      {(updateMenu: any, {loading}: any) => {
        return (
          <UpdateMenuNameWrapper>
            <NameInput>
              <input
                value={name}
                onChange={handleNameChange}
                placeholder="Name"
              />

              <OptionError show={!!error}>{error}</OptionError>
            </NameInput>

            <ConfirmButtons
              show={hasBeenEdited}
              saving={loading}
              onConfirm={() => handleUpdate(updateMenu)}
              onCancel={() => {
                setHasBeenEdited(false);
                setName(menuName);
              }}
            />
          </UpdateMenuNameWrapper>
        );
      }}
    </Mutation>
  );
};

export default UpdateMenuName;

const UPDATE_MENU_NAME = gql`
  mutation updateMenu($menuId: ID!, $name: String) {
    updateMenu(menuId: $menuId, name: $name) {
      id
      name
    }
  }
`;

const UpdateMenuNameWrapper = styled.div`
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
const OptionError = styled(Error)`
  margin-top: 0;
  max-height: ${(props: ErrorProps) => (props.show ? '15px' : '0')};
`;
