import React from 'react';
import gql from 'graphql-tag';
import {Mutation, ApolloConsumer, MutationFn} from 'react-apollo';
import {RouteComponentProps, navigate} from '@reach/router';
import LoginForm from '../components/LoginForm';
import useErrors from '../_utils/useErrors';

interface Props extends RouteComponentProps {}
const Login = (_: Props) => {
  const [errors, setErrors, clearErrors] = useErrors();

  const isFormValid = (email: string, password: string) => {
    let localErrors: [string, string][] = [];

    if (email.trim() === '') localErrors.push(['email', 'required']);
    if (password.trim() === '') localErrors.push(['password', 'required']);

    setErrors(localErrors);
    const isValid = localErrors.length === 0;

    return isValid;
  };

  const handleSubmit = async (
    email: string,
    password: string,
    loginAdmin: MutationFn<any, {email: string; password: string}>,
  ) => {
    if (!isFormValid(email, password)) return;

    loginAdmin({
      variables: {
        email,
        password,
      },
    });
  };

  const handleError = () => {
    setErrors([
      ['password', 'The username or password you have entered is incorrect'],
    ]);
  };

  const onLoginSuccess = ({token}: {token: string}, client: any) => {
    localStorage.setItem('flavorli-admin-token', token);
    client.writeData({data: {isLoggedIn: true}});
    navigate('/');
  };

  return (
    <ApolloConsumer>
      {client => (
        <Mutation
          mutation={LOG_IN}
          onCompleted={({loginAdmin}: any) =>
            onLoginSuccess(loginAdmin, client)
          }
          onError={handleError}
        >
          {(loginAdmin: any, {loading, error}: any) => {
            return (
              <LoginForm
                errors={errors}
                clearErrors={clearErrors}
                loading={loading}
                onLogin={(email: string, password: string) =>
                  handleSubmit(email, password, loginAdmin)
                }
              />
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
