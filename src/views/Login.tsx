import React from 'react';
import gql from 'graphql-tag';
import {Mutation, ApolloConsumer} from 'react-apollo';
import {RouteComponentProps, navigate} from '@reach/router';
import LoginForm from '../components/LoginForm';

interface Props extends RouteComponentProps {}
const Login = (_: Props) => {
  return (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={LOG_IN}
          onCompleted={({loginAdmin}: any) => {
            const {token} = loginAdmin;
            localStorage.setItem('flavorli-admin-token', token);
            client.writeData({data: {isLoggedIn: true}});
            navigate('/');
          }}
        >
          {(loginAdmin: any, {loading, error}: any) => {
            return (
              <LoginForm login={loginAdmin} error={error} loading={loading} />
            );
          }}
        </Mutation>
      )}
    </ApolloConsumer>
  );
};

export default Login;

const LOG_IN = gql`
  mutation loginAdmin($email: String!, $password: String!) {
    loginAdmin(email: $email, password: $password) {
      token
    }
  }
`;
