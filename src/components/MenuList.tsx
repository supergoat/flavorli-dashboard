import React, {useState} from 'react';
import {navigate} from '@reach/router';
import styled from 'styled-components/macro';
import AddCategoryButton from '../containers/AddCategoryButton';
import MenuCategories from '../components/MenuCategories';
import MenuListItem from '../components/MenuListItem';

const MenuList = ({menuList}: any) => {
  const [menuId, setMenuId] = useState<String | undefined>(undefined);

  return (
    <MenuListWrapper>
      {menuList.map((menu: any) => {
        const isCurrentMenu = menuId === menu.id;

        const onMenuListItemClick = () => {
          if (isCurrentMenu) {
            setMenuId(undefined);
            navigate(`/menu-builder`);
          } else {
            setMenuId(menu.id);
            navigate(`/menu-builder/${menu.name}`);
          }
        };

        return (
          <>
            <MenuListItem
              menuName={menu.name}
              serviceHours={menu.hours}
              onClick={onMenuListItemClick}
            />

            {isCurrentMenu && (
              <>
                <AddCategoryButton
                  onAdd={addMenuCategory => {
                    console.log(addMenuCategory);
                  }}
                />
                <MenuCategories
                  menuCategories={menu.categories}
                  menuName={menu.name}
                />
              </>
            )}
          </>
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
