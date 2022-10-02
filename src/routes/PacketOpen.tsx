import React, {useState} from "react";
import {Row, Container, Col, Fade, Button, CardText} from "reactstrap";
import Sticker, {IBackEndSticker} from "../components/Sticker";
import {getArgentinaPlayersData} from "../data/playersData";
import {useNavigate} from "react-router-dom";
import {debug} from "../res/globalStyles";
import MyNavbar from "../components/MyNavbar";
import Packet from "./Packet";
import client from "../services/config";
import {useUser} from "../context/UserContext";

function PacketOpen() {
  const user = useUser();
  /*Tiene las 5 figuritas que se muestran*/
  const [openedPacketStickers, setOpenedPacketStickers] = useState<IBackEndSticker[]>([])

  const fadeInTimeout = 600;
  const navigate = useNavigate();

  /*Todo: data del user que indica cuantos paquetes tiene para abrir?*/
  const hasUnopenedPackets = false

  const openPacket = async () => {
    const requestBody = {
      user_id: user.id
    }
    const {data: openedPacketStickers}  = await client.post(`/stickers/package`, requestBody);
    setOpenedPacketStickers(openedPacketStickers)
  }

  const goToMyStickers = () => {
    navigate('/my-stickers');
  }

  return (
      <React.Fragment>
        <MyNavbar/>
        <Container style={debug.containerRed}>
          <Row className="m-5 h-100" style={debug.containerBlue}>
            {openedPacketStickers.length > 0 && openedPacketStickers.map((player, index) =>
                <Col className="d-flex justify-content-center" key={index} style={debug.containerRed}>
                  <Fade appear={true} timeout={index * fadeInTimeout}>
                    <Sticker
                        player={player}
                    />
                  </Fade>
                </Col>
            )}
            {openedPacketStickers.length === 0 &&
                <Col className="d-flex justify-content-center">
                  <CardText>
                    Cuando abras un paquete podras ver las figuritas en esta sección
                </CardText>
                </Col>
            }
          </Row>
          <Row className="align-items-center" style={debug.containerBlue}>
            <Col className="justify-content-center" style={debug.container}>
              <Packet onOpenPacket={openPacket} unopenedPacketsQty={1}/>
            </Col>
            <Col className="d-flex justify-content-center" style={debug.container}>
              <Button size="lg" color="success" onClick={goToMyStickers}>OK</Button>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
  )
}

export default PacketOpen;
