import React, {Fragment} from 'react';
import styled from 'styled-components/macro';

interface Props {
  dietary?: string[];
}
const Dietary = ({dietary = []}: Props) => {
  return (
    <DietaryWrapper>
      {dietary.map(dietaryItem => {
        return (
          <Fragment key={dietaryItem}>
            {dietaryItem === 'vegan' && (
              <DietaryItem>
                <Icon src={require(`../assets/icons/plant.svg`)} />
                <p>Vegan</p>
              </DietaryItem>
            )}
            {dietaryItem === 'vegeterian' && (
              <DietaryItem>
                <Icon src={require(`../assets/icons/leaf.svg`)} />
                <p>Vegeterian</p>
              </DietaryItem>
            )}
            {dietaryItem === 'gluten-free' && (
              <DietaryItem>
                <Icon src={require(`../assets/icons/gluten-free.svg`)} />
                <p>Gluten Free</p>
              </DietaryItem>
            )}
            {dietaryItem === 'dairy-free' && (
              <DietaryItem>
                <Icon src={require(`../assets/icons/dairy.svg`)} />
                <p>Dairy Free</p>
              </DietaryItem>
            )}
            {dietaryItem === 'halal' && (
              <DietaryItem>
                <Icon src={require(`../assets/icons/halal.svg`)} />
                <p>Halal</p>
              </DietaryItem>
            )}

            {dietaryItem === 'nuts' && (
              <DietaryItem>
                <Icon src={require(`../assets/icons/hazelnut.svg`)} />
                <p>Nuts</p>
              </DietaryItem>
            )}
          </Fragment>
        );
      })}
    </DietaryWrapper>
  );
};

/* Export
============================================================================= */
export default Dietary;

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
