import React from 'react';
import {RouteComponentProps} from '@reach/router';
import styled, {css} from 'styled-components/macro';
import Order from './Order';
import SideBar from '../components/SideBar';
import Navbar from '../components/Navbar';
import Colours from '../Colours';
import OrderList from '../containers/OrderList';

interface Props extends RouteComponentProps {}

const OrderView = (_: Props) => {
  return (
    <OrderWrapper>
      <Navbar />
      <SideBar>
        <Tabs>
          <Tab selected>New</Tab>
          <Tab>In Progress</Tab>
          <Tab>Ready</Tab>
        </Tabs>
        <OrderList restaurantId={'cjumsnzj9001d0707xfdi5lbe'} />
      </SideBar>

      <Order />
    </OrderWrapper>
  );
};

export default OrderView;

const OrderWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
  width: 100%;
  margin-top: 61px;
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
