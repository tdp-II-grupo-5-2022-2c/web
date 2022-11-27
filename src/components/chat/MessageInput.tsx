import React, {useEffect, useState} from "react";
import {useUser} from "../../context/UserContext";
import {getCurrentTimestamp, getMessages, sendMessage} from "../../firebase";
import {Button, Col, Form, Input, InputGroup, Row} from "reactstrap";
import "./styles.css";
import {MessageInfo} from "./MessageList";

type Props = {
  roomId: string | undefined
}

function MessageInput({roomId}: Props) {
  const user = useUser();
  const [value, setValue] = useState<string>('');
  const [messages, setMessages] = useState<MessageInfo[]>([]);
  const [errorMessage, setErrorMessage] = useState<string|undefined>(undefined);

  const MAX_LENGTH = 50;
  const MAX_PERIOD_MESSAGES_USER = 5;
  const MAX_PERIOD = 60; //1 minuto (segundos)

  const handleChange = (event: any) => {
    if (event.target.value.length <= MAX_LENGTH) {
      setValue(event.target.value);
    }
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    if (userLimitMessages()) {
      setErrorMessage("Debes esperar un momento antes de publicar más mensajes.");
    } else {
      setErrorMessage(undefined);
      sendMessage(roomId, user, value);
      setValue('');
    }
  }

  const userLimitMessages = () => {
    let lastMessages = messages.slice(-MAX_PERIOD_MESSAGES_USER);
    console.log("last messages: " + JSON.stringify(lastMessages));
    if (!lastMessages) 
      return false;

    lastMessages = lastMessages.filter((e) => {
      return e.user_id == user._id
    })

    console.log("user last messages: " + JSON.stringify(lastMessages));
    if (lastMessages.length < MAX_PERIOD_MESSAGES_USER)
      return false;

    for (let i = 0; i < lastMessages.length; i++) {
      console.log("messages: " + JSON.stringify(lastMessages.at(i)));
      if (!lastMessages.at(i)) {
        return false
      }

      // @ts-ignore
      let messageAge = getCurrentTimestamp().seconds - lastMessages.at(i)?.timestamp.seconds;
      console.log("Message: " + lastMessages.at(i)?.text +  " Message age: " + messageAge);
      if (messageAge > MAX_PERIOD) {
        return false;
      }
    }

    return true;
  }

  useEffect(() => {
    const unsubscribe = getMessages(roomId, setMessages);
    return unsubscribe;
  }, [roomId]);

  return (
      <>
        <Row className="justify-content-center">
          <Form onSubmit={handleSubmit} className="message-input-container mr-0 pr-0">
            <Row className="form-inline w-100">
              <InputGroup className="w-100">
                <Input
                    className="bg-translucent-darker text-white border-darker"
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
                    className="bg-darker text-white border-darker">
                  Enviar
                </Button>
              </InputGroup>
              <Row>
                <Col className="ml-1">
                  {errorMessage && <small className="text-white">{errorMessage}</small>}
                </Col>
              </Row>
            </Row>
          </Form>
        </Row>
      </>
  )
}

export default MessageInput;