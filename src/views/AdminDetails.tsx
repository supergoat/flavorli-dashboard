import React from 'react';
import {RouteComponentProps} from '@reach/router';
import {Query} from 'react-apollo';
import AdminDetails from '../components/AdminDetails';
import gql from 'graphql-tag';

interface Props extends RouteComponentProps {}
const AdminDetailsView = (_: Props) => {
  return (
    <Query query={GET_ADMIN}>
      {({loading, error, data: {getAdmin}}: any) => {
        if (loading) return 'Loading...';
        if (error) return `Error! ${error.message}`;
        return <AdminDetails admin={getAdmin} />;
      }}
    </Query>
  );
};

export default AdminDetailsView;

export const GET_ADMIN = gql`
  query getAdmin {
    getAdmin {
      id
      name
      email
      tel
    }
  }
`;
