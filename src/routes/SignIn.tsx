import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {Button, Col, Container, Row} from "reactstrap";
import {useUser} from "../context/UserContext";
import MySpinner from "../components/spinner/MySpinner";

export function SignIn() {
  const [error, setError] = useState();
  const {loginWithGoogle, ...user} = useUser();
  const {state} = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const DESKTOP_WIDTH_SIZE = 1100;
  const DESKTOP_HEIGHT_SIZE = 730;
  const [isDesktop, setDesktop] = useState<boolean>(window.innerWidth >= DESKTOP_WIDTH_SIZE
      && window.innerHeight >= DESKTOP_HEIGHT_SIZE);

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      await loginWithGoogle();
      // @ts-ignore
      navigate(state?.path || '/');
    } catch (error: any) {
      setError(error.message)
      setIsLoading(false)
    }
  };

  useEffect(() => {
    if (user.isAuthed()) {
      // @ts-ignore
      navigate(state?.path || '/');
    }
  }, [user.isAuthed()])

  const updateMedia = () => {
    setDesktop(window.innerHeight >= DESKTOP_HEIGHT_SIZE && window.innerWidth >= DESKTOP_WIDTH_SIZE)
  }

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  })

  if(isLoading){
    return (
      <div className="d-flex justify-content-center align-items-center h-100vh">
        <MySpinner message="Iniciando sesión..."/>
      </div>
    )
  } else {
    return (
      <React.Fragment>
        <Container fluid className="h-100vh overflow-hidden bg-gradient-orange">
          <Row className="justify-content-center align-items-center h-90vh">
            <Col className="justify-content-center align-items-center mt-lg-9" lg={6} md={6} sm={12}>
              <img src={require("../assets/img/qatar_logo_big.png")}
                   style={{maxWidth: (isDesktop ? "40rem" : "15rem"), maxHeight: (isDesktop ? "40rem" : "15rem")}}
                   className="img-center"
              />
            </Col>
            <Col className="justify-content-center align-items-center mt-lg-9" lg="5" md="7">
              <Row className="justify-content-center mb-3">
                <h1 className="text-white text-center text-wrap"
                    style={{fontSize: 50}}>
                  Figuritas Qatar 2022</h1>
              </Row>
              <Row className="justify-content-center ">
                <Button
                  className="btn-neutral btn-icon col-auto"
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
                  <span className="btn-inner--text">Iniciar Sesión con Google</span>
                </Button>
              </Row>
              {isDesktop &&
                <Row className="justify-content-center mt-lg-3">
                  <Col className="d-flex justify-content-center mt-4">
                    <img src={require("../assets/img/album_book.png")}
                         style={{maxWidth: "20rem", maxHeight: "20rem", position:"relative"}}
                    />
                  </Col>
                </Row>
              }

              {/*<Card className="shadow border-0">*/}
              {/*  <CardHeader className="bg-transparent pb-5">*/}
              {/*    <h1 className="h3 mb-3 fw-normal text-center">Album Qatar</h1>*/}
              {/*    <Row>*/}
              {/*      <div className="text-muted text-center mt-2 mb-3">*/}
              {/*        <small>Inicia sesión con</small>*/}
              {/*      </div>*/}
              {/*      <div className="btn-wrapper text-center">*/}
              {/*        <Button*/}
              {/*          className="btn-neutral btn-icon"*/}
              {/*          color="default"*/}
              {/*          onClick={handleGoogleSignIn}*/}
              {/*        >*/}
              {/*              <span className="btn-inner--icon">*/}
              {/*                <img*/}
              {/*                  alt="..."*/}
              {/*                  src={*/}
              {/*                    require("../assets/img/icons/common/google.svg")*/}
              {/*                      .default*/}
              {/*                  }*/}
              {/*                />*/}
              {/*              </span>*/}
              {/*          <span className="btn-inner--text">Google</span>*/}
              {/*        </Button>*/}
              {/*      </div>*/}
              {/*    </Row>*/}
              {/*  </CardHeader>*/}
              {/*</Card>*/}
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )

  }
}
