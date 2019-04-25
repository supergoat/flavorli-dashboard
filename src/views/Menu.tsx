import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {RouteComponentProps} from '@reach/router';
import styled from 'styled-components/macro';
import Button from '../ui/Button';
import Colours from '../Colours';
import DeleteMenuButton from '../containers/DeleteMenuButton';

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
            <MenuName>{getMenu.name}</MenuName>
            <MenuDescription>Description</MenuDescription>

            <ServiceDays>Monday to Friday</ServiceDays>
            <ServiceHours>9am to 10pm</ServiceHours>

            <Options>
              <Option>
                <div>
                  <h4>Hide Menu</h4>
                  <p>Customers will not be able to view this menu</p>
                </div>

                <Button secondary>HIDE MENU</Button>
              </Option>

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
    }
    getRestaurant {
      id
    }
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 580px;
  padding: 20px 0;
`;

const MenuName = styled.h1`
  font-size: 40px;
`;

const MenuDescription = styled.p`
  margin: 10px 0;
`;

const ServiceDays = styled.h3``;
const ServiceHours = styled.h3``;

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
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  ${Button} {
    width: 140px;
    flex-shrink: 0;
    font-size: 12px;
    margin-left: 10px;
  }
`;
