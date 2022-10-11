import {Link, useParams} from "react-router-dom";
import {Container} from "reactstrap";
import {NoUsersCommunity} from "./Community";

type Props = {
  id: number | undefined
}

function ChatRoom({id}: Props) {
  console.log("ID: " + id)

  return (
      <>
        <h2>💬 Chat</h2>
        <Container className="messages-container">

        </Container>
      </>
  )
}

export default ChatRoom;