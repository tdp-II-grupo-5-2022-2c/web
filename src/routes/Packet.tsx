import React from "react";
import {Card, CardImg, CardBody, Button, Col, Row, Container, Fade} from "reactstrap";
import '../assets/css/Packet.css';

type Props = {
  onOpenPacket: () => void;
  unopenedPacketsQty: number
}

const Packet = ({onOpenPacket, unopenedPacketsQty} : Props) => {
  const _opacity = unopenedPacketsQty === 0 ? 0.4 : 1

  return (
    <React.Fragment>
      <Container >
        <Row>
          <Col>
            <Fade appear={true} timeout={500}>
              <Card className={`bg-transparent border-0 mx-auto`} style={{ width: "18rem", opacity: _opacity}}>
                <CardImg
                    alt="..."
                    src={require("../assets/img/packet.png")}
                    top
                />
                <CardBody className="text-center">
                  {unopenedPacketsQty > 0 && <Button
                      color="primary"
                      size="md"
                      onClick={() => {onOpenPacket()}}
                  >
                    Abrir paquete
                  </Button>}
                </CardBody>
              </Card>
            </Fade>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default Packet;
