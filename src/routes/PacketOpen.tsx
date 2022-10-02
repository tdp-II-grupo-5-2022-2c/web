import React from "react";
import {Row, Container, Col, Fade, Button} from "reactstrap";
import Sticker from "../components/Sticker";
import {getArgentinaPlayersData} from "../data/playersData";
import {useNavigate} from "react-router-dom";

function PacketOpen() {
  const fadeInTimeout = 600;
  const navigate = useNavigate();

  const getStickers = () => {
    return getArgentinaPlayersData().slice(0, 5)
  }

  const closePacket = () => {
    navigate('/my-stickers');
  }

  return (
      <>
        <Container fluid>
          <Row className="m-5 h-100 justify-content-center">
            {getStickers().map((player, index) =>
                <Col key={index}
                     className={`m-3 col-10 col-sm-10 col-md-10 col-lg-3 col-xl-3 d-flex justify-content-center ${index % 2 ? "align-bottom" : "align-top"}`}>
                  <Fade appear={true} timeout={index * fadeInTimeout}>
                    <Sticker
                        player={player}
                    />
                  </Fade>
                </Col>
            )}
          </Row>
          <Row className="justify-content-center">
            <Col className="mb-3 col-6 col-sm-6 col-md-3 col-lg-3 col-xl-3 d-flex justify-content-center">
              <Button size="lg" color="success" onClick={closePacket}>OK</Button>
            </Col>
          </Row>
        </Container>
      </>
  )
}

export default PacketOpen;
