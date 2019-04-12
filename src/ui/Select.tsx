import React, {ChangeEvent} from 'react';
import styled from 'styled-components/macro';

interface Props {
  children: any;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
  name: string;
  type: string;
}

const Select = ({children, onChange, checked, name, type}: Props) => {
  return (
    <SelectionWrapper checked={checked}>
      {children}

      <input
        onChange={onChange}
        checked={checked || false}
        name={name}
        type={type}
      />
    </SelectionWrapper>
  );
};

export default Select;

interface SelectionWrapperProps {
  checked: boolean;
}
const SelectionWrapper = styled.label`
  display: flex;
  padding: 15px 10px;
  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
  border: 1px solid var(--gallery);
  border-radius: 3px;
  border: ${(props: SelectionWrapperProps) =>
    props.checked ? '1px solid var(--osloGrey)' : '1px solid trasparent'};
`;
