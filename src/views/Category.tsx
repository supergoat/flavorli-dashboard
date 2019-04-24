import React from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {RouteComponentProps, navigate} from '@reach/router';
import styled from 'styled-components/macro';
import Button from '../ui/Button';
import Dietary from '../components/Dietary';
import DeleteCategoryButton from '../containers/DeleteCategoryButton';

import Colours from '../Colours';

interface Props extends RouteComponentProps {
  menuId?: string;
  categoryId?: string;
}

const Menu = ({menuId, categoryId}: Props) => {
  return (
    <Query query={GET_MENU_CATEGORY} variables={{categoryId, menuId}}>
      {({loading, error, data: {getRestaurant}}: any) => {
        if (loading) return 'Loading...';

        if (error) return `Error! ${error.message}`;

        return (
          <MenuWrapper>
            <MenuName
              onClick={() =>
                navigate(`/menu-builder/${getRestaurant.menus[0].id}`)
              }
            >
              {getRestaurant.menus[0].name}
            </MenuName>
            <CategoryName>
              {getRestaurant.menus[0].categories[0].name}
            </CategoryName>
            <CategoryDescription>
              Fully stacked vegan crispy fried jackfruit burgers, served with
              our signature patty in a toasted brioche bun
            </CategoryDescription>

            <AddMenuButton
              onClick={() =>
                navigate(
                  `/menu-builder/menu/${getRestaurant.menus[0].id}/category/${
                    getRestaurant.menus[0].categories[0].id
                  }/create-menu-item`,
                )
              }
            >
              Add Menu Item
            </AddMenuButton>

            <MenuItems>
              {getRestaurant.menus[0].categories[0].items.map((item: any) => {
                return (
                  <MenuItem
                    onClick={() =>
                      navigate(
                        `/menu-builder/menu/${
                          getRestaurant.menus[0].id
                        }/category/${
                          getRestaurant.menus[0].categories[0].id
                        }/menuItem/${item.id}`,
                      )
                    }
                  >
                    <Image src={item.id} alt={item.name} />
                    <Info>
                      <Header>
                        <Name>{item.name}</Name>
                        <Price>£{item.price.toFixed(2)}</Price>
                      </Header>
                      <Dietary dietary={item.dietary} />
                      <Description>{item.description}</Description>
                    </Info>
                  </MenuItem>
                );
              })}

              <ViewAll>View All</ViewAll>
            </MenuItems>

            <Options>
              <Option>
                <div>
                  <h4>Hide Category</h4>
                  <p>Customers will not be able to view this category</p>
                </div>

                <Button secondary>HIDE CATEGORY</Button>
              </Option>

              <Option>
                <div>
                  <h4>Delete Category</h4>
                  <p>Deleting this category, is an ireverisble action.</p>
                </div>

                <DeleteCategoryButton
                  categoryId={getRestaurant.menus[0].categories[0].id}
                  menuId={getRestaurant.menus[0].id}
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

const GET_MENU_CATEGORY = gql`
  query getRestaurant($menuId: ID!, $categoryId: ID!) {
    getRestaurant {
      id
      menus(where: {id: $menuId}) {
        id
        name
        categories(where: {id: $categoryId}) {
          id
          name
          items {
            id
            name
            price
            description
            dietary
          }
        }
      }
    }
  }
`;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 580px;
`;

const MenuName = styled.h4`
  color: ${Colours.osloGrey};
  padding: 0 3px;
`;

const CategoryName = styled.h1`
  font-size: 40px;
  padding: 10px 0;
`;

const CategoryDescription = styled.p`
  padding: 10px 0;
  margin-bottom: 20px;
  line-height: 1.5em;
  font-size: 18px;
`;

const AddMenuButton = styled(Button)`
  align-self: flex-start;
  font-size: 15px;
  width: 150px;
`;

const MenuItems = styled.div``;

const MenuItem = styled.div`
  display: flex;
  width: 100%;
  padding: 15px;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  margin: 20px 0;
  background: ${Colours.white};
  cursor: pointer;
`;

const ViewAll = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  background: ${Colours.white};
`;

const Image = styled.img`
  height: 130px;
  width: 130px;
  flex-shrink: 0;
  background: ${Colours.gallery};
  margin-right: 15px;
  object-fit: cover;
`;

const Info = styled.div`
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  margin-bottom: 5px;
`;

const Price = styled.h4`
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: ${Colours.osloGrey};
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
