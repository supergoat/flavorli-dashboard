import React from 'react';
import {RouteComponentProps, navigate} from '@reach/router';
import styled from 'styled-components/macro';
import Button from '../ui/Button';
import Dietary from '../components/Dietary';

import Colours from '../Colours';

interface Props extends RouteComponentProps {
  menu?: string;
  category?: string;
}

const Menu = ({menu, category}: Props) => {
  return (
    <MenuWrapper>
      <MenuName onClick={() => navigate(`/menu-builder/${menu}`)}>
        {menu}
      </MenuName>
      <CategoryName>{category}</CategoryName>
      <CategoryDescription>
        Fully stacked vegan crispy fried jackfruit burgers, served with our
        signature patty in a toasted brioche bun
      </CategoryDescription>
      <AddMenuButton>Add Menu Item</AddMenuButton>
      <MenuItems>
        <MenuItem>
          <Image />
          <div>
            <Header>
              <Name>The Big Jack</Name>
              <Price>£9.00</Price>
            </Header>
            <Dietary dietary={['vegan', 'gluten-free']} />
            <Description>
              Our top secret burger sauce, american cheeze, gherkins, red onion,
              iceburg lettuce, tomato (GFO)
            </Description>
          </div>
        </MenuItem>

        <MenuItem>
          <Image />
          <div>
            <Header>
              <Name> The Father Jack</Name>
              <Price>£9.00</Price>
            </Header>
            <Dietary dietary={['vegan', 'gluten-free']} />
            <Description>
              Smokey bacun jam, bourbon BBQ 8sauce, smoked cheeze, iceburg,
              onion rings
            </Description>
          </div>
        </MenuItem>
        <ViewAll>View All</ViewAll>
      </MenuItems>

      <Options>
        <Option>
          <div>
            <h4>Hide Category</h4>
            <p>Customers will not be able to view this category</p>
          </div>

          <Button secondary>Hide Category</Button>
        </Option>

        <Option>
          <div>
            <h4>Delete Category</h4>
            <p>Deleting this category, is an ireverisble action.</p>
          </div>

          <DeleteCategory secondary>Delete Category</DeleteCategory>
        </Option>
      </Options>
    </MenuWrapper>
  );
};

export default Menu;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 580px;
`;

const MenuName = styled.h4`
  color: ${Colours.osloGrey};
`;

const CategoryName = styled.h1`
  font-size: 28px;
  margin-bottom: 5px;
`;

const CategoryDescription = styled.p`
  margin: 5px 0 40px;
  color: ${Colours.osloGrey};
  font-size: 18px;
`;

const AddMenuButton = styled(Button)`
  align-self: flex-start;
  font-size: 15px;
`;

const MenuItems = styled.div``;

const MenuItem = styled.div`
  display: flex;
  width: 100%;
  padding: 15px;
  border: 1px solid ${Colours.grey};
  border-radius: 3px;
  margin: 20px 0;
  background: ${Colours.white};
`;

const ViewAll = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 10px;
  border: 1px solid ${Colours.grey};
  border-radius: 3px;
  background: ${Colours.white};
`;

const Image = styled.img`
  height: 100px;
  width: 100px;
  flex-shrink: 0;
  background: ${Colours.gallery};
  margin-right: 15px;
  object-fit: cover;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  margin-bottom: 5px;
`;

const Price = styled.h4`
  margin-bottom: 10px;
`;

const Description = styled.p`
  color: ${Colours.osloGrey};
`;

const Options = styled.div`
  margin-top: 50px;

  h4 {
    margin-bottom: 5px;
  }

  p {
    color: ${Colours.osloGrey};
  }
`;

const Option = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;

  ${Button} {
    width: 130px;
    flex-shrink: 0;
    font-size: 14px;
    margin-left: 10px;
  }
`;

const DeleteCategory = styled(Button)`
  background: ${Colours.red};
  color: ${Colours.white};
`;
