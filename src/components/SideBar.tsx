import React from 'react';
import styled, {css} from 'styled-components/macro';
import {navigate} from '@reach/router';

const SideBar = () => {
  return (
    <>
      <SideBarWrapper>
        <Title onClick={() => navigate('/')}>flavorli</Title>

        <Tabs>
          <Tab selected>New</Tab>
          <Tab>In Progress</Tab>
          <Tab>Ready</Tab>
        </Tabs>

        <Orders>
          <OrderItme>
            <p>#0001</p>
            <p>Larry Page</p>
            <p>7.00pm</p>
          </OrderItme>

          <OrderItme>
            <p>#0001</p>
            <p>Larry Page</p>
            <p>7.00pm</p>
          </OrderItme>
        </Orders>
      </SideBarWrapper>
    </>
  );
};

/* Export
============================================================================= */
export default SideBar;

/* Styled Components
============================================================================= */
const SideBarWrapper = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 370px;
  height: 100%;
  background: var(--oxfordBlue);
  color: var(--white);
`;

const Title = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Pacifico;
  font-size: 22px;
  height: 60px;
  cursor: default;
  border-bottom: 1px solid var(--white);
`;

const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
`;

interface TabProps {
  selected?: boolean;
}
const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  width: 110px;
  padding: 10px 0;
  border: 1px solid var(--white);

  ${(props: TabProps) =>
    props.selected &&
    css`
      background: var(--white);
      color: var(--oxfordBlue);
    `}
`;

const Orders = styled.div`
  padding: 10px;
`;
const OrderItme = styled.div`
  display: flex;
  justify-content: space-around;
  background: var(--white);
  border-radius: 3px;
  color: var(--oxfordBlue);
  padding: 30px 20px;
  margin-bottom: 15px;
  font-weight: 300;
`;
