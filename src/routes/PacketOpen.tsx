// @ts-nocheck
import React from "react";
import {Row, Container, Col, Fade} from "reactstrap";
import Sticker from "../components/Sticker";
import {getArgentinaPlayersData} from "../data/playersData";

function PacketOpen() {
  const fadeInTimeout = 600;

  const getStickers = () => {
    return getArgentinaPlayersData().slice(0,5)
  }

  return (
      <>
        <Container fluid>
          <Row className="m-5 h-100 justify-content-center">
            {getStickers().map((player, index) =>
              <Col key={index} className={`m-3 col-10 col-sm-10 col-md-10 col-lg-3 col-xl-3 d-flex justify-content-center ${index % 2 ? "align-bottom" : "align-top"}`}>
                <Fade appear={true} timeout={index * fadeInTimeout}>
                  <Sticker
                      player={player}
                      readOnly={true}
                  />
                </Fade>
              </Col>
            )}
          </Row>
        </Container>
      </>
  )
}

export default PacketOpen;