import React from 'react'
import {
  Button,
  Form,
  FormGroup,
  Input, InputGroup,
  InputGroupText,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";

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

const CreateCommunityModal = ({header, body, form, isOpen, handleChange, onAccept, onCancel} : Props) => {

  return (
      <Modal isOpen={isOpen}>
        <ModalHeader>
          <h1 className="modal-title fs-5" id="exampleModalLabel">
            {header}
          </h1>
        </ModalHeader>
        <ModalBody>
          <div className="text-center mb-4">
            {body}
          </div>
          <Form>
            <FormGroup>
              <Label>Nombre</Label>
              <InputGroup>
                <InputGroupText>
                  <i className="ni ni-badge" />
                </InputGroupText>
                <Input
                  placeholder="Nombre de la comunidad"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
              </InputGroup>
            </FormGroup>
            <FormGroup>
              <Label>Contraseña</Label>
              <InputGroup>
                <InputGroupText>
                  <i className="ni ni-lock-circle-open" />
                </InputGroupText>
                <Input
                    placeholder="Contraseña de la comunidad"
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                />
              </InputGroup>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={onAccept} disabled={!form.name || !form.password || form.name.length === 0 || form.password.length === 0}>Crear comunidad</Button>
          {onCancel && <Button color="secondary" onClick={onCancel}>Cancelar</Button>}
        </ModalFooter>
      </Modal>

  )
}

export default CreateCommunityModal;
