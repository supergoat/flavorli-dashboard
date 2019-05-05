import React from 'react';
import gql from 'graphql-tag';
import {navigate} from '@reach/router';
import styled, {css} from 'styled-components/macro';
import Button from '../ui/Button';
import Dietary from '../components/Dietary';
import DeleteCategoryButton from '../containers/DeleteCategoryButton';
import UpdateInput from '../containers/UpdateInput';

import Colours from '../Colours';

interface Props {
  category: any;
}

const Category = ({category}: Props) => {
  return (
    <CategoryWrapper>
      <MenuName
        onClick={() => navigate(`/menu-builder/menu/${category.menu.id}`)}
      >
        {category.menu.name}
      </MenuName>

      <UpdateInput
        name="name"
        mutation={UPDATE_CATEGORY_NAME}
        inputValue={category.name || ''}
        variables={{categoryId: category.id}}
      />

      <UpdateInput
        style={css`
          margin-bottom: 20px;
          textarea {
            font-size: 20px;
            width: 100%;
            line-height: 30px;
          }
        `}
        textarea
        name="description"
        textareaLineHeight={30}
        placeholder="Description"
        mutation={UPDATE_CATEGORY_DESCRIPTION}
        inputValue={category.description || ''}
        variables={{categoryId: category.id}}
      />

      <AddMenuButton
        onClick={() =>
          navigate(`/menu-builder/category/${category.id}/create-menu-item`)
        }
      >
        Add Menu Item
      </AddMenuButton>

      <MenuItems>
        {category.items.map((item: any) => {
          return (
            <MenuItem
              key={item.id}
              onClick={() => navigate(`/menu-builder/menuItem/${item.id}`)}
            >
              <Image src={item.id} alt={item.name} />
              <Info>
                <Header>
                  <Name>{item.name}</Name>
                  <Price>£{Number.parseFloat(item.price).toFixed(2)}</Price>
                </Header>
                <Dietary dietary={item.dietary} />
                <Description>{item.description}</Description>
                {!item.available && <Availability>Unavailable</Availability>}
              </Info>
            </MenuItem>
          );
        })}
      </MenuItems>

      <ItemActions>
        <ItemAction>
          <div>
            <h4>Delete Category</h4>
            <p>Deleting this category, is an ireverisble action.</p>
          </div>

          <DeleteCategoryButton
            categoryId={category.id}
            menuId={category.menu.id}
          />
        </ItemAction>
      </ItemActions>
    </CategoryWrapper>
  );
};

export default Category;

const UPDATE_CATEGORY_NAME = gql`
  mutation updateMenuCategory($categoryId: ID!, $name: String) {
    updateMenuCategory(categoryId: $categoryId, name: $name) {
      id
      name
    }
  }
`;

const UPDATE_CATEGORY_DESCRIPTION = gql`
  mutation updateMenuCategory($categoryId: ID!, $description: String) {
    updateMenuCategory(categoryId: $categoryId, description: $description) {
      id
      description
    }
  }
`;

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 580px;
  padding: 10px 0;
`;

const MenuName = styled.h4`
  color: ${Colours.osloGrey};
  padding: 0 3px;
  cursor: pointer;
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
  padding: 10px;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  margin: 20px 0;
  background: ${Colours.white};
  cursor: pointer;
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
  min-height: 50px;
`;

const Availability = styled.div`
  display: flex;
  justify-content: flex-end;
  font-weight: bold;
  margin-top: 5px;
  text-transform: uppercase;
`;

const ItemActions = styled.div`
  margin-top: 50px;

  h4 {
    margin-bottom: 5px;
  }

  p {
    color: ${Colours.osloGrey};
  }
`;

const ItemAction = styled.div`
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
