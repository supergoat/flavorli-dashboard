import styled from 'styled-components/macro';

interface InputProps {
  hasError?: boolean;
}
const Input = styled.input.attrs({
  autoComplete: 'off',
})`
  width: 100%;
  font-weight: 300;
  font-size: 16px;
  border: none;
  box-shadow: ${(props: InputProps) =>
      props.hasError ? '0 0 0 1px var(--darkRed)' : '0 0 0 1px #ddd'},
    0 2px 4px rgba(0, 0, 0, 0.2);

  transition: box-shadow 0.08s ease-in, color 0.08s ease-in;
  padding: 10px;
  border-radius: 4px;
  font-family: 'Lato';
  outline: none;
  &::placeholder {
    color: ${(props: InputProps) =>
      props.hasError ? 'var(--darkRed)' : 'var(--osloGrey)'};
  }
`;
export default Input;
