import React from 'react'
import {Button, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";

export type CreateCommunityForm = {
  name: string,
  password: string
}

type Props = {
  header: string,
  body: string,
  form: CreateCommunityForm,
  isOpen: boolean,
  handleChange: ({ target: { name, value } }: any) => void,
  onAccept: () => void,
  onCancel?: () => void
}

// TODO: ver de volver esto un componente mas especifico de MyModal
const ModalForm = ({header, body, form, isOpen, handleChange, onAccept, onCancel} : Props) => {

  return (

      <Modal isOpen={isOpen}>
        <div className="modal-header">
          <h1 className="modal-title fs-5" id="exampleModalLabel">
            {header}
          </h1>
        </div>
        <div className="modal-body">
          {body}
          <hr/>
          <p>Nombre</p>
          <input placeholder={"Nombre comunidad"} name="name" value={form.name} onChange={handleChange}/>
          <p>Password</p>
          <input placeholder={"Contraseña comunidad"} name="password" value={form.password} onChange={handleChange}/>
        </div>
        <div className="modal-footer">
          <Button color="primary" onClick={onAccept}>Crear comunidad</Button>
          {onCancel && <Button color="secondary" onClick={onCancel}>Cancelar</Button>}
        </div>
      </Modal>

  )
}

export default ModalForm;
