import React from 'react';
import styled, {css} from 'styled-components/macro';
import Label from '../ui/Label';
import Input from '../ui/Input';
import Colours from '../Colours';

import WarningIcon from '../assets/icons/warning.svg';

interface Props {
  label: string;
  error?: string;
  isRequiredError?: boolean;
  onChange: (e: any) => void;
  value: string;
  type?: string;
}
const FormInput = ({
  label,
  isRequiredError,
  error = '',
  onChange,
  value,
  type,
}: Props) => {
  return (
    <FormInputWrapper hasError={!!error || isRequiredError}>
      <Label htmlFor={label}>
        {label}
        <RequiredError show={isRequiredError} />
      </Label>
      <Input
        type={type}
        id={label}
        hasError={!!error}
        value={value}
        onChange={onChange}
      />
      <Error show={!!error}>{error}</Error>
    </FormInputWrapper>
  );
};

export default FormInput;

interface FormInputWrapperProps {
  hasError?: boolean;
  margin?: string;
}
const FormInputWrapper = styled.div`
  position: relative;
  ${Input} {
    transition: height 4000ms;
    ${(props: FormInputWrapperProps) =>
      props.hasError &&
      css`
        background: url(${WarningIcon}) no-repeat;
        background-size: 20px 20px;
        background-position: 98%;
      `}
  }
`;

interface ErrorProps {
  show?: boolean;
}
const RequiredError = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  color: ${Colours.red};
  transition: all 400ms;
  font-size: 10px;
  opacity: ${(props: ErrorProps) => (props.show ? 1 : 0)};
  transform: ${(props: ErrorProps) =>
    props.show ? 'translateY(0)' : 'translateY(30%)'};

  &:before {
    content: 'REQUIRED';
  }
`;

const Error = styled.div`
  display: flex;
  color: ${Colours.red};
  font-size: 10px;
  margin-top: 5px;
  text-transform: uppercase;
  transition: all 400ms;
  height: 15px;
  ${(props: ErrorProps) =>
    css`
      opacity: ${props.show ? 1 : 0};
      transform: ${props.show ? 'translateY(0)' : 'translateY(-5px)'};
    `}
`;
