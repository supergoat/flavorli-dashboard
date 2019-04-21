import React from 'react';
import {navigate} from '@reach/router';
import styled from 'styled-components/macro';
import Colours from '../Colours';

interface Props {
  menuId: string;
  menuCategories: {
    id: string;
    name: string;
  }[];
}

const MenuCategories = ({menuId, menuCategories}: Props) => {
  return (
    <>
      {!!menuCategories.length && (
        <MenuCategoriesWrapper>
          {menuCategories.map((category: any) => {
            return (
              <CategoryItem
                key={category.id}
                onClick={() => {
                  navigate(`/menu-builder/${menuId}/${category.id}`);
                }}
              >
                {category.name}
              </CategoryItem>
            );
          })}
        </MenuCategoriesWrapper>
      )}
    </>
  );
};

export default MenuCategories;

const MenuCategoriesWrapper = styled.div`
  margin: 0 10px;
`;

const CategoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${Colours.white};
  padding: 20px 5px;
  cursor: pointer;
`;
