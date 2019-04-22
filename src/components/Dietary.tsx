import React, {Fragment} from 'react';
import styled from 'styled-components/macro';

interface Props {
  dietary?: string[];
}
const Dietary = ({dietary = []}: Props) => {
  return (
    <DietaryWrapper>
      {dietary.map(dietaryItem => {
        const item = dietaryItems[dietaryItem];
        return (
          <Fragment key={dietaryItem}>
            <DietaryItem>
              <Icon src={require(`../assets/icons/${item.icon}`)} />
              <p>{item.name}</p>
            </DietaryItem>
          </Fragment>
        );
      })}
    </DietaryWrapper>
  );
};

/* Export
============================================================================= */
export default Dietary;

/* Dietary Items
============================================================================= */
const dietaryItems: any = {
  vegan: {
    name: 'Vegan',
    icon: 'plant.svg',
  },
  vegeterian: {
    name: 'Vegeterian',
    icon: 'leaf.svg',
  },
  gluten_free: {
    name: 'Gluten Free',
    icon: 'gluten-free.svg',
  },
  halal: {
    id: 'halal',
    name: 'Halal',
    icon: 'halal.svg',
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

/* Styled Components
============================================================================= */
const DietaryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const DietaryItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  font-size: 15px;
  margin-bottom: 5px;
  p {
    margin-left: 5px;
  }
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
`;
