import React from 'react';
import styled from 'styled-components/macro';
import {RouteComponentProps} from '@reach/router';
import Colours from '../Colours';

interface Props extends RouteComponentProps {
  menuId?: string;
  categoryId?: string;
  menuItemId?: string;
}

const MenuItem = ({menuId, categoryId, menuItemId}: Props) => {
  return (
    <MenuItemWrapper>
      <Image />
      <div>
        <Name>The Big Jack</Name>

        <Description>
          Our top secret burger sauce, american cheeze, gherkins, red onion,
          iceburg lettuce, tomato (GFO)
        </Description>
        <Price>£ 9.00</Price>
        <DietaryItems>
          {Object.values(dietaryItems).map((dietaryItem: any) => {
            return (
              <DietaryItem>
                <Icon src={require(`../assets/icons/${dietaryItem.icon}`)} />
                <p>{dietaryItem.name}</p>
              </DietaryItem>
            );
          })}
        </DietaryItems>
      </div>
    </MenuItemWrapper>
  );
};

export default MenuItem;

const dietaryItems: any = {
  vegan: {
    name: 'Vegan',
    icon: 'plant.svg',
  },
  vegeterian: {
    name: 'Vegeterian',
    icon: 'leaf.svg',
  },
  halal: {
    id: 'halal',
    name: 'Halal',
    icon: 'halal.svg',
  },
  gluten_free: {
    name: 'Gluten Free',
    icon: 'gluten-free.svg',
  },
  tree_nuts: {
    name: 'Tree Nuts',
    icon: 'hazelnut.svg',
  },
  egg: {
    name: 'Egg',
    icon: 'egg.svg',
  },
  peanuts: {
    name: 'Peanuts',
    icon: 'peanut.svg',
  },
  fish: {
    name: 'Fish',
    icon: 'fish.svg',
  },
  soy: {
    name: 'Soy',
    icon: 'soy.svg',
  },
  crustacean_shellfish: {
    name: 'Crustacean Shellfish',
    icon: 'crustacean_shellfish.svg',
  },
  dairy: {
    name: 'Dairy Free',
    icon: 'dairy.svg',
  },
};

const MenuItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 15px;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  margin: 20px 0;
  width: 580px;
  background: ${Colours.white};
`;

const Image = styled.img`
  height: 250px;
  width: 100%;
  flex-shrink: 0;
  background: ${Colours.gallery};
  margin-right: 15px;
  object-fit: cover;
`;

const Name = styled.h1`
  font-size: 40px;
  margin-top: 10px;
  padding: 10px 0;
`;

const Price = styled.h3`
  font-size: 25px;
  padding: 5px 0;
  margin-bottom: 20px;
`;

const Description = styled.p`
  padding: 10px 0;
  line-height: 1.5em;
  font-size: 18px;
`;

const DietaryItems = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const DietaryItem = styled.div`
  display: flex;
  align-items: center;
  width: 32%;
  margin-right: 2%;
  margin-bottom: 20px;
  border: 1px solid ${Colours.grey};

  padding: 10px;
  height: 50px;
  border-radius: 3px;
  font-size: 16px;
  p {
    margin-left: 5px;
  }

  &:nth-of-type(3n) {
    margin-right: 0;
  }
`;

const Icon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 5px;
`;
