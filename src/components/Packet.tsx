import React from "react";
import {Card, CardImg, CardBody, Button, Col, Row, Container, CardImgOverlay, Spinner, CardText} from "reactstrap";
import '../assets/css/Packet.css';
import {globalPacketStyles} from "../res/globalStyles";

type Props = {
  onOpenPacket: () => void,
  unopenedPacketsQty: number,
  style?: object,
  loading?: boolean
}

const Packet = ({onOpenPacket, unopenedPacketsQty, style = {}, loading = false}: Props) => {
  const _opacity = unopenedPacketsQty === 0 ? 0.4 : 1

  const noPackets = () => {
    return unopenedPacketsQty === 0;
  }

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col>
            <Card className={`bg-transparent border-0 mx-auto ${noPackets() ? "" : "floating"}`}
                  style={{...globalPacketStyles.packet, ...style}}
                  onClick={onOpenPacket}
            >
              <CardImg
                alt="..."
                src={require("../assets/img/packet.png")}
                top
                style={{filter: (loading || noPackets()? "brightness(0.5)" : "brightness(1)"), opacity: _opacity}}
              />
              <CardImgOverlay>
                {loading && <Row className="align-items-center d-flex h-75">
                  <span className="text-center">
                    <Spinner style={{height: '3rem', width: '3rem'}}
                             className="d-flex img-center" color="light" type="grow">
                    </Spinner>
                  </span>
                </Row>}
              </CardImgOverlay>
              {!loading && <CardImgOverlay>
                 <span style={{fontSize: 25}}
                                   className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-gradient-indigo">
                &nbsp;{unopenedPacketsQty}&nbsp;
              </span>
              </CardImgOverlay>}
              { noPackets() &&
                  <CardImgOverlay className="align-items-center d-flex justify-content-center">
                    <h3 className="text-white text-center">No tienes paquetes</h3>
                  </CardImgOverlay>
              }
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default Packet;
