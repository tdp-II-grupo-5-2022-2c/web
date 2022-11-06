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

  return (
    <React.Fragment>
      <Container>
        <Row>
          <Col>
            <Card className={`bg-transparent border-0 mx-auto floating`}
                  style={{...globalPacketStyles.packet, ...style, opacity: _opacity}}
                  onClick={onOpenPacket}
            >
              {/*{!loading && <span style={{fontSize: 25}}*/}
              {/*          className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-gradient-gray">*/}
              {/*  &nbsp;{unopenedPacketsQty}&nbsp;*/}
              {/*</span>}*/}
              <CardImg
                alt="..."
                src={require("../assets/img/packet.png")}
                top
                style={{filter: (loading? "brightness(0.5)" : "brightness(1)")}}
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
            </Card>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  )
}

export default Packet;
