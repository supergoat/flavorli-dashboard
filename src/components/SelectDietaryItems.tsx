import React from 'react';
import styled from 'styled-components/macro';
import Colours from '../Colours';

const SelectDietaryItems = ({
  selectedItems,
  onSelect,
}: {
  selectedItems: string[];
  onSelect: (item: string) => void;
}) => {
  return (
    <SelectDietaryItemsWrapper>
      {Object.keys(dietaryItems).map((dietaryItemKey: any) => {
        const dietaryItem = dietaryItems[dietaryItemKey];
        return (
          <DietaryItem
            key={dietaryItemKey}
            selected={selectedItems.includes(dietaryItemKey)}
            onClick={() => onSelect(dietaryItemKey)}
          >
            <Icon src={require(`../assets/icons/${dietaryItem.icon}`)} />
            <p>{dietaryItem.name}</p>
          </DietaryItem>
        );
      })}
    </SelectDietaryItemsWrapper>
  );
};
export default SelectDietaryItems;

const SelectDietaryItemsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

interface DietaryItemProps {
  selected?: boolean;
}
const DietaryItem = styled.div`
  display: flex;
  align-items: center;
  width: 32%;
  margin-right: 2%;
  margin-bottom: 20px;
  padding: 10px;
  height: 50px;
  border-radius: 3px;
  font-size: 16px;
  cursor: pointer;
  border: ${(props: DietaryItemProps) =>
    props.selected
      ? `1px solid ${Colours.oxfordBlue}`
      : `1px solid ${Colours.grey}`};

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
