import React from 'react';
import styled, {css} from 'styled-components/macro';
import Label from '../ui/Label';
import Input from '../ui/Input';
import Colours from '../Colours';

import WarningIcon from '../assets/icons/warning.svg';

interface Props {
  label: string;
  name: string;
  errors: Map<string, string>;
  clearErrors: (errors: string[]) => void;
  onChange: (e: any) => void;
  value: string;
  type?: string;
}
const FormInput = ({
  label,
  name,
  errors,
  clearErrors,
  onChange,
  value,
  type,
}: Props) => {
  const hasError = errors.has(name);
  return (
    <FormInputWrapper hasError={hasError}>
      <Label htmlFor={label}>
        {label}
        <RequiredError show={errors.get(name) === 'required'} />
      </Label>
      <Input
        type={type}
        id={label}
        hasError={hasError}
        value={value}
        onChange={(e: any) => {
          clearErrors([name]);
          onChange(e);
        }}
      />
      <Error show={hasError}>
        {errors.get(name) !== 'required' && errors.get(name)}
      </Error>
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
        background-color: ${Colours.white};
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
