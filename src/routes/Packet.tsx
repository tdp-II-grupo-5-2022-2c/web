// @ts-nocheck
import React from "react";
import {Card, CardImg, CardBody, Button, Col, Row, Container, Fade} from "reactstrap";
import { useNavigate } from 'react-router-dom';
import '../assets/css/Packet.css';

function Packet() {
  const navigate = useNavigate();

  const openPacket = (event) => {
    navigate('/packet/open');
  }

  return (
    <>
      <Container fluid className="packet-background">
        <Row className="h-100 justify-content-center align-items-center">
          <Col lg={{size: "auto"}} className="mt-5 col-10 col-sm-5 col-md-5 col-lg-5 col-xl-5">
            <Fade appear={true} timeout={500}>
              <Card className="bg-transparent border-0 mx-auto" style={{ width: "18rem" }}>
                <CardImg
                    alt="..."
                    src={require("../assets/img/packet.png")}
                    top
                />
                <CardBody className="text-center">
                  <Button
                      color="primary"
                      size="md"
                      onClick={openPacket}
                  >
                    Abrir
                  </Button>
                </CardBody>
              </Card>
            </Fade>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default Packet;