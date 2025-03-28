/*
 * This file is part of Cockpit-shared-components.
 *
 * Copyright (C) 2025 Tobias Vale
 *
 * Cockpit-shared-components is free software; you can redistribute it and/or modify it
 * under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 *
 * Cockpit-shared-components is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with Cockpit; If not, see <http://www.gnu.org/licenses/>.
 */

import React, { ReactNode } from 'react';
import {
	Button,
  Icon,
	Modal,
	ModalVariant,
  ModalHeader,
  ModalBody,
  ModalFooter
} from '@patternfly/react-core';

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
      >
        <ModalHeader>
          Confirm action
        </ModalHeader>
        <ModalBody>
          {message}
        </ModalBody>
        <ModalFooter>
          <Button key="confirm" variant={variant} onClick={confirmAction}>
            Confirm
          </Button>
          <Button key="cancel" variant="link" onClick={handleModalToggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}