import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {getMessages} from "../../firebase";
import {useUser} from "../../context/UserContext";
import {Col, List, Row} from "reactstrap";
import "./styles.css";


type Props = {
  roomId: string | undefined
}

type Message = {
  id: string,
  user_id: number,
  displayName: string,
  text: string,
  timestamp: string
}

function MessageList({roomId}: Props) {
  const [messages, setMessages] = useState<Message[]>([]);
  const user = useUser();
  const containerRef = useRef(null);

  useEffect(() => {
    const unsubscribe = getMessages(roomId, setMessages);
    return unsubscribe;
  }, [roomId]);

  useLayoutEffect(() => {
    if (containerRef.current) {
      // @ts-ignore
      // TODO: La idea de esto es que me posicione al final el chat, no anda
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
      console.log("current container ref")
    }
  })

  return (
      <>
        <div className="message-list-container col" ref={containerRef}>
          <List type="unstyled" className="message-list">
            {messages.map((x) => (
                <Message
                    key={x.id}
                    message={x}
                    isOwnMessage={x.user_id === user._id}
                />
            ))}
          </List>
        </div>
      </>
  );
}

function Message({message, isOwnMessage}: {message: any, isOwnMessage: boolean}) {
  const {displayName, text} = message;
  return (
      <li className={['message', isOwnMessage && 'own-message'].join(' ')}>
        <h4 className="sender">{isOwnMessage ? 'Tú' : displayName}</h4>
        <span>{text}</span>
      </li>
  )
}

export default MessageList;