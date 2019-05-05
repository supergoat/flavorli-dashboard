import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {RouteComponentProps} from '@reach/router';
import styled, {css} from 'styled-components/macro';
import Button from '../ui/Button';
import Colours from '../Colours';
import DeleteMenuButton from '../containers/DeleteMenuButton';
import UpdateInput from '../containers/UpdateInput';
import ServiceTimeList from '../components/ServiceTimeList';

interface Props extends RouteComponentProps {
  menuId?: string;
}
const Menu = ({menuId}: Props) => {
  return (
    <Query query={GET_RESTAURANT_MENU} variables={{menuId: menuId}}>
      {({loading, error, data: {getMenu, getRestaurant}}: any) => {
        if (loading) return 'Loading...';

        if (error) return `Error! ${error.message}`;

        return (
          <MenuWrapper>
            <UpdateInput
              style={css`
                margin-bottom: 20px;
                input {
                  font-size: 40px;
                  font-weight: 300;
                  width: 100%;
                }
              `}
              name="name"
              placeholder="Name"
              mutation={UPDATE_MENU_NAME}
              inputValue={getMenu.name || ''}
              variables={{menuId: getMenu.id}}
            />

            <UpdateInput
              name="description"
              style={css`
                textarea {
                  font-size: 20px;
                  width: 100%;
                  line-height: 30px;
                }
              `}
              textarea
              textareaLineHeight={30}
              placeholder="Description"
              mutation={UPDATE_MENU_DESCRIPTION}
              inputValue={getMenu.description || ''}
              variables={{menuId: getMenu.id}}
            />

            <ServiceTimeList
              menuServiceTimes={getMenu.serviceTimes}
              menuId={getMenu.id}
            />

            <Options>
              <Option>
                <div>
                  <h4>Delete Menu</h4>
                  <p>Deleting this menu, is an ireverisble action.</p>
                </div>

                <DeleteMenuButton
                  menuId={getMenu.id}
                  restaurantId={getRestaurant.id}
                />
              </Option>
            </Options>
          </MenuWrapper>
        );
      }}
    </Query>
  );
};

export default Menu;

const GET_RESTAURANT_MENU = gql`
  query getMenu($menuId: ID!) {
    getMenu(menuId: $menuId) {
      id
      name
      description
      serviceTimes {
        id
        hours
        days
        months
      }
    }
    getRestaurant {
      id
    }
  }
`;

const UPDATE_MENU_NAME = gql`
  mutation updateMenu($menuId: ID!, $name: String) {
    updateMenu(menuId: $menuId, name: $name) {
      id
      name
    }
  }
`;

const UPDATE_MENU_DESCRIPTION = gql`
  mutation updateMenu($menuId: ID!, $description: String) {
    updateMenu(menuId: $menuId, description: $description) {
      id
      description
    }
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 580px;
  padding: 20px 0;
`;

const Options = styled.div`
  margin-top: 50px;

  h4 {
    margin-bottom: 5px;
  }

  p {
    color: ${Colours.osloGrey};
  }
`;

const Option = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;

  ${Button} {
    width: 140px;
    flex-shrink: 0;
    font-size: 12px;
    margin-left: 10px;
  }
`;
