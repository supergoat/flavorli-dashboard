import React, {useRef, useEffect, useState} from 'react';
import {navigate} from '@reach/router';
import styled from 'styled-components/macro';
import Button from '../ui/Button';
import Dietary from '../components/Dietary';
import DeleteCategoryButton from '../containers/DeleteCategoryButton';
import calculateTextAreaRows from '../_utils/calculateTextAreaRows';

import Colours from '../Colours';

interface Props {
  category: any;
}

const Category = ({category}: Props) => {
  const textAreaEl: any = useRef();
  useEffect(() => calculateTextAreaRows(textAreaEl));

  const [description, setDescription] = useState(category.description);
  const [name, setName] = useState(category.name);

  const handleDescriptionChange = (event: any) => {
    calculateTextAreaRows(textAreaEl);
    setDescription(event.target.value);
  };

  return (
    <CategoryWrapper>
      <MenuName
        onClick={() => navigate(`/menu-builder/menu/${category.menu.id}`)}
      >
        {category.menu.name}
      </MenuName>

      <NameInput
        id="name"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Name"
      />

      <DescriptionTextArea
        ref={textAreaEl}
        onChange={handleDescriptionChange}
        value={description}
        placeholder="Description"
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
                  <Price>£{item.price}</Price>
                </Header>
                <Dietary dietary={item.dietary} />
                <Description>{item.description}</Description>
              </Info>
            </MenuItem>
          );
        })}
      </MenuItems>

      <ItemActions>
        <ItemAction>
          <div>
            <h4>Hide Category</h4>
            <p>Customers will not be able to view this category</p>
          </div>

          <Button secondary>HIDE CATEGORY</Button>
        </ItemAction>

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

const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 580px;
  padding: 10px 0;
`;

const MenuName = styled.h4`
  color: ${Colours.osloGrey};
  padding: 0 3px;
`;

const NameInput = styled.input`
  font-size: 40px;
  width: 100%;
  outline: none;
  padding: 10px 0;
  border: none;
`;

const DescriptionTextArea = styled.textarea`
  font-size: 20px;
  outline: none;
  resize: none;
  width: 100%;
  padding: 10px 0;
  margin-bottom: 20px;
  border: none;
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
