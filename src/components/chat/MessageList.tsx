import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {getMessages} from "../../firebase";
import {useUser} from "../../context/UserContext";
import {List} from "reactstrap";
import "./styles.css";


type Props = {
  roomId: string | undefined
}

export type MessageInfo = {
  id: string,
  user_id: number,
  displayName: string,
  text: string,
  timestamp: string
}

function MessageList({roomId}: Props) {
  const [messages, setMessages] = useState<MessageInfo[]>([]);
  const user = useUser();
  const containerRef = useRef(null);

  useEffect(() => {
    const unsubscribe = getMessages(roomId, setMessages);
    return unsubscribe;
  }, [roomId]);

  useLayoutEffect(() => {
    if (containerRef.current) {
      // @ts-ignore
      //TODO: Debería mover el scroll del chat solo, está moviendo también el de toda la pagina.
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
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