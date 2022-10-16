import {Container, Row} from "reactstrap";
import MessageInput from "./MessageInput";
import "./styles.css"
import MessageList from "./MessageList";

type Props = {
  roomId: string | undefined
}

function ChatRoom({roomId}: Props) {
  console.log("ID: " + roomId)

  return (
      <>
        <h2>💬 Chat</h2>
        <Container className="messages-container card-translucent container-fluid" fluid>
          {/*<Row>*/}
            <MessageList roomId={roomId}/>
          {/*</Row>*/}
          {/*<Row>*/}
            <MessageInput roomId={roomId}/>
          {/*</Row>*/}
        </Container>
      </>
  )
}

export default ChatRoom;