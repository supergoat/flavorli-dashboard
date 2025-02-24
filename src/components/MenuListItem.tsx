import React from 'react';
import styled from 'styled-components/macro';
import Colours from '../Colours';

interface Props {
  serviceHours: [string, string];
  onClick: () => void;
  menuName: string;
}
const MenuListItem = ({menuName, serviceHours, onClick}: Props) => {
  return (
    <MenuListItemWrapper onClick={onClick}>
      <MenuName>{menuName}</MenuName>
      <MenuServiceHours>Monday to Friday</MenuServiceHours>
      <MenuServiceHours>
        {serviceHours[0]} to {serviceHours[1]}
      </MenuServiceHours>
    </MenuListItemWrapper>
  );
};

export default MenuListItem;

const MenuListItemWrapper = styled.div`
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
