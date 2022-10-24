import React, {useState} from "react";
import {useUser} from "../../context/UserContext";
import {sendMessage} from "../../firebase";
import {Button, Form, Input, InputGroup, Row} from "reactstrap";
import "./styles.css";

type Props = {
  roomId: string | undefined
}

function MessageInput({roomId}: Props) {
  const user = useUser();
  const [value, setValue] = useState<string>('');
  const MAX_LENGTH = 50;

  const handleChange = (event: any) => {
    setValue(event.target.value);
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    sendMessage(roomId, user, value).then((response) => {
      console.log("Send message response... " + JSON.stringify(response));
    });
    setValue('');
  }

  return (
      <>
        <Form onSubmit={handleSubmit} className="message-input-container mr-0 pr-0">
          <Row className="form-inline w-100">
            <InputGroup className="w-100">
              <Input
                  type="text"
                  placeholder="Escribe un mensaje"
                  value={value}
                  onChange={handleChange}
                  required
                  minLength={1}
              />
              <Button
                  type="submit"
                  disabled={value.length < 1 || value.length > MAX_LENGTH}
                  color="primary">
                Enviar
              </Button>
            </InputGroup>
            {value.length > MAX_LENGTH && <small className="text-danger">Este es un mensaje muy largo que supera el límite</small>}
          </Row>
        </Form>
      </>
  )
}

export default MessageInput;