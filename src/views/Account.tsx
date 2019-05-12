import React from 'react';
import {GET_RESTAURANT} from './MenuBuilder';
import {Query} from 'react-apollo';
import styled from 'styled-components/macro';
import {RouteComponentProps} from '@reach/router';
import Account from '../components/Account';
import Navbar from '../containers/Navbar';
import SideBar from '../components/SideBar';
import Colours from '../Colours';

interface Props extends RouteComponentProps {}
const AccountView = (_: Props) => {
  return (
    <Query query={GET_RESTAURANT}>
      {({loading, error, data: {getRestaurant}}: any) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;

        return (
          <AccountWrapper>
            <Navbar />
            <SideBar>
              <Navigation>
                <NavigationItem selected>Restaurant Details</NavigationItem>
                <NavigationItem>Admin Details</NavigationItem>
                <NavigationItem>Payment Details</NavigationItem>
              </Navigation>
            </SideBar>

            <Account restaurant={getRestaurant} />
          </AccountWrapper>
        );
      }}
    </Query>
  );
};

const AccountWrapper = styled.div`
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

export default AccountView;
