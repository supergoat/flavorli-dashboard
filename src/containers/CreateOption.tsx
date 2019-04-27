import React from 'react';
import UpsertOption from './UpsertOption';

interface Props {
  onCancel: any;
  onCreate: any;
}

const CreateOption = ({onCreate, onCancel}: Props) => {
  return <UpsertOption option={{}} onSave={onCreate} onCancel={onCancel} />;
};

export default CreateOption;
