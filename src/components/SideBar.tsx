import React from 'react';
import styled, {css} from 'styled-components/macro';
import Colours from '../Colours';

const SideBar = () => {
  return (
    <SidebarContainer>
      <SideBarWrapper>
        <Title>flavorli</Title>
        <Tabs>
          <Tab selected>New</Tab>
          <Tab>In Progress</Tab>
          <Tab>Ready</Tab>
        </Tabs>

        <Orders>
          <OrderItem>
            <CustomerInfo>
              <Avatar />
              <div>
                <CustomerName>Larry Page</CustomerName>
                <OrderTime>
                  Due at <span>7.00pm</span>
                </OrderTime>
              </div>
            </CustomerInfo>

            <OrderId>#0001</OrderId>
          </OrderItem>
        </Orders>
      </SideBarWrapper>
    </SidebarContainer>
  );
};

/* Export
============================================================================= */
export default SideBar;

/* Styled Components
============================================================================= */
const SidebarContainer = styled.div`
  width: 370px;
`;

const SideBarWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 370px;
  padding: 30px 0;
  border-right: 1px solid var(--gallery);
  background: var(--white);
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 30px;
`;

interface TabProps {
  selected?: boolean;
}
const Tab = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  padding: 20px 10px;
  color: var(--osloGrey);
  border-bottom: 1px solid var(--gallery);

  ${(props: TabProps) =>
    props.selected &&
    css`
      border-bottom: 3px solid ${Colours.oxfordBlue};
      background: var(--white);
      color: var(--oxfordBlue);
      font-weight: bold;
    `}
`;

const Orders = styled.div`
  padding: 0 20px;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  background: var(--white);
  border-radius: 3px;
  color: var(--oxfordBlue);
  padding: 0;
  margin-bottom: 15px;
  font-weight: 300;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  padding: 20px 15px;
`;

const CustomerInfo = styled.div`
  display: flex;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: grey;
  margin-right: 15px;
`;

const CustomerName = styled.h4`
  margin-bottom: 2px;
`;

const OrderId = styled.p``;

const OrderTime = styled.h3`
  font-size: 16px;
  color: ${Colours.osloGrey};
  span {
    font-weight: bold;
    font-size: 20px;
    color: ${Colours.oxfordBlue};
  }
`;

const Title = styled.div`
  display: flex;
  font-family: Pacifico;
  font-size: 22px;
  justify-content: center;
  cursor: default;
`;
