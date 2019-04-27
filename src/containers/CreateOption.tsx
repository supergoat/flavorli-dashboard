import React from 'react';
import {RouteComponentProps} from '@reach/router';
import Option from '../components/Option';

interface Props extends RouteComponentProps {
  menuItemId?: string;
  onCancel: any;
  onSave: any;
}
const CreateOption = ({onSave, onCancel}: Props) => {
  return <Option option={{}} onSave={onSave} onCancel={onCancel} />;
};

export default CreateOption;
