import React, {useState} from "react";
import {useUser} from "../../context/UserContext";
import {sendMessage} from "../../firebase";
import {Button, Col, Form, FormGroup, Input, InputGroup, Row} from "reactstrap";
import "./styles.css";

type Props = {
  roomId: string | undefined
}

function MessageInput({roomId}: Props) {
  const user = useUser();
  const [value, setValue] = useState<string>('');

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
        <Form onSubmit={handleSubmit} className="message-input-container">
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
                  disabled={value.length < 1}
                  color="primary">
                Enviar
              </Button>
            </InputGroup>
          </Row>
        </Form>
      </>
  )
}

export default MessageInput;