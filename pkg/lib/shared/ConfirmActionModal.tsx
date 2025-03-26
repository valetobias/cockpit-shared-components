import React from 'react';
import { Button, Modal, ModalVariant } from '@patternfly/react-core'

interface ConfirmActionProps {
  action: () => void;
  openingValidation: () => boolean;
  variant?: "link" | "primary" | "secondary" | "tertiary" | "danger" | "warning" | "plain" | "control" | undefined;
  message: string;
  buttonText: string;
}


export const ConfirmActionModal: React.FunctionComponent<ConfirmActionProps> = ({ action, variant='primary', message, buttonText, openingValidation }) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  function tryOpen() {
    if (openingValidation()) {
      handleModalToggle();
      action();
    }
  }

  return (
    <React.Fragment>
      <Button variant={variant} onClick={handleModalToggle}>
        {buttonText}
      </Button>
      <Modal
        variant={ModalVariant.small}
        title="Confirm action"
        isOpen={isModalOpen}
        onClose={handleModalToggle}
        actions={[
          <Button key="confirm" variant={variant} onClick={tryOpen}>
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