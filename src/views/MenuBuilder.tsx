import React, {useState} from 'react';
import {RouteComponentProps, Router, navigate} from '@reach/router';
import styled from 'styled-components/macro';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import Menu from '../components/Menu';
import Category from '../components/Category';
import AddCategory from '../components/AddCategory';
import AddMenuButton from '../components/AddMenuButton';

import Colours from '../Colours';

const menuList = [
  {
    id: '1',
    name: 'Breakfast',
    days: 'Monday to Friday',
    hours: ['12pm', '10pm'],
    categories: [],
  },
  {
    id: '2',
    name: 'Lunch',
    days: 'Monday to Friday',
    hours: ['12pm', '10pm'],
    categories: ['Burgers', 'Wingz', 'Bowls and Bites', 'Filthy Fries'],
  },
  {
    id: '3',
    name: 'Dinner',
    days: 'Monday to Friday',
    hours: ['12pm', '10pm'],
    categories: ['Burgers', 'Wingz', 'Bowls and Bites', 'Filthy Fries'],
  },
];

interface Props extends RouteComponentProps {}
const MenuBuilder = (_: Props) => {
  const [menuId, setMenuId] = useState<String | undefined>(undefined);
  const [addingCategory, setAddingCategory] = useState(false);

  return (
    <MenuBuilderWrapper>
      <Navbar />
      <SideBar>
        <AddMenu>
          <AddMenuButton
            onAdd={addMenu => {
              console.log(addMenu);
            }}
          />
        </AddMenu>

        <MenuList>
          {menuList.map(menu => {
            return (
              <>
                <MenuItem
                  onClick={() => {
                    if (menuId === menu.id) {
                      setMenuId(undefined);
                      navigate(`/menu-builder`);
                    } else {
                      setMenuId(menu.id);
                      navigate(`/menu-builder/${menu.name}`);
                    }
                  }}
                >
                  <MenuName>{menu.name}</MenuName>
                  <MenuServiceHours>Monday to Friday</MenuServiceHours>
                  <MenuServiceHours>
                    {menu.hours[0]} to {menu.hours[1]}
                  </MenuServiceHours>
                </MenuItem>

                {menuId === menu.id &&
                  (addingCategory ? (
                    <AddCategory onCancel={() => setAddingCategory(false)} />
                  ) : (
                    <AddCategoryButton onClick={() => setAddingCategory(true)}>
                      ADD CATEGORY
                    </AddCategoryButton>
                  ))}

                {menuId === menu.id && !!menu.categories.length && (
                  <Categories>
                    {menu.categories.map(category => {
                      return (
                        <CategoryItem
                          onClick={() => {
                            navigate(`/menu-builder/${menu.name}/${category}`);
                          }}
                        >
                          {category}
                        </CategoryItem>
                      );
                    })}
                  </Categories>
                )}
              </>
            );
          })}
        </MenuList>
      </SideBar>

      <RouterWrapper>
        <Menu path="/:menu" />
        <Category path="/:menu/:category" />
      </RouterWrapper>
    </MenuBuilderWrapper>
  );
};

export default MenuBuilder;

const MenuBuilderWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
  width: 100%;
  margin-top: 61px;
`;

const RouterWrapper = styled(Router)`
  display: flex;
  justify-content: center;
  flex: 1;
`;

const AddMenu = styled.div`
  padding: 20px;
`;

const MenuList = styled.div`
  height: 100%;
  overflow-y: auto;
  padding: 8px 20px;
`;

const MenuItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 15px;
  color: ${Colours.osloGrey};
  cursor: pointer;
  user-select: none;
  border: 1px solid ${Colours.grey};
  border-radius: 3px;
  margin: 5px 0;
`;

const MenuName = styled.p`
  color: ${Colours.oxfordBlue};
  font-weight: bold;
`;

const MenuServiceHours = styled.div`
  font-size: 15px;
`;

const CategoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  background: ${Colours.white};
  padding: 20px 5px;
  cursor: pointer;
`;

const Categories = styled.div`
  margin: 0 10px;
`;

const AddCategoryButton = styled.div`
  font-size: 14px;
  padding: 15px 15px;
  font-weight: bold;
  cursor: pointer;
  background: ${Colours.alabaster};
  border-radius: 4px;
`;
