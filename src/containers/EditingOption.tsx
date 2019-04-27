import React from 'react';
import {RouteComponentProps} from '@reach/router';
import UpsertOption from '../containers/UpsertOption';

interface Props extends RouteComponentProps {
  option: any;
  onSave: any;
  onCancel: any;
}
const EditingOption = ({option, onSave, onCancel}: Props) => {
  return <UpsertOption option={option} onSave={onSave} onCancel={onCancel} />;
};

export default EditingOption;
