import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import {Button, Card, CardHeader, CardBody, Col, Row, Form, FormGroup, InputGroup, InputGroupText, Input} from "reactstrap";
import MyNavbar from "../components/MyNavbar";

export function Register() {
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState();

    const { signUp, loginWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleChange = ({target: {name, value}}: any) => {
        setUser({...user, [name]: value});
    }

    const handleGoogleSignIn = async () => {
        try {
            await loginWithGoogle();
            navigate('/');
        } catch (error: any) {
            setError(error.message)
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault(); // ToDo sacar esta linea para que vuelva a estado normal despues de submit
        console.log(user);
        setError(undefined);

        try {
            await signUp(user.email, user.password);
            navigate('/');
        } catch (error: any) {
            // ToDo agregar manejo de errores
            setError(error.message);
        }
        
    }

    // ToDo poner bonito
    return (
        <React.Fragment>
            <MyNavbar/>
            <Row className="justify-content-center">
                <Col lg="6" md="8">
                    <Card className=" shadow border-0">
                        <CardHeader className="bg-transparent pb-5">
                            <div className="text-muted text-center mt-2 mb-4">
                                <small>Registrate con</small>
                            </div>
                            <div className="text-center">
                                <Button
                                    className="btn-neutral btn-icon mr-4"
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
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                            <div className="text-center text-muted mb-4">
                                <small>O registrate con credenciales</small>
                            </div>
                            <Form role="form">
                                <FormGroup>
                                    <InputGroup className="input-group-alternative mb-3">
                                        <InputGroupText>
                                            <i className="ni ni-hat-3" />
                                        </InputGroupText>
                                        <Input placeholder="Nombre"
                                               type="text"
                                               onChange={handleChange}/>
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative mb-3">
                                        <InputGroupText>
                                            <i className="ni ni-email-83" />
                                        </InputGroupText>
                                        <Input
                                            placeholder="Email"
                                            name="email"
                                            type="email"
                                            autoComplete="new-email"
                                            onChange={handleChange}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupText>
                                            <i className="ni ni-lock-circle-open" />
                                        </InputGroupText>
                                        <Input
                                            id='password'
                                            name='password'
                                            placeholder="Contraseña"
                                            type="password"
                                            autoComplete="new-password"
                                            onChange={handleChange}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <div className="text-center">
                                    <Button className="mt-4" color="primary" type="button" onClick={handleSubmit}>
                                        Crear cuenta
                                    </Button>
                                </div>
                                {error && <p>{error}</p>}
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    )

}