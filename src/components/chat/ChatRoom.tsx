import {Card} from "reactstrap";
import MessageInput from "./MessageInput";
import "./styles.css"
import MessageList from "./MessageList";
import '../../assets/plugins/nucleo/css/nucleo.css'

type Props = {
  roomId: string | undefined
}

function ChatRoom({roomId}: Props) {
  return (
      <>
        <Card className="messages-container card-translucent container-fluid" fluid>
          <MessageList roomId={roomId}/>
          <MessageInput roomId={roomId}/>
        </Card>
      </>
  )
}

export default ChatRoom;
