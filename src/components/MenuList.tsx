import React, {Fragment} from 'react';

import styled from 'styled-components/macro';
import AddCategoryButton from '../containers/AddCategoryButton';
import MenuCategories from '../components/MenuCategories';
import MenuListItem from '../components/MenuListItem';

interface Props {
  menuList: {
    id: string;
    name: string;
    categories: {
      id: string;
      name: string;
    }[];
  }[];
  currentMenuId: string;
  onMenuClick: (menuId: string) => void;
}
const MenuList = ({menuList = [], currentMenuId, onMenuClick}: Props) => {
  return (
    <MenuListWrapper>
      {menuList.map((menu: any) => {
        const isCurrentMenu = currentMenuId === menu.id;
        return (
          <Fragment key={menu.id}>
            <MenuListItem
              menuName={menu.name}
              noOfCategories={menu.categories.length}
              onClick={() => onMenuClick(menu.id)}
              isCurrentMenu={isCurrentMenu}
            />

            {isCurrentMenu && (
              <>
                <AddCategoryButton menuId={menu.id} />
                <MenuCategories menuCategories={menu.categories} />
              </>
            )}
          </Fragment>
        );
      })}
    </MenuListWrapper>
  );
};

export default MenuList;

const MenuListWrapper = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 8px 20px;
`;
