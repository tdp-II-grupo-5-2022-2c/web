import React from 'react'
import {Button, Modal, ModalBody, ModalFooter} from "reactstrap";

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
        <div className="modal-header">
          <h1 className="modal-title fs-5">
            {header}
          </h1>
        </div>
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
