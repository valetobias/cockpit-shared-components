import React, { ReactNode } from 'react';
import {
	Button,
  Icon
} from '@patternfly/react-core';
import {
	Modal,
	ModalVariant
} from '@patternfly/react-core/deprecated';

interface ConfirmActionProps {
  action: () => void;
  openingValidation?: () => boolean;
  variant?: "link" | "primary" | "secondary" | "tertiary" | "danger" | "warning" | "plain" | "control" | undefined;
  message: string;
  buttonText: string;
  buttonIcon?: ReactNode;
}


export const ConfirmActionModal: React.FunctionComponent<ConfirmActionProps> = ({ action, variant='primary', message, buttonText, openingValidation=()=>true, buttonIcon }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  function tryOpen() {
    if (openingValidation()) {
      handleModalToggle();
    }
  }

  function confirmAction() {
    handleModalToggle();
    action();
  }

  return (
    <React.Fragment>
      <Button variant={variant} onClick={tryOpen}>
        {buttonIcon && <Icon>{buttonIcon}</Icon>} {buttonText}
      </Button>
      <Modal
        variant={ModalVariant.small}
        title="Confirm action"
        isOpen={isModalOpen}
        onClose={handleModalToggle}
        actions={[
          <Button key="confirm" variant={variant} onClick={confirmAction}>
            Confirm
          </Button>,
          <Button key="cancel" variant="link" onClick={handleModalToggle}>
            Cancel
          </Button>
        ]}
      >
        {message}
      </Modal>
    </React.Fragment>
  );
}