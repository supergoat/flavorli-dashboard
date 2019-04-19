import React from 'react';
import {navigate} from '@reach/router';
import styled from 'styled-components/macro';
import Colours from '../Colours';

interface Props {
  menuName: string;
  menuCategories: string[];
}

const MenuCategories = ({menuName, menuCategories}: Props) => {
  return (
    <>
      {!!menuCategories.length && (
        <MenuCategoriesWrapper>
          {menuCategories.map((category: any) => {
            return (
              <CategoryItem
                onClick={() => {
                  navigate(`/menu-builder/${menuName}/${category}`);
                }}
              >
                {category}
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
