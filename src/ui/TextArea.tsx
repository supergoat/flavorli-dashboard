import styled from 'styled-components/macro';

const TextArea = styled.textarea.attrs({
  autoComplete: 'off',
})`
  width: 100%;
  font-weight: 300;
  font-size: 16px;
  border: 1px solid var(--gallery);
  padding: 10px;
  border-radius: 3px;
  font-family: 'Lato';
  resize: none;
  &::placeholder {
    color: var(--osloGrey);
  }
`;
export default TextArea;
