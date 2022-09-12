// @ts-nocheck
import React, {Component} from "react";
import {Card, CardImg, CardBody, Button, Col, Row, Container, Fade} from "reactstrap";

class Packet extends Component {
  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <>
        <Container fluid className="packet-background">
          <Row className="justify-content-center">
            <Col lg={{size: "auto"}} className="mt-5">
              <Fade appear={true} timeout={500}>
                <Card className="bg-transparent border-0" style={{ width: "18rem" }}>
                  <CardImg
                      alt="..."
                      src={require("../assets/img/packet.png")}
                      top
                  />
                  <CardBody className="text-center">
                    <Button
                        color="primary"
                        href="#pablo"
                        size="md"
                        onClick={e => e.preventDefault()}
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