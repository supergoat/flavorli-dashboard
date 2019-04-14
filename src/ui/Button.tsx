import styled from 'styled-components/macro';

interface Props {
  secondary?: boolean;
  width?: string;
}
const Button = styled.button`
  font-size: 16px;
  padding: 12px;
  border-radius: 4px;
  border: none;
  box-shadow: 1px 1px 4px #bbb;
  outline: none;
  background: ${(props: Props) =>
    props.secondary ? 'var(--white)' : 'var(--oxfordBlue)'};
  color: ${(props: Props) =>
    props.secondary ? 'var(--oxfordBlue)' : 'var(--white)'};
  width: ${(props: Props) => props.width || 'auto'};
`;

export default Button;
