// @ts-nocheck
import React, {Component} from "react";
import {Card, CardImg, CardBody, Button, Col, Row, Container, Fade} from "reactstrap";

class Packet extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  openPacket(event) {
    console.log("Opening packet"); //TODO: Redirect to open packet
  }

  render() {
    return (
      <>
        <Container fluid className="packet-background">
          <Row className="justify-content-center ">
            <Col lg={{size: "auto"}} className="mt-5 col-10 col-sm-5 col-md-5 col-lg-5 col-xl-5">
              <Fade appear={true} timeout={500} className="offset-md-3 offset-lg-3 offset-xl-3">
                <Card className="bg-transparent border-0">
                  <CardImg
                      alt="..."
                      src={require("../assets/img/packet.png")}
                      top
                  />
                  <CardBody className="text-center">
                    <Button
                        color="primary"
                        size="md"
                        onClick={this.openPacket}
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
}

export default Packet;