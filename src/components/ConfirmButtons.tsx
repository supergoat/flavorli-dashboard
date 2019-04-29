import React from 'react';
import styled from 'styled-components/macro';

const ConfirmButtons = ({
  show,
  saving,
  onConfirm,
  onCancel,
}: {
  show: boolean;
  saving: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  return (
    <Buttons>
      {show && !saving && (
        <>
          <SaveButton
            src={require('../assets/icons/save.svg')}
            onClick={onConfirm}
          />
          <CancelButton
            src={require('../assets/icons/cancel.svg')}
            onClick={onCancel}
          />
        </>
      )}

      {saving && <Saving show={true}>Saving...</Saving>}
    </Buttons>
  );
};

export default ConfirmButtons;

const Buttons = styled.div`
  display: flex;
  align-items: center;
`;

const SaveButton = styled.img`
  width: 35px;
  height: 35px;
  cursor: pointer;
  z-index: 1;
`;

const CancelButton = styled.img`
  width: 35px;
  height: 35px;
  margin-left: 10px;
  cursor: pointer;
  z-index: 1;
`;

interface SavingProps {
  show?: boolean;
}
const Saving = styled.div`
  display: flex;
  font-size: 14px;
  margin-top: 5px;
  text-transform: uppercase;
  transition: all 400ms;
  height: 15px;
  opacity: ${(props: SavingProps) => (props.show ? 1 : 0)};
  transform: ${(props: SavingProps) =>
    props.show ? 'translateY(0)' : 'translateY(-5px)'};
`;
