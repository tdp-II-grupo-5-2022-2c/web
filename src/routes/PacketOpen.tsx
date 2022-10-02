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
import {ROUTES} from "./RoutesNames";

function PacketOpen() {
  const user = useUser();
  /*Tiene las 5 figuritas que se muestran*/
  /*TODO: ojo que este estado es local, no actualiza el user context
  *  este se actualiza recien en el momento que se hace un restore*/
  const [openedPacketStickers, setOpenedPacketStickers] = useState<IBackEndSticker[]>([])

  const fadeInTimeout = 600;
  const navigate = useNavigate();

  const openPacket = async () => {
    const requestBody = {
      user_id: user.id
    }
    const {data: openedPacketStickers}  = await client.post(`/stickers/package`, requestBody);
    setOpenedPacketStickers(openedPacketStickers)
  }

  const goToMyStickers = () => {
    navigate(ROUTES.MYSTICKERS);
  }

  return (
      <React.Fragment>
        <MyNavbar/>
        <Container >
          <Row className="bg-light border m-5 h-100" >
            {openedPacketStickers.length > 0 && openedPacketStickers.map((player, index) =>
                <Col className="d-flex justify-content-center" key={index} >
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
          <Row className="bg-light border align-items-center m-5" >
            <Col className="justify-content-center" >
              {/*TODO: user deberia tener un atributo con la cantidad de paquetes a abrir*/}
              <Packet onOpenPacket={openPacket} unopenedPacketsQty={2}/>
            </Col>
            <Col className="d-flex justify-content-center" >
              <Button size="lg" color="success" onClick={goToMyStickers}>Volver a Mis Figus</Button>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
  )
}

export default PacketOpen;
