import React, {useState, useEffect, FormEvent} from 'react';
import {MutationFn} from 'react-apollo';
import {ApolloError} from 'apollo-client';
import styled from 'styled-components/macro';
import FormInput from './FormInput';
import Button from '../ui/Button';

interface Props {
  login: MutationFn<any, {email: string; password: string}>;
  loading: boolean;
  error?: ApolloError | undefined;
}
const LoginForm = ({login, loading, error}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    if (error) {
      const copyErrors = new Map(errors);
      copyErrors.set(
        'invalid-login',
        'The username or password you have entered is incorrect',
      );
      setErrors(copyErrors);
    }
  }, [error]);

  const isFormValid = () => {
    let errors: Map<string, string> = new Map();

    if (email.trim() === '') errors.set('email', 'Email is required');

    if (password.trim() === '') errors.set('password', 'Password is required');

    const isValid = errors.size === 0;
    setErrors(errors);

    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid()) return;

    login({
      variables: {
        email,
        password,
      },
    });
  };

  const clearError = (error: string) => {
    const copyErrors = new Map(errors);
    copyErrors.delete(error);
    setErrors(copyErrors);
  };

  return (
    <LoginFormWrapper>
      <Form onSubmit={handleSubmit}>
        <Logo>flavorli</Logo>

        <InputFields>
          <FormInput
            label="Email"
            onChange={e => {
              clearError('email');
              setEmail(e.currentTarget.value);
            }}
            type="email"
            value={email}
            isRequiredError={errors.has('email')}
          />

          <FormInput
            label="Password"
            onChange={e => {
              clearError('password');
              clearError('invalid-login');
              setPassword(e.currentTarget.value);
            }}
            type="password"
            value={password}
            isRequiredError={errors.has('password')}
            error={errors.get('invalid-login')}
          />
        </InputFields>

        <Button width="100%">{loading ? 'Loging in...' : 'Login'}</Button>
        <ForgotPassword>Forgot your password?</ForgotPassword>
      </Form>
    </LoginFormWrapper>
  );
};

export default LoginForm;

const LoginFormWrapper = styled.div``;

const Logo = styled.h1`
  font-family: Pacifico;
  font-size: 35px;
  margin-bottom: 30px;
`;

const Form = styled.form`
  margin: 0 auto;
  margin-top: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 300px;
`;

const InputFields = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

const ForgotPassword = styled.p`
  margin-top: 30px;
`;
