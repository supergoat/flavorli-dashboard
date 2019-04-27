import React from 'react';
import {RouteComponentProps} from '@reach/router';
import Option from '../components/Option';

interface Props extends RouteComponentProps {
  menuItemId?: string;
  option: any;
  onCancel: any;
}
const EditingOption = ({option, onCancel}: Props) => {
  return (
    <Option option={option} onSave={newOption => {}} onCancel={onCancel} />
  );
};

export default EditingOption;
