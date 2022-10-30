import React from 'react'
import {Button, Modal, ModalBody, ModalFooter} from "reactstrap";

type Props = {
  header: string,
  body: any,
  isOpen: boolean;
  onAccept: () => void
  onCancel?: () => void
  size?: string
}

export const MyModal = ({header, body, isOpen, onAccept, onCancel, size} : Props) => {

  return (
    <div>
      <Modal isOpen={isOpen} size={size || "md"}>
        <div className="modal-header">
          <h1 className="modal-title fs-5">
            {header}
          </h1>
        </div>
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onAccept}>
            Aceptar
          </Button>{' '}
          {onCancel && <Button color="secondary" onClick={onCancel}>
            Cancel
          </Button>}
        </ModalFooter>
      </Modal>
    </div>
  )
}

export type IModal = {
  header: string,
  body: string
}

type Props2 = {
  header: string
  children: JSX.Element,
  isOpen: boolean;
  onAccept: () => void
  onCancel?: () => void
}

export const MyModal2 = ({header, children, isOpen, onAccept, onCancel} : Props2) => {

  return (
    <div>
      <Modal isOpen={isOpen}>
        <div className="modal-header">
          <h1 className="modal-title fs-5">
            {header}
          </h1>
        </div>
        <ModalBody>
          {children}
        </ModalBody>
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

