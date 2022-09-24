import React from 'react'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

type Props = {
  header: string,
  body: string,
  isOpen: boolean;
  onAccept: () => void
  onCancel?: () => void
}

const MyModal = ({header, body, isOpen, onAccept, onCancel} : Props) => {

  return (
    <div>
      <Modal isOpen={isOpen}>
        <ModalHeader>{header}</ModalHeader>
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onAccept}>
            OK!
          </Button>{' '}
          {onCancel && <Button color="secondary" onClick={onCancel}>
            Cancel
          </Button>}
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default MyModal;
