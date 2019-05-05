import React from 'react';
import {Query} from 'react-apollo';
import styled from 'styled-components/macro';
import {RouteComponentProps} from '@reach/router';
import Account from '../components/Account';
import Navbar from '../components/Navbar';
import SideBar from '../components/SideBar';
import {GET_RESTAURANT} from './MenuBuilder';

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
            <SideBar />

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

export default AccountView;
