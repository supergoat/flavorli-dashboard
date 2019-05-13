import React from 'react';

import styled from 'styled-components/macro';
import {RouteComponentProps, Router, navigate} from '@reach/router';
import RestaurantDetails from './RestaurantDetails';
import AdminDetails from './AdminDetails';

import Navbar from '../containers/Navbar';
import SideBar from '../components/SideBar';
import Colours from '../Colours';

interface Props extends RouteComponentProps {
  location?: any;
}
const SettingsView = ({location}: Props) => {
  return (
    <SettingsViewWrapper>
      <Navbar />
      <SideBar>
        <Navigation>
          <NavigationItem
            selected={location.pathname === '/settings/restaurant-details'}
            onClick={() => navigate('/settings/restaurant-details')}
          >
            Restaurant Details
          </NavigationItem>
          <NavigationItem
            selected={location.pathname === '/settings/admin-details'}
            onClick={() => navigate('/settings/admin-details')}
          >
            Admin Details
          </NavigationItem>
          <NavigationItem
            selected={location.pathname === '/settings/payment-details'}
            onClick={() => navigate('/settings/payment-details')}
          >
            Payment Details
          </NavigationItem>
        </Navigation>
      </SideBar>

      <Router>
        <RestaurantDetails path="/restaurant-details" />
        <AdminDetails path="/admin-details" />
      </Router>
    </SettingsViewWrapper>
  );
};

const SettingsViewWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 50px;
  width: 100%;
  margin-top: 61px;
`;
const Navigation = styled.div`
  padding: 20px;
`;

interface NavigationItemProps {
  selected?: boolean;
}
const NavigationItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 20px 15px;
  color: ${(props: NavigationItemProps) =>
    props.selected ? Colours.oxfordBlue : Colours.osloGrey};
  font-weight: ${(props: NavigationItemProps) =>
    props.selected ? 'bold' : 'normal'};
  cursor: pointer;
  user-select: none;
  box-shadow: 0 0px 2px rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  margin: 10px 0;
`;

export default SettingsView;
