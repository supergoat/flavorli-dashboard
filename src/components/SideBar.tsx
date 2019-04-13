import React from 'react';
import styled, {css} from 'styled-components/macro';
import {navigate} from '@reach/router';

const SideBar = () => {
  return (
    <>
      <SideBarWrapper>
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
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 370px;
  height: 100vh;
  padding: 65px 0;
  padding-left: 40px;
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

  ${(props: TabProps) =>
    props.selected &&
    css`
      border-bottom: 3px solid var(--oxfordBlue);
      background: var(--white);
      color: var(--oxfordBlue);
      font-weight: bold;
    `}
`;

const Orders = styled.div``;
const OrderItme = styled.div`
  display: flex;
  justify-content: space-around;
  background: var(--white);
  border-radius: 3px;
  color: var(--oxfordBlue);
  padding: 30px;
  margin-bottom: 15px;
  font-weight: 300;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;
