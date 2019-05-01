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
  pathname: string;
}
const MenuList = ({menuList = [], pathname}: Props) => {
  const [menuId, setMenuId] = useState<String | undefined>(undefined);

  return (
    <MenuListWrapper>
      {menuList.map((menu: any) => {
        const isCurrentMenu = menuId === menu.id;
        const isOnCurrentMenuHome =
          `/menu-builder/menu/${menu.id}` === pathname;

        const onMenuListItemClick = () => {
          if (isOnCurrentMenuHome) {
            setMenuId(undefined);
            navigate(`/menu-builder`);
          } else {
            setMenuId(menu.id);
            navigate(`/menu-builder/menu/${menu.id}`);
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
