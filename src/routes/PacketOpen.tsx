import React, {useState} from "react";
import {Row, Container, Col, Fade, Button, CardText} from "reactstrap";
import Sticker, {IBackEndSticker} from "../components/Sticker";
import {useNavigate} from "react-router-dom";
import MyNavbar from "../components/MyNavbar";
import Packet from "../components/Packet";
import client from "../services/config";
import {useUser} from "../context/UserContext";
import {ROUTES} from "./RoutesNames";
import MyModal from "../components/MyModal";

const PACKET_OPENING_ERROR_MESSAGES = {
  NOT_ENOUGH_STICKERS: "En este momento no tenemos paquetes disponibles",
  SERVER_ERROR: "Ha ocurrido un error al intentar abrir el paquete"
}

function PacketOpen() {
  const user = useUser();
  /*Tiene las 5 figuritas que se muestran*/
  /*TODO: ojo que este estado es local, no actualiza el user context
  *  este se actualiza recien en el momento que se hace un restore*/
  const [openedPacketStickers, setOpenedPacketStickers] = useState<IBackEndSticker[]>([])
  const [showPacketOpeningError, setShowPacketOpeningError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const fadeInTimeout = 600;
  const navigate = useNavigate();

  const openPacket = async () => {
    const requestBody = {
      user_id: user.id
    }
    try{
      const {data: openedPacketStickers}  = await client.post(`/stickers/package`, requestBody);
      setOpenedPacketStickers(openedPacketStickers)

    } catch (error : any){
      // TODO: meter toda la logica de manejo de error en un servicio global o algo asi
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        if(error.response.data?.detail === "Could not return daily package. Exception: [OPEN_PACKAGE] error: No stickers at the moment to create a package"){
          setErrorMessage(PACKET_OPENING_ERROR_MESSAGES.SERVER_ERROR)
        }
      } else if (error.request) {
        console.log(error.request);
      } else {
        setErrorMessage(PACKET_OPENING_ERROR_MESSAGES.SERVER_ERROR)
        console.log('Error', error.message);
      }
      console.log(error.config);
      setShowPacketOpeningError(true)
    }
  }

  const goToMyStickers = () => {
    navigate(ROUTES.MYSTICKERS);
  }

  const closeshowPacketOpeningError = () => {
    setShowPacketOpeningError(false)
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
              <Packet onOpenPacket={openPacket} unopenedPacketsQty={1}/>
            </Col>
            <Col className="d-flex justify-content-center" >
              <Button size="lg" color="success" onClick={goToMyStickers}>Volver a Mis Figus</Button>
            </Col>
          </Row>
        </Container>
        <MyModal header={"Error al abrir paquete"}
                 body={errorMessage}
                 isOpen={showPacketOpeningError}
                 onAccept={closeshowPacketOpeningError}/>
      </React.Fragment>
  )
}

export default PacketOpen;
