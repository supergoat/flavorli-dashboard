import styled from 'styled-components/macro';

interface Props {
  secondary?: boolean;
  danger?: boolean;
  width?: string;
}
const Button = styled.button`
  font-size: 16px;
  font-weight: ${(props: Props) =>
    props.secondary || props.danger ? 'bold' : 'normal'};
  padding: 12px;
  border-radius: 4px;
  border: none;
  box-shadow: 1px 1px 4px #bbb;
  outline: none;
  background: ${(props: Props) => {
    if (props.secondary) return 'var(--white)';
    if (props.danger) return 'var(--darkRed)';
    return 'var(--oxfordBlue)';
  }};
  color: ${(props: Props) =>
    props.secondary ? 'var(--oxfordBlue)' : 'var(--white)'};
  width: ${(props: Props) => props.width || 'auto'};
  align-self: flex-start;
`;

export default Button;
