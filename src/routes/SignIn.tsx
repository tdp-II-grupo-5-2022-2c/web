import React, {useState} from "react";
import '../css/App.css';
import {useNavigate} from "react-router-dom";
import {Button, Card, CardHeader, CardBody, Col, Row} from "reactstrap";
import {useUser} from "../context/UserContext";

export function SignIn() {
  const [error, setError] = useState();
  const {loginWithGoogle} = useUser();
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate('/');
    } catch (error: any) {
      setError(error.message)
    }

  };

  return (
    <React.Fragment>
      <Row className="justify-content-center">
        <Col lg="5" md="7">
          <Card className="shadow border-0">
            <CardHeader className="bg-transparent pb-5">
              <h1 className="h3 mb-3 fw-normal text-center">Album Qatar</h1>
              <Row>
                <div className="text-muted text-center mt-2 mb-3">
                  <small>Inicia sesión con</small>
                </div>
                <div className="btn-wrapper text-center">
                  <Button
                    className="btn-neutral btn-icon"
                    color="default"
                    onClick={handleGoogleSignIn}
                  >
                        <span className="btn-inner--icon">
                          <img
                            alt="..."
                            src={
                              require("../assets/img/icons/common/google.svg")
                                .default
                            }
                          />
                        </span>
                    <span className="btn-inner--text">Google</span>
                  </Button>
                </div>
              </Row>
            </CardHeader>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}
