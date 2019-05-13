import React from 'react';
import styled from 'styled-components/macro';
import Colours from '../Colours';

interface Props {
  noOfCategories: number;
  onClick: () => void;
  menuName: string;
  isCurrentMenu: boolean;
}
const MenuListItem = ({
  menuName,
  noOfCategories,
  onClick,
  isCurrentMenu,
}: Props) => {
  return (
    <MenuListItemWrapper onClick={onClick} selected={isCurrentMenu}>
      <MenuName>{menuName}</MenuName>
      <MenuServiceHours>
        {noOfCategories} Categor{noOfCategories === 1 ? 'y' : 'ies'}
      </MenuServiceHours>
    </MenuListItemWrapper>
  );
};

export default MenuListItem;

interface MenuItemWrapperProps {
  selected?: boolean;
}
const MenuListItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 15px;
  color: ${(props: MenuItemWrapperProps) =>
    props.selected ? Colours.oxfordBlue : Colours.osloGrey};
  cursor: pointer;
  user-select: none;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  margin: 5px 0;
`;

const MenuName = styled.p`
  font-weight: bold;
`;

const MenuServiceHours = styled.div`
  font-size: 15px;
`;
