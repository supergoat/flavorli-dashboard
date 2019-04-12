import React, {useState, FormEvent} from 'react';
import {RouteComponentProps} from '@reach/router';
import styled from 'styled-components/macro';
import FormInput from '../ui/FormInput';
import Button from '../ui/Button';

interface Props extends RouteComponentProps {}
const Login = (_: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Map<String, String>>(new Map());

  const isFormValid = () => {
    let errors: Map<String, String> = new Map();

    if (email.trim() === '') errors.set('email', 'Email is required');

    if (password.trim() === '') errors.set('password', 'Password is required');

    const isValid = errors.size === 0;
    setErrors(errors);

    return isValid;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid()) return;
  };

  const clearError = (error: string) => {
    const copyErrors = new Map(errors);
    copyErrors.delete(error);
    setErrors(copyErrors);
  };

  return (
    <LoginWrapper>
      <LoginForm onSubmit={handleSubmit}>
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
            error={errors.has('email') ? 'Incorrect Email' : ''}
          />

          <FormInput
            label="Password"
            onChange={e => {
              clearError('password');
              setPassword(e.currentTarget.value);
            }}
            type="password"
            value={password}
            isRequiredError={errors.has('password')}
            error={errors.has('password') ? 'Incorrect Password' : ''}
          />
        </InputFields>

        <Button width="100%">Login</Button>
        <ForgotPassword>Forgot your password?</ForgotPassword>
      </LoginForm>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled.div``;

const Logo = styled.h1`
  font-family: Pacifico;
  font-size: 35px;
  margin-bottom: 30px;
`;

const LoginForm = styled.form`
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
