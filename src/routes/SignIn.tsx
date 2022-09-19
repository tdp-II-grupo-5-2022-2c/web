import React, {Component, useState} from "react";
import '../css/App.css';
import MyNavbar from "../components/MyNavbar";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import {Button, Card, CardHeader, CardBody, Col, Row} from "reactstrap";

export function SignIn() {
  const [user, setUser] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState();
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleChange = ({target: {name, value}}: any) => {
      console.log(name, value)
      setUser({...user, [name]: value});
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // ToDo sacar esta linea para que vuelva a estado normal despues de submit
    // console.log(user);
    setError(undefined);

    try {
      console.log(user);
      await login(user.email, user.password); 
      navigate('/');
    } catch (error: any) {
      // ToDo agregar manejo de errores
      console.log(error)
      setError(error.message);
    }      
  }
  
  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      navigate('/');  
    } catch (error: any) {
      setError(error.message)
    }
    
  };

  const handleRegister = () => {
    navigate('/register');
  }

  return (
    <React.Fragment>
      <MyNavbar/>
      <Row className="justify-content-center">
        <Col lg="5" md="7">
          <Card className="shadow border-0">
            {error && <p>{error}</p>}
            <CardHeader className="bg-transparent pb-5">
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
            <CardBody className="px-lg-5 py-lg-5">
              <div className="text-center text-muted mb-4">
                <small>O inicia sesión con credenciales</small>
              </div>

              <div className="text-center">
                <img className="mb-4" src={require("../res/img/qatar.png")} alt="" width="72" height="57"/>
              </div>
              <Row className="form-signin w-100 m-auto">
                <form onSubmit={handleSubmit}>

                  <h1 className="h3 mb-3 fw-normal text-center">Inicia Sesión</h1>
                  <div className="form-floating">
                    <input type="email" name='email' className="form-control" id="floatingInput" placeholder="nombre@ejemplo.com" onChange={handleChange}/>
                    <label htmlFor="floatingInput">Email</label>
                  </div>
                  <div className="form-floating">
                    <input type="password" name='password' className="form-control" id="floatingPassword" placeholder="Contraseña" onChange={handleChange}/>
                    <label htmlFor="floatingPassword">Contraseña</label>
                  </div>
                  <Row>
                    <Col className="text-center">
                      <Button color="primary">Iniciar Sesión</Button>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="text-center">
                      <Button
                          className="btn-neutral btn-icon"
                          color="link"
                          onClick={handleRegister}
                      >
                        <span className="btn-inner--text">Register</span>
                      </Button>
                    </Col>
                  </Row>
                </form>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}
