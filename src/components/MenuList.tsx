import React, {useState, Fragment} from 'react';
import {navigate} from '@reach/router';
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
}
const MenuList = ({menuList}: Props) => {
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
          <Fragment key={menu.id}>
            <MenuListItem
              menuName={menu.name}
              serviceHours={['12pm', '10pm']}
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
