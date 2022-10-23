import {Card, Container} from "reactstrap";
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
        <Card className="messages-container card-translucent container-fluid" fluid>
          <MessageList roomId={roomId}/>
          <MessageInput roomId={roomId}/>
        </Card>
      </>
  )
}

export default ChatRoom;