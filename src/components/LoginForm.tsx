import React, {useState} from 'react';
import styled from 'styled-components/macro';
import FormInput from './FormInput';
import Button from '../ui/Button';

interface Props {
  onLogin: (email: string, password: string) => void;
  loading: boolean;
  errors: Map<string, string>;
  clearErrors: (errors: string[]) => void;
}
const LoginForm = ({onLogin, loading, errors, clearErrors}: Props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LoginFormWrapper>
      <Form
        onSubmit={e => {
          e.preventDefault();
          onLogin(email, password);
        }}
      >
        <Logo>flavorli</Logo>

        <InputFields>
          <FormInput
            name="email"
            label="Email"
            onChange={e => setEmail(e.currentTarget.value)}
            type="email"
            value={email}
            clearErrors={clearErrors}
            errors={errors}
          />

          <FormInput
            label="Password"
            name="password"
            onChange={e => setPassword(e.currentTarget.value)}
            type="password"
            value={password}
            clearErrors={clearErrors}
            errors={errors}
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
