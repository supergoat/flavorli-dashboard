import styled from 'styled-components/macro';
import Colours from '../Colours';

interface ErrorProps {
  show: boolean;
}

const Error = styled.div`
  display: flex;
  color: ${Colours.red};
  font-size: 10px;
  font-weight: bold;
  margin-top: 5px;
  text-transform: uppercase;
  transition: all 400ms;
  height: 15px;
  opacity: ${(props: ErrorProps) => (props.show ? 1 : 0)};
  transform: ${(props: ErrorProps) =>
    props.show ? 'translateY(0)' : 'translateY(-5px)'};
`;

export default Error;
